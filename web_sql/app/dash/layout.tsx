import SiteHeader from "@/components/siteHeader"


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
        </>
        )
    }
