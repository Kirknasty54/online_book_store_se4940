import {Link} from "react-router-dom";
export default function HomePage({loggedIn}) {
    return(
        <div>
            <section className={""}>
                <div className={"py-8 px-4 mx-auto ma-w-screen-xl text-center lg:py-16"}>
                    <h1 className={"mb-4 text-4xl font-extrabold tracking-tight leading-non text-gray-900 md:text-5xl lg:text-6xl dark:text-white"}>Welcme to the best book store ever</h1>
                    <p className={"mb-8 text-lg font-noral text-gray-950 lg:text-xl sm:px-16 dark:text-gray-950"}>
                        Come take a look at our books, they're the best books around, people keep saying they love them, and I love them too. Nobody reads as many books as me, people think they do
                        but they really don't. I love books, I love reading, I love books, I love authors.
                    </p>
                    <div className={"flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"}>
                        {!loggedIn && (
                            <Link to={"/login"} className={"inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4" +
                                "focus:ring-blue-300 dark:focus:ring-blue-900"} >
                                Login
                                <svg className={"w-3.5 h-3.5 ms-2 rtl:rotate-180"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} d={"M1 5h12m0 0L9 1m4 4L9 9"}/>
                                </svg>
                            </Link>
                        )}
                        <Link to={"/books"}
                              className={`py-3 px-5 ${!loggedIn ? 'sm:ms-4' : ''} text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
                            See our Books
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    )
}