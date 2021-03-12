import "../styles/globals.css";
import Header from "../components/Header";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }) => (
    <UserProvider>
        <Header />
        <Component {...pageProps} />
    </UserProvider>
);

export default App;
