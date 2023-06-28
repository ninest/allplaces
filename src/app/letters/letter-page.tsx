import { useLoaderData } from "react-router-dom"
import { getCountriesByLetter } from "../../countries/api"
import { CountryLink } from "../../components/country-nav-link"

export async function letterPageLoader({ params }: { params: { letter: string } }) {
    const countries = await getCountriesByLetter(params.letter)
    return countries
}

export function LetterPage() {
    const countries = useLoaderData() as Awaited<ReturnType<typeof letterPageLoader>>
    return <>
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {countries.map(country => {
                    return <CountryLink country={country} />
                })}
            </div>
        </div>
    </>
}