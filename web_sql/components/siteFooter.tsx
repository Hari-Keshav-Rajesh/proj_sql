import { Icons } from "@/config/icons"

import { siteConfig } from "@/config/siteconfig"

export default function SiteFooter(){
    return(
        <div className="flex justify-center lg:justify-around items-center mt-20 border-t-4 p-8">
            <div className="flex flex-col justify-center gap-6">
                <div className="flex gap-3">
                    <Icons.mapPin className="w-8 h-8"/>
                    <div>{siteConfig.address}</div>
                </div>
                <div className="flex gap-3">
                    <Icons.phone className="w-8 h-8"/>
                    <div>{siteConfig.phone}</div>
                </div>
                <div className="flex gap-3">
                    <Icons.mail className="w-8 h-8"/>
                    <div>{siteConfig.email}</div>
                </div>
            </div>
            <div className="hidden lg:flex flex-col gap-5">
                <div className="flex justify-center text-lg font-bold">About</div>
                <div className="text-sm">INFINITI Library is a vibrant hub for creativity and learning.<br/> We offer a diverse collection of books and resources to<br/>inspire our community, fostering a lifelong love for<br/>reading and exploration.</div>
            </div>
        </div>
    )
}