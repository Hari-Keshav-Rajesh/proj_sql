import ThemeToggle from "./themeToggle";

export default function SiteHeader(){
    return(
        <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Web SQL</h1>
        <nav>
            <ul className="flex gap-4">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            </ul>
            <ThemeToggle />
        </nav>
        </header>
    )
}