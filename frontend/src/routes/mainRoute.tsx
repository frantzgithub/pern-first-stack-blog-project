import { Navigate, Route, Routes } from "react-router-dom"
import { Home, IsUserAdmin, Landing, Login, NotFound, Profile, Register, UpdateUserId, UserAuthorize, UsersList } from "../views"
import { useAppSelector } from "../hook/hook"


export const MainRoute = () => {
    const user = useAppSelector(state => state.auth.userInfo)
  return (
    <>
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<UserAuthorize />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* admin routes */}
          <Route element={<IsUserAdmin />}>
            <Route path="users" element={<UsersList />} />
            <Route path="users/update/:id" element={<UpdateUserId />} />
          </Route>
          

          {/*404 not found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}
