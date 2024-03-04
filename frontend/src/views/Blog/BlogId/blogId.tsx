import { useParams } from "react-router-dom";
import { useGetPostIdQuery } from "../../../redux/api/blogBuilder";
import { useEffect } from "react";

export const BlogId = () => {
  const params = useParams();
  const { data: getPost, refetch } = useGetPostIdQuery(params.id);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      {getPost && (
        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <h1 className="_title">{getPost.title}</h1>
          <img className="w-[50%] object-cover max-w-full" src={getPost.image} alt={getPost.title} />
          <h4 className="text-xl text-white">category: <span className="text-red-700">{getPost.category.category_name}</span></h4>
          <p className="text-lg max-w-[750px] leading-7">{getPost.desc}</p>
        </div>
      )}
    </>
  );
};
