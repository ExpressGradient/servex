import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { UserProvider } from "@auth0/nextjs-auth0";

const CustomHead = () => (
    <Head>
        <title>ServeX</title>
        <meta name="description" content="A website for exchanging services." />
        <meta
            name="keywords"
            content="Services, Exchange, Freelancing, Jobs, Hire"
        />
        <meta name="author" content="ExpressGradient" />
    </Head>
);

const App = ({ Component, pageProps }) => (
    <UserProvider>
        <CustomHead />
        <Header />
        <Component {...pageProps} />
    </UserProvider>
);

export default App;
