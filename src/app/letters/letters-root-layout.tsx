import clsx from "clsx"
import { useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

export function LettersRootLayout() {
    useKeyboardNavigation()
    const keyboardLetters = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

    return <main className="p-5">
        {/* Keyboard */}
        <section className="space-y-2">
            {keyboardLetters.map(row => {
                const letters = row.split('')
                return <div key={row} className="space-x-2">
                    {letters.map(letter => {
                        return <NavLink
                            key={letter}
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

function useKeyboardNavigation() {
    const navigate = useNavigate();
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key >= 'a' && e.key <= 'z' || e.key >= 'A' && e.key <= 'Z') {
            navigate(`./${e.key[0].toUpperCase()}`)
        }
    }
}