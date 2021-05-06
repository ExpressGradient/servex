import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Page from "../../components/Page";
import dbClient from "../../utils/sanityClient";
import Image from "next/image";
import TimeAgo from "timeago-react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Modal from "../../components/Modal";
import { useOwnStatus } from "../../utils/customHooks";

export default function Profile(props): JSX.Element {
    const [file, setFile] = useState<File>(null);
    const { user } = useUser();
    const owns: boolean = useOwnStatus();
    const [showResumeModal, setShowResumeModal] = useState<boolean>(false);

    function fileOnChangeHandler(event) {
        setFile(event.target.files[0]);
    }

    function fileOnSubmitHandler(event) {
        event.preventDefault();
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async function () {
            await fetch("/api/upload_resume", {
                method: "POST",
                body: JSON.stringify({
                    file: reader.result,
                    userId: user.sub.split("|")[1],
                    name: file.name,
                    type: file.type,
                }),
            });
            setShowResumeModal(true);
        };
    }

    function closeResumeModal() {
        setShowResumeModal(false);
    }

    return (
        <>
            <Page
                title={`Servex - ${props.name}`}
                description={`Servex ${props.name} Profile`}
            />
            <main className="w-1/2 mx-auto">
                {/*Profile Card*/}
                <div className="m-4 bg-gray-900 p-3 rounded-md shadow-md flex gap-3 items-center">
                    <div>
                        <Image
                            src={props.pictureURL}
                            alt="User Profile Picture"
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </div>
                    <div className="text-white text-sm">
                        <h3 className="text-xl">{props.name}</h3>
                        <p>{props.email}</p>
                        <p className="my-1">
                            Account Created:{" "}
                            <TimeAgo datetime={props._createdAt} />
                        </p>
                        {user && (
                            <Link href={props.resume}>
                                <a className="text-blue-500 hover:underline">
                                    Download Resume
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
                {owns && (
                    <form
                        onSubmit={fileOnSubmitHandler}
                        className="m-4 bg-gray-900 p-3 rounded-md shadow-md text-white"
                    >
                        <label className="text-lg">Upload Resume: </label>
                        <input
                            type="file"
                            onChange={fileOnChangeHandler}
                            accept=".txt"
                            className="my-3"
                            required={true}
                        />
                        <button
                            type="submit"
                            className={`px-3 py-1 rounded shadow-md bg-gray-700 ${
                                !file ? "opacity-50" : ""
                            }`}
                        >
                            Upload
                        </button>
                        {showResumeModal && (
                            <Modal
                                message="Resume Uploaded"
                                closeAction={closeResumeModal}
                            />
                        )}
                    </form>
                )}
                <div className="m-4 bg-gray-900 p-3 rounded-md shadow-md">
                    <h1 className="text-xl text-white">Job Activity</h1>
                    <ul>
                        {props.jobActivity.map(function (job) {
                            return (
                                <li key={job._id}>
                                    <Link href={`/job/${job.slug}`}>
                                        <a className="text-blue-500 hover:underline">
                                            {job.title}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
    const slug: string | string[] = context.query.slug;
    if (typeof slug === "string") {
        const query = `
            *[_type == "user" && slug == "${slug}"][0]{
                ...,
                "resume": resume.asset -> url,
                "jobActivity": *[_type == "job" && references(^._id)]
            }
        `;
        const data = await dbClient.fetch(query);
        return {
            props: { ...data },
        };
    }
}
