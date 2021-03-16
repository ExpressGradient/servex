import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FC, useEffect, useState } from "react";
import AutoCompleteInput from "../components/AutoCompleteInput";
import CustomHead from "../components/CustomHead";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import supabase from "../supabase/client";
import useSWR from "swr";
import { useRouter } from "next/router";

const CreateJob: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
    props
) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [categories, setCategories] = useState<Array<string>>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [lastDate, setLastDate] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [reward, setReward] = useState<number>(0);
    const { data: dbCategories } = useSWR("/api/getCategories", {
        initialData: props.dbCategories,
    });
    const { user } = useUser();
    const router = useRouter();

    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await supabase.from("jobs").insert([
            {
                id: user.sub + title,
                title,
                description,
                categories,
                last_date: lastDate,
                reward,
                hiring: user.sub,
                address,
            },
        ]);
        router.push("/");
    };
    const handleReset = (event) => router.push("/");
    const updateCategories = (newCategory: string) => {
        if (!categories.includes(newCategory) && categories.length < 3) {
            setCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    };
    const handleLastDateChange = (event) => setLastDate(event.target.value);
    const handleAddressChange = (event) => setAddress(event.target.value);
    const handleRewardChange = (event) => setReward(event.target.value);

    useEffect(() => {
        if (categories.length === 3) {
            setDisabled(true);
            window.alert("Max limit for adding categories reached");
        } else {
            setDisabled(false);
        }
    }, [categories]);

    useEffect(() => {
        if (!user?.email_verified) {
            window.alert("Please verify your email before creating a Job");
        }
    }, [user]);

    return (
        <>
            <CustomHead
                title="ServeX - Create a new Job"
                description="Create a new ServeX Job"
            />
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
                            ></textarea>
                        </div>
                        <div className="mt-4">
                            <AutoCompleteInput
                                data={dbCategories.sort()}
                                id="categories"
                                label="Categories"
                                updateDataAction={updateCategories}
                                disabled={disabled}
                            />
                        </div>
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
                                onChange={handleRewardChange}
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
                                onChange={handleLastDateChange}
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
                                onChange={handleAddressChange}
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
                                type="reset"
                                onReset={handleReset}
                            >
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const dbCategoriesResponse = await supabase
        .from("categories")
        .select("category");
    const dbCategoriesMap = dbCategoriesResponse.data;
    const dbCategories: string[] = dbCategoriesMap.map(
        (categoryObject) => categoryObject.category
    );

    if (!dbCategories) {
        return {
            notFound: true,
        };
    }

    return {
        props: { dbCategories },
    };
};

const CreateJobWrapper = withPageAuthRequired(CreateJob);

export default CreateJobWrapper;
