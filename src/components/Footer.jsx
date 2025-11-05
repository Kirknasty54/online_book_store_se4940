export default function Footer(){
    return(
        <footer className={"fixed bottom-0 left-0 z-20 w-full bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800"}>
            <div className={"w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"}>
                      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://github.com/kirknasty54" class="hover:underline">Kirknasty Industries</a>. All Rights Reserved.
                      </span>
                <ul className={"flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"}>
                    <li>
                        <a href={"https://github.com/kirknasty54"} className={"me-4 hover:underline md:me-6"}>Github</a>
                    </li>
                    <li>
                        <a href={"https://www.linkedin.com/in/jackson-kirkpatrick-8b4018224/"} className={"me-4 hover:underline md:me-6"}>LinkedIn</a>
                    </li>
                    <li>
                        <a href={"mailto:kirkpatrick545454@gmail.com?subject=Book Request&body=I LOVE BOOKS. INJECT BOOKS INTO MY BLOOD STREAM!"} className={"me-4 hover:underline md:me-6"}>Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}