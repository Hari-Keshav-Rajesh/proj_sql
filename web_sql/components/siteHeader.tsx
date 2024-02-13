import ThemeToggle from "./themeToggle";

export default function SiteHeader(){
    return(
        <div className="flex justify-between items-center">
            <div className="text-4xl font-bold">INFINITI</div>
            <ThemeToggle />
        </div>
    )
}