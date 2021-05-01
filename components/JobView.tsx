import Image from "next/image";
import TimeAgo from "timeago-react";
import Modal from "./Modal";
import useStore from "../utils/store";
import useSWR from "swr";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";

function fetcher(url: string) {
    return fetch(url).then(function (res) {
        return res.json();
    });
}

export default function JobView(): JSX.Element {
    const currentJobId: string = useStore(function (state) {
        return state.currentJobId;
    });
    const { data, error } = useSWR(
        currentJobId !== "" ? `api/getJob/${currentJobId}` : null,
        fetcher
    );
    const { user } = useUser();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    if (!data) {
        return (
            <h1 className="text-center text-white text-2xl">
                Select some Job to view more Details.
            </h1>
        );
    }

    if (error) {
        return (
            <h1 className="text-center text-white text-2xl">
                Error while fetching data.
            </h1>
        );
    }

    async function handleApplyToJob(event) {
        setShowSuccessModal(true);
        await fetch("../api/applyToJob", {
            method: "POST",
            body: JSON.stringify({
                userId: user.sub.split("|")[1],
                jobId: data._id,
            }),
        });
    }

    return (
        <section className="bg-gray-700 h-full p-3">
            <h1 className="text-2xl text-white">{data.title}</h1>
            <div className="text-gray-200">
                From:{" "}
                <Image
                    src={data.author.picture || data.author.pictureURL}
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer"
                    alt="Job creator's profile picture"
                />
                <span className="text-blue-100 hover:underline cursor-pointer">
                    {data.author.name},{" "}
                </span>
                <TimeAgo datetime={new Date(Date.parse(data._createdAt))} />
            </div>
            <p className="mt-2 text-white">
                Address: {data.address === "" ? "Remote" : data.address}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
                {data.categories.map(function (category) {
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
            <p className="text-white mt-2">Reward: {data.reward} 💰💰</p>
            <p className="text-white underline mt-2">
                Due <TimeAgo datetime={data.lastDate} />
            </p>
            <p className="font-mono mt-2 text-gray-50 text-lg">
                {data.description}
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
        </section>
    );
}
