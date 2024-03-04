import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hook/hook";
import { Navigation } from "../../components/Navigation/navigation";

export const IsWriter = () => {
    const user = useAppSelector(state => state.auth.userInfo)

    return user && user.isWriter ? 
    <>
        <Navigation />
        <Outlet />
    </> : <Navigate to="/login" />
}