import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <Head>
                <title>ServeX</title>
                <meta
                    name="description"
                    content="A website for exchanging services."
                />
                <meta
                    name="keywords"
                    content="Services, Exchange, Freelancing, Jobs, Hire"
                />
                <meta name="author" content="ExpressGradient" />
            </Head>
            <Header />
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default App;
