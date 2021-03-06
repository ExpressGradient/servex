import Page from "../components/Page";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { useRouter } from "next/router";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { useFormInput } from "../utils/customHooks";
import useSWR from "swr";

function fetcher(url: string) {
    return fetch(url).then(function (res) {
        return res.json();
    });
}

function CreateNewJob(): JSX.Element {
    const { user } = useUser();
    const router = useRouter();
    const [
        showVerifyWarningModal,
        setShowVerifyWarningModal,
    ] = useState<boolean>(false);
    const [showJobCreationModal, setShowJobCreationModal] = useState<boolean>(
        false
    );
    const { input: title, handleInput: handleTitle } = useFormInput<string>("");
    const {
        input: description,
        handleInput: handleDescription,
    } = useFormInput<string>("");
    const [categories, setCategories] = useState<Array<string>>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const { input: reward, handleInput: handleReward } = useFormInput<number>(
        0
    );
    const {
        input: lastDate,
        handleInput: handleLastDate,
    } = useFormInput<string>("");
    const { input: address, handleInput: handleAddress } = useFormInput<string>(
        ""
    );
    const { data: dbCategories } = useSWR("/api/getCategories", fetcher);

    useEffect(
        function () {
            if (user) {
                if (!user.email_verified) {
                    setShowVerifyWarningModal(true);
                }
            }
        },
        [user]
    );
    useEffect(() => {
        if (categories.length === 3) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [categories]);

    function toggleVerifyWarningModal(): void {
        setShowVerifyWarningModal(false);
    }

    function toggleShowJobCreationModal(): void {
        setShowJobCreationModal(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setShowJobCreationModal(true);
        await fetch("/api/createJob", {
            method: "POST",
            body: JSON.stringify({
                _type: "job",
                _id: `${slugify(title, "")}_${user.sub.split("|")[1]}`,
                title,
                description,
                categories: categories.map(function (category) {
                    return {
                        _type: "reference",
                        _ref: category,
                        _key: nanoid(),
                    };
                }),
                reward,
                lastDate: new Date(lastDate).toString(),
                address,
                author: {
                    _type: "reference",
                    _ref: user.sub.split("|")[1],
                },
                slug: slugify(title, "-"),
            }),
        });
        await router.push("/");
    }

    function updateCategories(newCategory: string) {
        if (!categories.includes(newCategory) && categories.length < 3) {
            setCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    }

    async function handleReset(event) {
        await router.push("/");
    }

    return (
        <>
            <Page
                title="ServeX - Create New Job"
                description="Create a new ServeX Job"
            />
            {showVerifyWarningModal && (
                <Modal
                    message="Please verify your Email to create a Job"
                    closeAction={toggleVerifyWarningModal}
                    isError={true}
                />
            )}
            <main className="mt-4">
                <h1 className="text-2xl text-center text-white uppercase">
                    New Job
                </h1>
                <form
                    className="mx-4 mt-2 text-center md:w-1/3 md:mx-auto"
                    onSubmit={handleSubmit}
                >
                    <fieldset disabled={!user.email_verified}>
                        <div>
                            <label htmlFor="job-title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="job-title"
                                value={title}
                                onChange={handleTitle}
                                className="form-input"
                                maxLength={100}
                                placeholder="Enter a title of your new Job"
                                required={true}
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="job-description"
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea
                                className="form-input"
                                rows={4}
                                maxLength={500}
                                id="job-description"
                                value={description}
                                onChange={handleDescription}
                                placeholder="Enter the description of the Job"
                                required={true}
                            />
                        </div>
                        <div className="mt-4">
                            <AutoCompleteInput
                                data={dbCategories}
                                id="categories"
                                label="Categories"
                                updateDataAction={updateCategories}
                                disabled={disabled}
                            />
                        </div>
                        {disabled && (
                            <Modal
                                message="Limit reached for adding categories"
                                closeAction={function () {}}
                            />
                        )}
                        {categories.length > 0 && (
                            <div className="mt-4">
                                <h3 className="form-label">
                                    Selected Categories
                                </h3>
                                <div className="text-left flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <p
                                            key={category}
                                            className="bg-gray-800 rounded-full py-2 px-3 text-white"
                                        >
                                            {category}
                                            <span
                                                className="ml-2 text-gray-300 cursor-pointer"
                                                onClick={(e) =>
                                                    setCategories(
                                                        categories.filter(
                                                            (stateCategory) =>
                                                                stateCategory !==
                                                                category
                                                        )
                                                    )
                                                }
                                            >
                                                x
                                            </span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-4">
                            <label
                                htmlFor="reward-input"
                                className="form-label"
                            >
                                Reward(INR)
                            </label>
                            <input
                                type="number"
                                className="form-input"
                                required={true}
                                id="reward-input"
                                min={0}
                                value={reward}
                                onChange={handleReward}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="date-input" className="form-label">
                                Last Date
                            </label>
                            <input
                                type="date"
                                id="date-input"
                                value={lastDate}
                                onChange={handleLastDate}
                                className="form-input"
                                min={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="address-input"
                                className="form-label"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address-input"
                                className="form-input"
                                placeholder="Enter the job's address, if remote don't enter anything"
                                maxLength={50}
                                value={address}
                                onChange={handleAddress}
                            />
                        </div>
                        <div className="my-4 flex justify-evenly">
                            <button
                                className="uppercase bg-gray-800 text-white px-5 py-2 rounded"
                                type="submit"
                            >
                                Create
                            </button>
                            <button
                                className="uppercase bg-red-600 text-white px-5 py-2 rounded"
                                type="button"
                                onClick={handleReset}
                            >
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>
            </main>
            {showJobCreationModal && (
                <Modal
                    message="Creating your Job"
                    closeAction={toggleShowJobCreationModal}
                />
            )}
        </>
    );
}

export default withPageAuthRequired(CreateNewJob);
