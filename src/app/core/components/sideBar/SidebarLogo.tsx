import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`
        animate-fadeSlide transition-all duration-300 pb-3
        ${isCollapsed ? "w-8" : "w-24"} 
    `}>
        <img 
        src={isCollapsed? 'src/assets/YusrLogoOnly_Light.png' : 'src/assets/YusrLogoRTL_Light.png'}
        alt="Yusr Logo" 
        className="block dark:hidden transition-all duration-300 h-auto object-contain w-full" 
        />
        
        <img 
        src={isCollapsed? 'src/assets/YusrLogoOnly_Dark.png' : 'src/assets/YusrLogoRTL_Dark.png'}
        alt="Yusr Logo" 
        className="hidden dark:block transition-all duration-300 h-auto object-contain w-full" 
        />
    </div>
  );
}