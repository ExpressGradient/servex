import { FC, MouseEventHandler } from "react";

interface FloatingActionButtonProps {
    onClickAction: MouseEventHandler<HTMLButtonElement>;
    tooltip?: string;
}

const FloatingActionButton: FC<FloatingActionButtonProps> = (props) => (
    <button
        className="fixed bottom-6 right-6 md:right-8 p-3 text-lg md:text-xl bg-black rounded-full hover:bg-gray-900"
        onClick={props.onClickAction}
        title={props.tooltip || "Floating Action Button"}
    >
        {props.children}
    </button>
);

export default FloatingActionButton;
