
import { useGetCategoriesQuery } from "../../redux/api/categoryBuilder"

export const GetCategories = () => {

    const {data} = useGetCategoriesQuery([])
    console.log(data)
  return (
    <div className="h-12">
        <ul>
            {data && data.map(() => {
                return console.log("hello")
            })}
        </ul>
    </div>
  )
}
