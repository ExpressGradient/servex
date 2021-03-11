import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

interface ActiveLinkProps {
    route: string;
    name: string;
}

const ActiveLink: FC<ActiveLinkProps> = (props) => {
    const router = useRouter();

    return (
        <Link href={props.route}>
            <a
                className={`hover:text-blue-400 md:mx-4 ${
                    router.pathname === props.route &&
                    "border-b-2 border-blue-500"
                }`}
            >
                {props.name}
            </a>
        </Link>
    );
};

function navLinkGen(name: string, route: string): ActiveLinkProps {
    return { name, route };
}

const Header: FC = () => {
    const router = useRouter();
    const { user } = useUser();

    const navLinks = [navLinkGen("Home", "/"), navLinkGen("About", "/about")];

    const handleHomeClick = () => router.push("/");

    return (
        <header className="bg-gray-900 p-4 md:flex md:justify-between">
            <h1
                className="text-white text-4xl text-center cursor-pointer md:mx-4"
                onClick={handleHomeClick}
            >
                ServeX
            </h1>
            <div className="flex justify-around mt-2 text-blue-500 md:text-lg">
                {navLinks.map((navLink) => (
                    <ActiveLink {...navLink} key={navLink.name} />
                ))}
                {user ? (
                    <div className="md:mx-4">
                        <Image
                            src={user.picture}
                            alt="User Profile Picture"
                            width={32}
                            height={32}
                            className="rounded-full"
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
