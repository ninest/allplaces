import { useLoaderData } from "react-router-dom"
import { getDivision } from "./countries/api"

export async function divisionPageLoader({ params }: { params: { cca2: string, divisionCode: string } }) {
    const division = await getDivision(params.cca2, params.divisionCode)
    return division
}

export function DivisionPage() {
    const division = useLoaderData() as Awaited<ReturnType<typeof divisionPageLoader>>
    return <div className="space-y-1">{division.cities.map(city => {
        return <div className="text-sm">{city.name}</div>
    })}</div>
}