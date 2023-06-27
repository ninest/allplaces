import { useLoaderData } from "react-router-dom";
import { Debug } from "./components/debug";
import { Title } from "./components/title";
import { Country } from "./countries";
import { getCountry } from "./countries/api";
import { getFlagSvgSrc, officialNameSame } from "./countries/functions";

export async function countryPageLoader({ params }: { params: { cca2: string } }) {
  const country = await getCountry(params.cca2);
  return country;
}

export function CountryPage() {
  const country = useLoaderData() as Country;

  return (
    <div>
      <Title level={1}>{country.name.common}</Title>
      <div>
        {!officialNameSame(country) && <>{country.name.official}, </>}
        {country.subregion && <>{country.subregion}, </>}
        {country.region}
      </div>

      <div className="mt-5">
        <img src={getFlagSvgSrc(country)} className="w-full rounded-3xl shadow" />
      </div>

      <div className="mt-5">
        <details>
          <summary>Raw data</summary>
          <Debug data={country} showInProd />
        </details>
      </div>
    </div>
  );
}
