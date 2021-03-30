import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import slugify from "slugify";
import Page from "../components/Page";
import Modal from "../components/Modal";

export default function Home(): JSX.Element {
    const { user } = useUser();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(
        function () {
            if (user) {
                if (user.email_verified) {
                    fetch("/api/createUser", {
                        method: "POST",
                        body: JSON.stringify({
                            _id: user.sub.split("|")[1],
                            _type: "user",
                            email: user.email,
                            emailVerified: user.email_verified,
                            name: user.name,
                            slug: slugify(user.name, ""),
                            pictureURL: user.picture,
                        }),
                    });
                } else {
                    setShowModal(true);
                }
            }
        },
        [user]
    );

    function toggleModal(): void {
        setShowModal(false);
    }

    return (
        <>
            <Page />
            {showModal && (
                <Modal
                    message="Please verify your Email"
                    isError={true}
                    closeAction={toggleModal}
                />
            )}
        </>
    );
}
