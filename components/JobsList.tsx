import useStore from "../utils/store";
import { useEffect, useState } from "react";
import JobPage from "./JobPage";

export default function JobsList(): JSX.Element {
    const pageIndex: number = useStore(function (state) {
        return state.pageIndex;
    });
    const [jobPages, setJobPages] = useState<Array<JSX.Element>>([]);
    const incrementPageIndex = useStore(function (state) {
        return state.incrementPageIndex;
    });

    useEffect(
        function () {
            setJobPages(function (prevState) {
                return [
                    ...prevState,
                    <JobPage index={pageIndex} key={prevState.length} />,
                ];
            });
        },
        [pageIndex]
    );

    function handleLoadMoreClick(): void {
        incrementPageIndex();
    }

    return (
        <>
            <ul>{jobPages}</ul>
            <div className="flex justify-center">
                <button
                    onClick={handleLoadMoreClick}
                    className="my-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
                >
                    Load More
                </button>
            </div>
        </>
    );
}
