import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export const Landing = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col px-2 sm:px-0 mt-10 sm:mt-0 sm:justify-center items-center text-white text-center">
        <h1 className="_title">welcome <span className=" text-red-700 font-bold" >
        <Typewriter
            words={['to berlinblog', 'everyone', 'to my blog']}
            loop={true}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={2000}
            />
          </span></h1>
        <h3 className="text-2xl p-2">In this blog you'll learn everything about javascript and python</h3>
        <p className="text-base mt-3 sm:mt-1">click the button <Link className="text-red-700 uppercase font-semibold" to='/login'>sign-in</Link> if you already have an account
            or <Link className="text-red-700 uppercase font-semibold" to='/register'>sign-up</Link> if you don't
        </p>
        <div className="mt-10">
            <Link className="_button" to='/login'>sign-in</Link>
            <Link className="_button" to='/register'>sign-up</Link>
        </div>
    </section>
  )
}
