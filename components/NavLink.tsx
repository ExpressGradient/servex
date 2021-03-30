import Link from "next/link";

interface NavLinkProps {
    name: string;
    route: string;
    isMobile: boolean;
    isActive: boolean;
}

export default function NavLink(props: NavLinkProps): JSX.Element {
    return (
        <Link href={props.route}>
            <a
                className={`hover:text-blue-400 md:mx-4 ${
                    props.isActive ? "border-b-2 border-blue-500" : ""
                } ${props.isMobile ? "block border-none" : ""}`}
            >
                {props.name}
            </a>
        </Link>
    );
}
