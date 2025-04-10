import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import userStore from "@/utils/store.ts";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
});
interface UserType {
    id: number;
    username: string;
}

const ApolloClientWithAuth = () => {
    const user : UserType | null = userStore(state => state.user);

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('authToken');
        if (user && token) {
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return {
            headers,
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <StrictMode>
                <Provider>
                    <App />
                </Provider>
            </StrictMode>
    </ApolloProvider>
    )
};

createRoot(document.getElementById("root")!).render(
<ApolloClientWithAuth/>
);
