import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "../../utils/sanityClient";

export default async function getCategories(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const query = `
        *[_type == "category"] {name}
    `;

    let categories = await sanityClient.fetch(query);
    categories = categories.map(function (category) {
        return category.name;
    });

    res.json(categories);
}
