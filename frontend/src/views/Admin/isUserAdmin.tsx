import { Navigation } from "../../components/Navigation/navigation";
import { useAppSelector } from "../../hook/hook";
import { Navigate, Outlet } from "react-router-dom";

export const IsUserAdmin = () => {
    const user = useAppSelector(state => state.auth.userInfo)

    return user.username && user.isAdmin == true ? (
        <>
            <Navigation />
            <Outlet />
        </>
    ) : <Navigate to="/login" />
}