import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";

async function getUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const _id = body._id;
        const data = await dbClient.getDocument(_id);
        res.json(data);
    } catch (error) {
        console.log("Error in fetching user", error);
        res.send(error);
    }
}

export default withApiAuthRequired(getUser);
