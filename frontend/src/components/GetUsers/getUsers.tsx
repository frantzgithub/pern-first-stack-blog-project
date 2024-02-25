import { UsersCard } from "./UsersCard/usersCard"
import { useGetUsersQuery } from "../../redux/api/userBuilder"
import { useEffect } from "react";


export const GetUsers = () => {
  const {data: getUsers, refetch} = useGetUsersQuery({});
  const users = getUsers;
  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <section>
        <ul>
          {
            users && users.map((user: any) => {
              return <UsersCard key={user.id} users={user} />
            })
          }
        </ul>
       
    </section>
  )
}
