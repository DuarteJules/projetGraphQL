import './signIn.css'
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
import { NavigateFunction, useNavigate } from "react-router";
import { useAuth } from "@/context/Auth.tsx";

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
    const [createUser] = useCreateUserMutation();
    const navigate : NavigateFunction = useNavigate();
    const { login } = useAuth();

    const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });
    const [registerData, setRegisterData] = useState<RegisterData>({ username: "", password: "" });
    const [tabId, setTabId] = useState<TabsIds>("Connexion");

    const [signIn] = useSignInMutation({
        onCompleted: (data) => {
            if (data.signIn.success && data.signIn.token && data.signIn.user) {
                login(data.signIn.token, data.signIn.user.id, data.signIn.user.username);
                toaster.create({
                    description: "Connexion réussie",
                    type: "success",
                })
                navigate('/');
            }else{
                toaster.create({
                    description: "Une erreur c'est produite",
                    type: "error",
                })
            }
        }
    });

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        console.log(e.target.name);
    };

    const handleLogin = async (): Promise<void> => {
        await signIn({
            variables : {
                username : loginData.username,
                password: loginData.password,
            }
        })
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
