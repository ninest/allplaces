import { useLoaderData } from "react-router-dom"
import { getCountriesByLetter } from "../../countries/api"
import { CountryLink } from "../../components/country-nav-link"
import { Title } from "../../components/title"

export async function letterPageLoader({ params }: { params: { letter: string } }) {
    const countries = await getCountriesByLetter(params.letter)
    return countries
}

export function LetterPage() {
    const countries = useLoaderData() as Awaited<ReturnType<typeof letterPageLoader>>
    return <>
        <div>
            <Title level={2}>Countries</Title>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                {countries.map(country => {
                    return <CountryLink key={country.cca3} country={country} />
                })}
            </div>
        </div>
    </>
}