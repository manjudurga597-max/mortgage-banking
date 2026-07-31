import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout(){

    return(
        <div className="flex h-screen">

    <Sidebar />

    <div className="flex-1 overflow-y-auto">
        <Outlet />
    </div>

</div>

        

    );

}

export default Layout;