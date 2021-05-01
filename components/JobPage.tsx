import useSWR from "swr";
import { useWindowWidth } from "../utils/customHooks";
import { motion } from "framer-motion";
import TimeAgo from "timeago-react";
import { useRouter } from "next/router";
import useStore from "../utils/store";

interface JobPageProps {
    index: number;
}

function fetcher(url: string) {
    return fetch(url).then(function (res) {
        return res.json();
    });
}

export default function JobPage(props: JobPageProps): JSX.Element {
    const { data } = useSWR(`/api/getJobs/${props.index}`, fetcher);
    const windowWidth = useWindowWidth();
    const router = useRouter();
    const setCurrentJobId: Function = useStore(function (state) {
        return state.setCurrentJobId;
    });

    if (!data) {
        return (
            <h1 className="text-xl uppercase text-white py-3 px-2 mx-2 text-center">
                Loading
            </h1>
        );
    }

    return (
        <>
            {data.map(function (job, index) {
                return (
                    <motion.li
                        key={job._id}
                        onClick={async function (event) {
                            if (windowWidth < 768) {
                                await router.push(`job/${job.slug}`);
                            } else {
                                setCurrentJobId(job._id);
                            }
                        }}
                        className="py-3 px-2 mx-2 border-b border-white cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 * index }}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-white text-lg">{job.title}</h3>
                            <p className="text-gray-200 text-sm self-center">
                                💰 {job.reward}
                            </p>
                        </div>
                        <p className="text-white my-2 text-sm">
                            By: {job.author},{" "}
                            <TimeAgo
                                datetime={new Date(Date.parse(job._createdAt))}
                            />
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {job.categories.map(function (category) {
                                return (
                                    <p
                                        className="bg-gray-700 rounded-full py-1 px-3 text-white text-sm"
                                        key={category}
                                    >
                                        #{category}
                                    </p>
                                );
                            })}
                        </div>
                    </motion.li>
                );
            })}
        </>
    );
}
