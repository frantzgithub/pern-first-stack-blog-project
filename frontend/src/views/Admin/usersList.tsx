import { GetUsers } from "../../components/GetUsers/getUsers"


export const UsersList = () => {
  return (
    <section>
        <h1 className="_title text-center my-9">Admin Dashboard</h1>
        <GetUsers />
    </section>
  )
}
