import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../supabase/client";

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
    const dbCategoriesResponse = await supabase
        .from("categories")
        .select("category");
    const dbCategoriesMap = dbCategoriesResponse.data;
    const dbCategories: string[] = dbCategoriesMap.map(
        (categoryObject) => categoryObject.category
    );

    res.json(dbCategories);
};

export default getCategories;
