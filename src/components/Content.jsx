export default function Content({children}) {
    return(
        <section className={"items-center justify-center mx-auto max-w-5xl px-4 py-14 md:py-20 text-center"}>
            <div className={"mt-8"}>
                {children}
            </div>
        </section>
    )
}