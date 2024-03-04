import { useEffect } from "react";
import { useGetAllPostsQuery } from "../../redux/api/blogBuilder"
import { GetPostsCard } from "./GetPostsCard/GetPostsCard";

type PostProps = {
    id: string | undefined;
    title: string;
    image: string;
    desc: string;
}

export const GetPosts = () => {

    const {data: allPosts, refetch} = useGetAllPostsQuery({});
    console.log(allPosts)

    useEffect(() => {
        refetch()
    }, [refetch])
  return (
    <div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            { allPosts && allPosts.map((post: PostProps) => {
                return <GetPostsCard key={post.id} posts={post} />
            })}
        </ul>
    </div>
  )
}
