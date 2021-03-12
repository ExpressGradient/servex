import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FC } from "react";
import CustomHead from "../components/CustomHead";

const CreateJob: FC = () => (
    <>
        <CustomHead
            title="ServeX - Create a new Job"
            description="Create a new ServeX Job"
        />
    </>
);

export default withPageAuthRequired(CreateJob);
