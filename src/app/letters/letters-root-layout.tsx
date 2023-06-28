import clsx from "clsx"
import { NavLink, Outlet } from "react-router-dom"

export function LettersRootLayout() {
    const keyboardLetters = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return <main className="p-5">
        {/* Keyboard */}
        <section className="space-y-2">
            {keyboardLetters.map(row => {
                const letters = row.split('')
                return <div className="space-x-2">
                    {letters.map(letter => {
                        return <NavLink
                            to={`./${letter.toUpperCase()}`}
                            className={({ isActive }) => clsx("uppercase font-mono w-5 h-7 p-1 rounded", { "bg-gray-100": !isActive, "bg-primary-100": isActive })}>{letter}</NavLink>
                    })}
                </div>
            })}
        </section>

        <div className="mt-5">
            <Outlet />
        </div>
    </main>
}