export function LettersRootLayout() {
    const keyboardLetters = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return <main className="p-5">
        {/* Keyboard */}
        <section className="space-y-2">
            {keyboardLetters.map(row => {
                const letters = row.split('')
                return <div className="space-x-2">
                    {letters.map(letter => {
                        return <button className="uppercase font-mono w-4 h-7 rounded bg-gray-100">{letter}</button>
                    })}
                </div>
            })}
        </section>
    </main>
}