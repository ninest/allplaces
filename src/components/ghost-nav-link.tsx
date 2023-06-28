import clsx from "clsx";
import { ComponentProps } from "react";
import { NavLink } from "react-router-dom";

export function GhostNavLink(props: ComponentProps<typeof NavLink>) {
    return <NavLink
        {...props}
        to={props.to}
        className={({ isActive }) =>
            clsx("block rounded-lg -mx-2 px-2 py-2 hover:bg-gray-100 text-sm group", { "bg-primary-50": isActive },
                props.className)
        }
    >{props.children}</NavLink>
}