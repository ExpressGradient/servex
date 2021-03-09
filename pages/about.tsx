import { FC } from "react";

const About: FC = () => (
    <>
        <main className="container mx-auto px-4 mt-4">
            <h1 className="text-center text-white text-3xl">About</h1>
            <p className="text-gray-300 mt-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
                voluptate distinctio quo? Minus deserunt ea eos aperiam harum
                praesentium corrupti sint quasi maiores iure laboriosam nisi
                exercitationem illum ipsum possimus dolores amet deleniti
                officia provident temporibus, tenetur voluptates. Adipisci
                suscipit hic voluptatibus ut enim fuga modi neque atque soluta
                blanditiis.
            </p>
            <div className="mt-8">
                <h1 className="text-2xl text-blue-400 hover:underline cursor-pointer w-1/2 md:w-1/3">
                    Quick links
                </h1>
                <div className="grid grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-400 col-span-2 w-full h-full p-5 text-center">
                        ServeX
                    </div>
                    <div className="bg-gray-400 col-span-2 w-full h-full p-5"></div>
                    <div className="bg-gray-400 col-span-2 w-full h-full p-5"></div>
                    <main className="bg-gray-400 col-span-2 w-full h-full p-5"></main>
                </div>
            </div>
        </main>
    </>
);

export default About;
