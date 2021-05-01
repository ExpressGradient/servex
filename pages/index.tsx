import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import slugify from "slugify";
import Page from "../components/Page";
import Modal from "../components/Modal";
import JobsList from "../components/JobsList";
import { useWindowWidth } from "../utils/customHooks";
import JobView from "../components/JobView";

export default function Home(props): JSX.Element {
    const { user } = useUser();
    const [showModal, setShowModal] = useState<boolean>(false);
    const windowWidth = useWindowWidth();

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
                    }).then(function (res) {});
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
            {windowWidth < 768 ? (
                <div
                    className="bg-gray-900 m-4 rounded overflow-y-auto"
                    style={{
                        height: "75vh",
                        maxHeight: "75vh",
                    }}
                >
                    <JobsList />
                </div>
            ) : (
                <div className="bg-gray-900 w-4/5 mx-auto mt-4 rounded-md shadow-md grid grid-cols-3">
                    <div
                        className="col-span-1 overflow-y-scroll"
                        style={{
                            maxHeight: "75vh",
                        }}
                    >
                        <JobsList />
                    </div>
                    <div
                        className="col-span-2 overflow-y-auto p-4"
                        style={{
                            maxHeight: "75vh",
                        }}
                    >
                        <JobView />
                    </div>
                </div>
            )}
        </>
    );
}
