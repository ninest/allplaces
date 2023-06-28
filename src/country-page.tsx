import { useLoaderData } from "react-router-dom";
import { CountryLink } from "./components/country-nav-link";
import { Debug } from "./components/debug";
import { Title } from "./components/title";
import { getCountry } from "./countries/api";
import { getFlagSvgSrc, officialNameSame } from "./countries/functions";

export async function countryPageLoader({ params }: { params: { cca2: string } }) {
  const { country, borderingCountries } = await getCountry(params.cca2);
  return { country, borderingCountries };
}

export function CountryPage() {
  const { country, borderingCountries } = useLoaderData() as Awaited<ReturnType<typeof countryPageLoader>>;

  return (
    <div>
      <Title level={1}>{country.name.common}</Title>
      <div>
        {!officialNameSame(country) && <>{country.name.official}, </>}
        {country.subregion && <>{country.subregion}, </>}
        {country.region}
      </div>

      <section className="mt-5">
        <img src={getFlagSvgSrc(country)} className="w-full rounded-3xl shadow" />
      </section>

      <div className="mt-5 space-y-5">
        {borderingCountries.length > 0 && <>
          <section>
            <Title level={2}>Borders</Title>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {borderingCountries.map(country => {
                return <CountryLink country={country} />
              })}
            </div>
          </section></>}
        <section>
          <details>
            <summary>Raw data</summary>
            <Debug data={country} showInProd />
          </details>
        </section>
      </div>

    </div>
  );
}

