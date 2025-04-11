import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Box,
    Button,
    VStack,
    Image,
    Text,
    HStack,
    Flex,
    Dialog,
    Portal, CloseButton, Field, Input,
} from "@chakra-ui/react";
// import { NavigateFunction, useNavigate } from "react-router";
import { Link, useParams } from "react-router";
import {
    Article, useCreateArticleMutation,
    useGetArticlesQuery,
    useManageLikeMutation
} from '@/graphql/generated.tsx'
import { Plus, ThumbsUp } from "lucide-react";
import { toaster } from "@/components/ui/toaster"

interface ArticleData {
    image : string,
    content : string,
}

const Home: React.FC = ( ) => {

    const id : string = useParams().id as string;

    // const navigate : NavigateFunction = useNavigate();
    const [articleDetails, setArticleDetails] = useState<Article[]>()
    const {data, refetch} = useGetArticlesQuery();
    const [manageLike] = useManageLikeMutation()
    const [articleData, setArticleData] = useState<ArticleData>({ image: "", content: "" });
    const [createArticle] = useCreateArticleMutation({
        onCompleted: async (data) => {
            if(data?.createArticle?.success){
                    await refetchDetails()
                    toaster.create({
                        description: "Article ajouté",
                        type: "success",
                    })
            }else{
                toaster.create({
                    description: "Une erreur c'est produite lors de l'ajout de l'article",
                    type: "error",
                })
            }
        }
    });


    useEffect(()=> {
        const getDetails = () : void=> {
            setArticleDetails(data?.getArticles as Article[]);
        }
        getDetails()
    },[data, id])

    const refetchDetails = async () : Promise<void> => {
        const { data: newData } = await refetch();
        setArticleDetails(newData?.getArticles as Article[]);
    }

    const handleLike = async (id : string) : Promise<void> => {
        const result  = await manageLike({
            variables : {articleId : id},
        })
        if(result.data?.manageLike?.success){
            await refetchDetails()
            toaster.create({
                description: "Article Liké",
                type: "success",
            })
        }else{
            toaster.create({
                description: "Une erreur c'est produite lors du like de l'article",
                type: "error",
            })
        }
    };
    const handleArticle = async () : Promise<void> => {
        console.log('salut')
        await createArticle({
            variables : {
                content : articleData.content,
                image : articleData.image,
            }
        })
    }

    const handleArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setArticleData({ ...articleData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container">
                <Box w={"95%"} h={"95%"} mt={5} mb={5} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
                    <Flex justifyContent="flex-end">
                        <Dialog.Root size={"lg"} placement={"center"}>
                            <Dialog.Trigger asChild>
                                <Button variant="outline" >
                                    <Plus size={18} />
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Ajouter un article</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <VStack align="stretch">
                                                <Field.Root>
                                                    <Field.Label color={"wheat"}>Image URL</Field.Label>
                                                    <Input type="text" name="image" value={articleData.image} onChange={handleArticleChange} />
                                                </Field.Root>
                                                <Field.Root>
                                                    <Field.Label color={"wheat"}></Field.Label>
                                                    <Input type="text" name="content" value={articleData.content} onChange={handleArticleChange} />
                                                </Field.Root>
                                            </VStack>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger>
                                                <Button>
                                                    Annuler
                                                </Button>
                                            </Dialog.ActionTrigger>
                                            <Dialog.ActionTrigger>
                                                <Button  onClick={()=> {handleArticle();}}>
                                                    Ajouter
                                                </Button>
                                            </Dialog.ActionTrigger>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </Flex>
                    <VStack p={6} align="start" h={"95%"}>
                        {articleDetails?.map((article : Article) => (
                            <VStack key={article.id}>
                                <Link to={`/details/${article.id}`}>
                                    <HStack>
                                        <Image
                                            src={article?.image}
                                            alt="Article"
                                            borderRadius="xl"
                                            boxShadow="md"
                                            maxH="200px"
                                            objectFit="cover"
                                        />

                                        <Text fontSize="lg">{article?.content}</Text>

                                        <HStack divideX="2px">
                                            <Button onClick={()=> {handleLike(article.id);}} colorScheme="blue">
                                                <ThumbsUp size={18} />
                                                {article?.likes?.length}
                                            </Button>
                                        </HStack>
                                    </HStack>
                                </Link>
                            </VStack>
                        ))}
                    </VStack>
                </Box>
            </div>
        </>
    );
};

export default Home;
