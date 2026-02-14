import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { Outlet } from "react-router-dom";
import { SideBar } from '../../core/components/SideBar/sideBar';

const MainPage = () => {
  return (
    <SidebarProvider>
        <SideBar variant="inset" />
        <SidebarInset>
            
            <header className="flex h-[--header-height] items-center gap-4 p-4">
                <SidebarTrigger /> 
            </header>

            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <Outlet />
                </div>
            </div>

        </SidebarInset>
    </SidebarProvider>
  );
};

export default MainPage;