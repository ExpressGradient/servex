import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";

async function createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const doc = JSON.parse(req.body);
        const response = await dbClient.createIfNotExists(doc);
        res.json(response);
    } catch (e) {
        console.log("Error in creating user", e);
        res.send(e);
    }
}

export default withApiAuthRequired(createUser);
