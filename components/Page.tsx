import Head from "next/head";
import { useRouter } from "next/router";
import { useDbUserImage, useWindowWidth } from "../utils/customHooks";
import Image from "next/image";
import NavLink from "./NavLink";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

interface PageProps {
    title?: string;
    description?: string;
}

export default function Page({
    title = "ServeX",
    description = "A website for Exchanging Services",
}: PageProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="Services Exchange,Freelancing,Find Jobs"
                />
            </Head>
            <AppBar />
        </>
    );
}

function Drawer(): JSX.Element {
    const router = useRouter();
    const { user } = useUser();

    const featureLinks: string[] = ["Create New Job", "For Hire"];
    const navLinks: Array<{ name: string; route: string }> = [
        { name: "Home", route: "/" },
        { name: "About", route: "/about" },
    ];

    return (
        <div className="fixed bg-white top-15 w-full text-center py-3 px-4">
            <h4 className="text-black text-lg">Feature Links</h4>
            <div className="text-left text-blue-700">
                {featureLinks.map((featureLink) => (
                    <NavLink
                        name={featureLink}
                        route={slugify(featureLink, "_").toLowerCase()}
                        key={featureLink}
                        isMobile={true}
                        isActive={
                            router.pathname ===
                            `/${slugify(featureLink, "_").toLowerCase()}`
                        }
                    />
                ))}
            </div>
            <h4 className="text-black text-lg">Navigation Links</h4>
            <div className="text-left text-blue-700">
                {navLinks.map((navLink) => (
                    <NavLink
                        {...navLink}
                        key={navLink.name}
                        isMobile={true}
                        isActive={router.pathname === navLink.route}
                    />
                ))}
                {!user && (
                    <NavLink
                        name="Auth"
                        route="/api/auth/login"
                        isActive={false}
                        isMobile={true}
                    />
                )}
            </div>
        </div>
    );
}

export function AppBar(): JSX.Element {
    const router = useRouter();
    const dbUserImage: string = useDbUserImage();
    const windowWidth: number = useWindowWidth();
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    useEffect(function () {
        router.events.on("routeChangeStart", function (url, { shallow }) {
            setShowDrawer(false);
        });

        return function () {
            router.events.off("routeChangeStart", function (url, { shallow }) {
                setShowDrawer(false);
            });
        };
    });

    const featureLinks: string[] = ["Create New Job", "For Hire"];
    const navLinks: Array<{ name: string; route: string }> = [
        { name: "Home", route: "/" },
        { name: "About", route: "/about" },
    ];

    async function handleTitleClick() {
        await router.push("/");
    }

    function handleMenuClick() {
        setShowDrawer(!showDrawer);
    }

    return (
        <>
            <header className="bg-gray-900 p-4 relative md:flex md:justify-between">
                {windowWidth < 768 && (
                    <div className="absolute top-6 left-6">
                        <Image
                            src="/menu-icon.png"
                            alt="Menu Icon"
                            width={24}
                            height={24}
                            onClick={handleMenuClick}
                        />
                    </div>
                )}
                <h1
                    className="text-white text-4xl text-center cursor-pointer"
                    onClick={handleTitleClick}
                >
                    ServeX
                </h1>
                {dbUserImage && windowWidth < 768 && (
                    <div className="absolute top-5 right-5 p-0">
                        <Image
                            src={dbUserImage}
                            alt="User Profile Picture"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </div>
                )}
                {windowWidth > 768 && (
                    <div className="flex justify-around mt-2 text-blue-500 text-lg">
                        {featureLinks.map((featureLink) => (
                            <NavLink
                                name={featureLink}
                                route={slugify(featureLink, "_").toLowerCase()}
                                isMobile={false}
                                isActive={
                                    router.pathname ===
                                    `/${slugify(
                                        featureLink,
                                        "_"
                                    ).toLowerCase()}`
                                }
                                key={featureLink}
                            />
                        ))}
                    </div>
                )}
                {windowWidth > 768 && (
                    <div className="flex justify-around mt-2 text-blue-500 text-lg">
                        {navLinks.map((navLink) => (
                            <NavLink
                                {...navLink}
                                isActive={router.pathname === navLink.route}
                                isMobile={false}
                                key={navLink.name}
                            />
                        ))}
                        {dbUserImage ? (
                            <div className="mx-2">
                                <Image
                                    src={dbUserImage}
                                    alt="User Profile Picture"
                                    width={32}
                                    height={32}
                                    className="rounded-full cursor-pointer"
                                />
                            </div>
                        ) : (
                            <NavLink
                                name="Auth"
                                route="/api/auth/login"
                                isActive={false}
                                isMobile={false}
                            />
                        )}
                    </div>
                )}
            </header>
            {windowWidth && showDrawer && <Drawer />}
        </>
    );
}
