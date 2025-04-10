import './signIn.css'
import userStore from "@/utils/store.ts";
import React, { useState, ChangeEvent } from "react";
import {
    Box,
    Button,
    Input,
    Tabs,
    Heading,
    VStack,
    Field
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { useSignInMutation, useCreateUserMutation } from "@/graphql/generated.tsx";
import { User as UserType } from '../../utils/storeInterface.ts'
import { NavigateFunction, useNavigate } from "react-router";

interface LoginData {
    username: string;
    password: string;
}

interface RegisterData {
    username: string;
    password: string;
}
type TabsIds = "Connexion" | "Inscription";


const SignIn: React.FC = () => {
    const updateUser : (user : UserType | null) => void =  userStore(state => state.updateUser);
    const updateToken : (token : string | null) => void =  userStore(state => state.updateToken);
    const [createUser] = useCreateUserMutation();
    const [signIn] = useSignInMutation();
    const navigate : NavigateFunction = useNavigate();

    const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });
    const [registerData, setRegisterData] = useState<RegisterData>({ username: "", password: "" });
    const [tabId, setTabId] = useState<TabsIds>("Connexion");

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        console.log(e.target.name);
    };

    const handleLogin = async (): Promise<void> => {
        const result = await signIn({
            variables : {
                username : loginData.username,
                password: loginData.password,
            }
        })
        if(result?.data?.signIn?.success){
            toaster.create({
                description: "Connexion réussie",
                type: "success",
            })
            console.log(result?.data?.signIn?.user)
            console.log(result?.data?.signIn?.token)
            updateUser(result?.data?.signIn?.user as UserType | null)
            updateToken(result?.data?.signIn?.token as string | null)
            navigate("/")
        }else {
            console.log(result?.data?.signIn?.message)
            toaster.create({
                description: "Une erreur c'est produite",
                type: "error",
            })
        }
    };

    const handleRegister = async (): Promise<void> => {
        const result = await createUser({
            variables : {
                username : registerData.username,
                password: registerData.password,
            }
        })
        if(result?.data?.createUser?.success){
            toaster.create({
                description: "Inscription réussie",
                type: "success",
            })
            setTabId("Connexion");
        }else{
            toaster.create({
                description: "Une erreur c'est produite",
                type: "error",
            })
        }
        console.log(result)
        // Appelle API ici
    };

    return (
        <>
            <div className="container">
                <Box w={"95%"} h={"95%"} mt={5} mb={5} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
                    <Tabs.Root value={tabId} onValueChange={(val) => setTabId(val.value as unknown as TabsIds)} variant={"enclosed"}>
                        <Tabs.List mb="1em">
                            <Tabs.Trigger value="Connexion" color={"wheat"}>Connexion</Tabs.Trigger>
                            <Tabs.Trigger value="Inscription" color={"wheat"}>Inscription</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="Connexion">
                            <VStack align="stretch">
                                <Heading size="md" color={"wheat"}>Se connecter</Heading>
                                <Field.Root>
                                    <Field.Label color={"wheat"}>Email</Field.Label>
                                    <Input type="email" name="username" value={loginData.username} onChange={handleLoginChange} />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label color={"wheat"}>Mot de passe</Field.Label>
                                    <Input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
                                </Field.Root>
                                <Button background={"wheat"} onClick={handleLogin}>Connexion</Button>
                            </VStack>
                        </Tabs.Content>
                        <Tabs.Content value="Inscription">
                            <VStack align="stretch">
                                <Heading size="md" color={"wheat"}>Créer un compte</Heading>
                                <Field.Root>
                                    <Field.Label color={"wheat"}>Email</Field.Label>
                                    <Input type="email" name="username" value={registerData.username} onChange={handleRegisterChange} />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label color={"wheat"}>Mot de passe</Field.Label>
                                    <Input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} />
                                </Field.Root>
                                <Button background={"wheat"} onClick={handleRegister}>Inscription</Button>
                            </VStack>
                        </Tabs.Content>
                    </Tabs.Root>
                </Box>
            </div>
        </>
    );
};

export default SignIn;
