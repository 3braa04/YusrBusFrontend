import { ThemeToggle } from "@/app/core/components/theme/themeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function LandingHeader()
{
    return (
        <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center w-32">
                <img src="src/assets/YusrBusLogoRTL_Light.png" alt="يُسر بص" className="block dark:hidden h-auto w-full object-contain" />
                <img src="src/assets/YusrBusLogoRTL_Dark.png"  alt="يُسر بص" className="hidden dark:block h-auto w-full object-contain" />
            </div>
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <Link to="/login">
                    <Button size="lg" variant="default">تسجيل الدخول</Button>
                </Link>
            </div>
            </div>
        </header>
    );
}