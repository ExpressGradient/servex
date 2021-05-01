import Page from "../../components/Page";
import { GetServerSidePropsContext } from "next";
import dbClient from "../../utils/sanityClient";
import { useState } from "react";
import Image from "next/image";
import TimeAgo from "timeago-react";
import { useUser } from "@auth0/nextjs-auth0";
import Modal from "../../components/Modal";
import { useRouter } from "next/router";

export default function SingleJob(props): JSX.Element {
    const { user } = useUser();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const router = useRouter();

    async function handleApplyToJob(event) {
        setShowSuccessModal(true);
        await fetch("../api/applyToJob", {
            method: "POST",
            body: JSON.stringify({
                userId: user.sub.split("|")[1],
                jobId: props._id,
            }),
        });
        setTimeout(async function () {
            await router.push("/");
        }, 1500);
    }

    return (
        <>
            <Page />
            <main className="m-4 md:w-2/3 md:mx-auto md:my-4">
                <h1 className="text-2xl text-white">{props.title}</h1>
                <div className="text-gray-200">
                    From:{" "}
                    <Image
                        src={props.author.picture || props.author.pictureURL}
                        width={32}
                        height={32}
                        className="rounded-full cursor-pointer"
                        alt="Job creator's profile picture"
                    />
                    <span className="text-blue-100 hover:underline cursor-pointer">
                        {props.author.name},{" "}
                    </span>
                    <TimeAgo
                        datetime={new Date(Date.parse(props._createdAt))}
                    />
                </div>
                <p className="mt-2 text-white">
                    Address: {props.address === "" ? "Remote" : props.address}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {props.categories.map(function (category) {
                        return (
                            <p
                                className="bg-gray-900 rounded-full py-2 px-3 text-white text-sm"
                                key={category._key}
                            >
                                #{category._ref}
                            </p>
                        );
                    })}
                </div>
                <p className="text-white mt-2">Reward: {props.reward} 💰💰</p>
                <p className="text-white underline mt-2">
                    Due <TimeAgo datetime={props.lastDate} />
                </p>
                <p className="font-mono mt-2 text-gray-50 text-lg">
                    {props.description}
                </p>
                {user && (
                    <button
                        onClick={handleApplyToJob}
                        className="w-full md:w-1/3 mt-2 bg-gray-900 text-white py-3 rounded uppercase shadow active:shadow-none"
                    >
                        Apply for this Job
                    </button>
                )}
                {showSuccessModal && (
                    <Modal
                        message={"Applying to this Job"}
                        closeAction={function () {
                            setShowSuccessModal(false);
                        }}
                    />
                )}
            </main>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const slug: string | string[] = context.query.slug;
    if (typeof slug === "string") {
        const query: string = `
            *[_type == "job" && slug == "${slug}"][0] {
                ...,
                "author": author -> {
                    ...,
                    "picture": picture.asset -> url
                }
            }
        `;
        const data = await dbClient.fetch(query);
        return {
            props: { ...data },
        };
    }
}
