import { Link } from "react-router-dom";

interface PostProps {
  posts: {
    title: string;
    desc: string;
    image: string;
    id: string;
  };
}

export const GetPostsCard = ({ posts }: PostProps) => {
  return (
    <>
    <Link to={`/blog/${posts.id}`}>
      <li className="flex flex-col justify-center items-center gap-3 flex-wrap w-full max-w-[450px] bg-red-100 p-4 mx-auto mb-5 rounded-md">
        <h2 className="text-2xl text-red-900 font-bold">{posts.title}</h2>
        <img className="max-w-full h-[200px] object-cover" src={posts.image} alt={posts.title} />
        <p className="text-center text-lg">{posts.desc.slice(0, 150)}</p>
      </li>
      </Link>
    </>
  );
};
