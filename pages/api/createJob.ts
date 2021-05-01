import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";

async function createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const doc = JSON.parse(req.body);

        for (const categoryDoc of doc.categories) {
            await dbClient.createIfNotExists({
                _type: "category",
                _id: categoryDoc._ref,
                name: categoryDoc._ref,
            });
        }

        doc.reward = parseInt(doc.reward);
        const response = await dbClient.createIfNotExists(doc);

        // for (const categoryDoc of doc.categories) {
        //     await dbClient
        //         .patch(categoryDoc._ref)
        //         .setIfMissing({ jobs: [] })
        //         .append("jobs", [
        //             { _key: nanoid(), _type: "reference", _ref: doc._id },
        //         ])
        //         .commit();
        // }

        console.log(
            `Job Created, ID: ${doc._id}, Title: ${doc.title}, Description: ${doc.description}`
        );
        res.json(response);
    } catch (e) {
        console.log("Error in creating user", e);
        res.send(e);
    }
}

export default withApiAuthRequired(createUser);
