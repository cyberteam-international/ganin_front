import Link from "next/dist/client/link";
import type { IMenuItem } from "../../store/menu.data";

interface Props {
    menuItem: IMenuItem;
    isActive: boolean
}

export function MenuItem({menuItem, isActive} : Props) {
    return (
        <li className={isActive ? "active" : ""}>
            <Link href={menuItem.href}>{menuItem.label}</Link>
        </li>
    );
}