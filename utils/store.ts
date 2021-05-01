import create, { State } from "zustand";

interface useStoreType extends State {
    pageIndex: number;
    incrementPageIndex: Function;
}

const useStore = create<useStoreType>(function (set) {
    return {
        pageIndex: 0,
        incrementPageIndex: function () {
            set(function (state) {
                return { pageIndex: state.pageIndex + 5 };
            });
        },
    };
});

export default useStore;
