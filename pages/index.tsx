import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import CustomHead from "../components/CustomHead";
import FloatingActionButton from "../components/FloatingActionButton";
import SearchField from "../components/SearchField";
import { addUser } from "../supabase/client";

const Home: FC = () => {
    const { user } = useUser();
    const [searchInput, setSearchInput] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            addUser({
                id: user.sub,
                name: user.name,
                email: user.email,
                picture: user.picture,
                email_verified: user.email_verified,
                updated_at: new Date(user.updated_at),
            });
        }
    }, [user]);

    const handleFABClick = () => router.push("/create_job");

    return (
        <>
            <CustomHead />
            <SearchField
                placeholder="🔍 Search for Jobs"
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                tooltip="Start typing to search your next Job"
            />
            {user && (
                <FloatingActionButton
                    onClickAction={handleFABClick}
                    tooltip="Create a new Job"
                >
                    ➕
                </FloatingActionButton>
            )}
        </>
    );
};

export default Home;
