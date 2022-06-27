import { ReactNode } from "react"
import { iRouterItem } from "../../interfaces/interfaces"
import { Footer } from "./footer"
import { Header } from "./header"


export function Layout({
    children,
    navOptions,
}: {
    children: ReactNode;
    navOptions: iRouterItem[];
}){
    return (
        <>
            <Header navOptions={navOptions} />
            <main>{children}</main>
            <Footer />
        </>
    )
}