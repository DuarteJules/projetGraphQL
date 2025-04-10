import './details.css'
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    VStack,
    Image,
    Text,
    HStack,
    Input
} from "@chakra-ui/react";
// import { NavigateFunction, useNavigate } from "react-router";
import {useParams} from "react-router";
import {
    Article,
    Comment,
    Like,
    useCreateCommentMutation,
    useGetArticlesQuery,
    useManageLikeMutation
} from '@/graphql/generated.tsx'
import { MessageCircle, ThumbsUp } from "lucide-react";
import { toaster } from "@/components/ui/toaster"

const Details: React.FC = ( ) => {

    const id : string = useParams().id as string;

    // const navigate : NavigateFunction = useNavigate();
    const [articleDetails, setArticleDetails] = useState<Article>()
    const [likes, setLikes] = useState<Like[]>();
    const [comments, setComments] = useState<Comment[]>();
    const [newComment, setNewComment] = useState('');
    const {data, refetch} = useGetArticlesQuery();
    const [manageLike] = useManageLikeMutation()
    const [manageComment] = useCreateCommentMutation()

    useEffect(()=> {
        const getDetails = () : void=> {
            const article : Article | undefined | null = data?.getArticles?.find((e) =>e?.id === id);
            setArticleDetails(article as Article);
            setLikes(article?.likes as Like[]);
            setComments(article?.comments as Comment[]);
        }
        getDetails()
    },[data, id])

    const refetchDetails = async () : Promise<void> => {
        const { data: newData } = await refetch();
        const article : Article | undefined | null = newData?.getArticles?.find((e) => e?.id === id);
        setArticleDetails(article as Article);
        setLikes(article?.likes as Like[]);
        setComments(article?.comments as Comment[]);
    }

    const handleLike = async () : Promise<void> => {
        const result  = await manageLike({
            variables : {articleId : id},
        })
        console.log(result)
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

    const handleAddComment = async () => {
        await manageComment({
            variables : {
                articleId : id,
                content : newComment
            }
        })
    }

    return (
        <>
            <div className="container">
                <Box w={"95%"} h={"95%"} mt={5} mb={5} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
                    <VStack p={6} align="start">
                        <Image
                            src={articleDetails?.image}
                            alt="Article"
                            borderRadius="xl"
                            boxShadow="md"
                            maxH="400px"
                            objectFit="cover"
                        />

                        <Text fontSize="lg">{articleDetails?.content}</Text>

                        <HStack divideX="2px">
                            <Button onClick={handleLike} colorScheme="blue">
                                <ThumbsUp size={18} />
                                {likes?.length}
                            </Button>
                        </HStack>

                        <Text fontSize="xl" fontWeight="bold">
                            Commentaires
                        </Text>

                        <VStack align="start" w="full">
                            {comments?.map((comment) => (
                                <HStack key={comment.id} align="start">
                                    <MessageCircle size={18} />
                                    <Text>{comment.content}</Text>
                                </HStack>
                            ))}
                        </VStack>

                        <HStack w="full">
                            <Input
                                placeholder="Ajouter un commentaire..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <Button colorScheme="teal" onClick={handleAddComment}>
                                Envoyer
                            </Button>
                        </HStack>
                    </VStack>
                    );
                </Box>
            </div>
        </>
    );
};

export default Details;
