import {Link, Navigate} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className={"bg-white dark:bg-gray-900"}>
            <div className={"py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"}>
                <div className={"mx-auto max-w-screen-sm text-center"}>
                    <h1 className={"mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"}>404</h1>
                    <p className={"mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"}>Something's missing!</p>
                    <p className={"mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white"}>Go somewhere else where the actual site is idiot!</p>
                </div>
            </div>
        </section>
    )
}