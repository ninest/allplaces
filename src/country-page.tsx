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
  const currencyKeys = Object.keys(country.currencies)

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

        {currencyKeys.length > 0 && <>
          <section>
            <Title level={2}>Currencies</Title>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {currencyKeys.map(key => {
                const currency = country.currencies[key]
                return <IconInfoDisplay icon={currency.symbol} title={currency.name} />
              })}
            </div>
          </section>
        </>}

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

function IconInfoDisplay({ icon, title }: { icon: string, title: string }) {
  return <div className="flex items-center space-x-2">
    <div className="p-1 w-8 h-8 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center">
      {icon}
    </div>
    <div className="font-semi">{title}</div>
  </div>
}