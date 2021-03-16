import { Dispatch, FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

interface ActiveLinkProps {
    route: string;
    name: string;
    isMobile?: boolean;
}

const ActiveLink: FC<ActiveLinkProps> = (props) => {
    const router = useRouter();

    return (
        <Link href={props.route}>
            <a
                className={`hover:text-blue-400 md:mx-4 ${
                    router.pathname === props.route &&
                    "border-b-2 border-blue-500"
                } ${props.isMobile && "block border-none"}`}
            >
                {props.name}
            </a>
        </Link>
    );
};

function navLinkGen(name: string, route: string): ActiveLinkProps {
    return { name, route };
}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
};

interface DrawerProps {
    featureLinks: ActiveLinkProps[];
    navLinks: ActiveLinkProps[];
    user: UserProfile;
}

const Drawer: FC<DrawerProps> = (props) => (
    <div className="fixed bg-white top-15 w-full text-center py-3 px-4">
        <h4 className="text-black text-lg">Feature Links</h4>
        <div className="text-left text-blue-700">
            {props.featureLinks.map((featureLink) => (
                <ActiveLink
                    {...featureLink}
                    key={featureLink.name}
                    isMobile={true}
                />
            ))}
        </div>
        <h4 className="text-black text-lg">Navigation Links</h4>
        <div className="text-left text-blue-700">
            <div>
                {props.navLinks.map((navLink) => (
                    <ActiveLink
                        {...navLink}
                        key={navLink.name}
                        isMobile={true}
                    />
                ))}
            </div>
            {props.user ? (
                <ActiveLink name={"Profile"} route={"/profile"} />
            ) : (
                <ActiveLink name={"Auth"} route={"/api/auth/login"} />
            )}
        </div>
    </div>
);

const Header: FC = () => {
    const router = useRouter();
    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const navLinks: ActiveLinkProps[] = [
        navLinkGen("Home", "/"),
        navLinkGen("About", "/about"),
    ];
    const featureLinks: ActiveLinkProps[] = [
        navLinkGen("Create New Job", "/create_job"),
        navLinkGen("For Hire", "/for_hire"),
    ];

    const handleHomeClick = () => router.push("/");

    const toggleDrawer = () => setShowDrawer(!showDrawer);

    const handleProfileClick = () => router.push(`/profile/${user.name}`);

    if (windowWidth < 768) {
        return (
            <>
                <header className="bg-gray-900 p-4 relative">
                    <h1
                        className="text-white text-4xl text-center"
                        onClick={handleHomeClick}
                    >
                        ServeX
                    </h1>
                    {user && (
                        <div className="absolute top-5 right-5 p-0">
                            <Image
                                src={user.picture}
                                alt="User Profile Picture"
                                width={32}
                                height={32}
                                className="rounded-full"
                                onClick={handleProfileClick}
                            />
                        </div>
                    )}
                    <div className="absolute top-6 left-6">
                        <Image
                            src="/menu-icon.png"
                            alt="Menu Icon"
                            width={24}
                            height={24}
                            onClick={toggleDrawer}
                        />
                    </div>
                </header>
                {showDrawer && (
                    <Drawer
                        navLinks={navLinks}
                        featureLinks={featureLinks}
                        user={user}
                    />
                )}
            </>
        );
    }

    return (
        <header className="bg-gray-900 p-4 flex justify-between">
            <h1
                className="text-white text-4xl cursor-pointer mx-4"
                onClick={handleHomeClick}
            >
                ServeX
            </h1>
            <div className="flex justify-around mt-2 text-blue-500 text-lg">
                {featureLinks.map((featureLink) => (
                    <ActiveLink {...featureLink} key={featureLink.name} />
                ))}
            </div>
            <div className="flex justify-around mt-2 text-blue-500 text-lg">
                {navLinks.map((navLink) => (
                    <ActiveLink {...navLink} key={navLink.name} />
                ))}
                {user ? (
                    <div className="mx-4">
                        <Image
                            src={user.picture}
                            alt="User Profile Picture"
                            width={32}
                            height={32}
                            className="rounded-full cursor-pointer"
                            title="Go to your Profile"
                            onClick={handleProfileClick}
                        />
                    </div>
                ) : (
                    <ActiveLink name="Auth" route="/api/auth/login" />
                )}
            </div>
        </header>
    );
};

export default Header;
