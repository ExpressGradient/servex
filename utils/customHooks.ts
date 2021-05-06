import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import slugify from "slugify";

export function useDbUserImage(): string {
    const { user } = useUser();
    const [dbUserImage, setDbUserImage] = useState<string>("");

    async function fetchDbUserImage() {
        const _id: string = user.sub.split("|")[1];
        const res = await fetch("/api/getUserImage", {
            method: "POST",
            body: JSON.stringify({ _id }),
        });
        return await res.json();
    }

    useEffect(
        function () {
            if (user) {
                fetchDbUserImage().then((res) => setDbUserImage(res.picture));
            }
        },
        [user]
    );

    return dbUserImage;
}

export function useWindowWidth(): number {
    const [width, setWidth] = useState<number>();

    useEffect(function () {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return function () {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}

export function useFormInput<T>(initialValue) {
    const [input, setInput] = useState<T>(initialValue);

    function handleInput(event) {
        setInput(event.target.value);
    }

    return { input, handleInput };
}

export function useOwnStatus(): boolean {
    const [owns, setOwns] = useState<boolean>(false);
    const { user } = useUser();
    const router = useRouter();

    useEffect(
        function () {
            if (user) {
                const { slug } = router.query;
                if (
                    typeof slug === "string" &&
                    slugify(user.name, "") === slug
                ) {
                    setOwns(true);
                }
            }
        },
        [user]
    );

    return owns;
}
