import create, { State } from "zustand";

interface useStoreType extends State {
    pageIndex: number;
    incrementPageIndex: Function;
    currentJobId: string;
    setCurrentJobId: Function;
}

const useStore = create<useStoreType>(function (set) {
    return {
        pageIndex: 0,
        incrementPageIndex: function () {
            set(function (state) {
                return { pageIndex: state.pageIndex + 5 };
            });
        },
        currentJobId: "",
        setCurrentJobId: function (newJobId) {
            set(function () {
                return { currentJobId: newJobId };
            });
        },
    };
});

export default useStore;
