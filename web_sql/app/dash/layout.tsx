import SiteHeader from "@/components/siteHeader"

import SiteFooter from "@/components/siteFooter"


export default function DashboardLayout({
        children,
    }: {
        children: React.ReactNode
    }) {
        return (
        <>
                <SiteHeader />
                <section>   
                        {children}
                </section>
                <SiteFooter />
        </>
        )
    }
