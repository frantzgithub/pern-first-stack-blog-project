import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section>
      <header className="relative mt-1 mb-2 sm:mt-3 sm:flex justify-between items-center">
        <h1 className="text-4xl uppercase pl-2">
          Berlin<span className=" text-red-700 font-bold">blog</span>
        </h1>
      </header>
      <div className="h-[80vh] flex flex-col justify-center items-center gap-4 text-white">
        <h2 className="text-4xl uppercase font-semibold text-red-800">404 Not Found</h2>
        <p className="text-base px-3 text-center">This page you are looking for is not exist in our app</p>
        <p className="text-base px-3 text-center" >please click on the button below
             that will redirect you to the home page</p>
        <Link className="_button mt-4" to="/">Home</Link>
      </div>
    </section>
  );
};
