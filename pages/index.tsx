import { useUser } from "@auth0/nextjs-auth0";
import { FC, useEffect, useState } from "react";
import SearchField from "../components/SearchField";
import { addUser } from "../supabase/client";

const Home: FC = () => {
    const { user } = useUser();
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        if (user) {
            addUser({
                id: `${user.sub}|${user.email}`,
                name: user.name,
                email: user.email,
                picture: user.picture,
                email_verified: user.email_verified,
                updated_at: new Date(user.updated_at),
            });
        }
    }, [user]);

    return (
        <>
            <SearchField
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />
        </>
    );
};

export default Home;
