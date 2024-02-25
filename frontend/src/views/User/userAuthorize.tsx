import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hook/hook"
import { Navigation } from "../../components/Navigation/navigation";

export const UserAuthorize = () => {
    const user = useAppSelector(state => state.auth.userInfo);

    return user ? (<>
    <Navigation />
    <Outlet />
     </>): <Navigate to="/login" />
}
