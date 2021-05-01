import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "../../../utils/sanityClient";

export default async function getJobs(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { index } = req.query;

    if (typeof index === "string") {
        const query = `
        *[_type == "job"] | order(_createdAt desc) {
            _id,
            _createdAt,
            "author": author -> name,
            "categories": categories[] -> name,
            title,
            reward,
            slug
        } [${index}...${parseInt(index) + 5}]
        `;

        let jobs = await sanityClient.fetch(query);

        res.json(jobs);
    }
}
