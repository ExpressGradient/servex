import Head from "next/head";
import { FC } from "react";

interface CustomHeadProps {
    title?: string;
    description?: string;
}

const CustomHead: FC<CustomHeadProps> = (props) => (
    <Head>
        <title>{props.title || "ServeX"}</title>
        <meta
            name="description"
            content={props.description || "A website for exchanging services."}
        />
        <meta
            name="keywords"
            content="Services, Exchange, Freelancing, Jobs, Hire"
        />
        <meta name="author" content="ExpressGradient" />
    </Head>
);

export default CustomHead;
