import { motion } from "framer-motion";

interface ModalProps {
    message: string;
    isError?: boolean;
    closeAction: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: [0, 1, 1, 1, 0], y: [-100, 0, 0, -100] }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className={`fixed top-20 left-4 right-4 md:w-1/2 md:left-0 md:right-0 md:mx-auto text-white p-3 rounded grid grid-cols-12 ${
                props.isError ? "bg-red-500" : "bg-blue-500"
            }`}
            onAnimationComplete={props.closeAction}
        >
            <h4 className="col-span-11 justify-self-center md:text-lg">
                {props.message}
            </h4>
            <p
                className="col-span-1 justify-self-center cursor-pointer md:text-xl"
                onClick={props.closeAction}
            >
                x
            </p>
        </motion.div>
    );
}
