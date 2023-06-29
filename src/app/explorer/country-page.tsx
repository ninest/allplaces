import { ReactNode } from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { CountryLink } from "./../../components/country-nav-link";
import { Debug } from "./../../components/debug";
import { GhostNavLink } from "./../../components/ghost-nav-link";
import { Title } from "./../../components/title";
import { Timezone } from "./../../countries";
import { getCountry } from "./../../countries/api";
import { getFlagSvgSrc, officialNameSame } from "./../../countries/functions";

export async function countryPageLoader({ params }: { params: { cca2: string } }) {
  const { country, borderingCountries } = await getCountry(params.cca2);
  return { country, borderingCountries };
}

export function CountryPage() {
  const { country, borderingCountries } = useLoaderData() as Awaited<ReturnType<typeof countryPageLoader>>;
  const currencyKeys = Object.keys(country.currencies);

  const tzAbbreviations = [...new Set(country.timezones.map((tz) => tz.abbreviation))];
  const timezones: Timezone[] = tzAbbreviations.map((abbreviation) => {
    return country.timezones.find((tz) => tz.abbreviation === abbreviation)!;
  });
  timezones.sort((a, b) => a.gmtOffset - b.gmtOffset);

  const { divisionCode } = useParams() as { divisionCode: string };

  return (
    <div>
      <Title level={1}>{country.name.common}</Title>
      <div>
        {!officialNameSame(country) && <>{country.name.official}, </>}
        {country.subregion && <>{country.subregion}, </>}
        {country.region}
      </div>

      <section className="mt-5">
        <img src={getFlagSvgSrc(country)} className="w-full md:rounded-xl md:shadow" />
      </section>

      <div className="mt-5 space-y-7">
        {borderingCountries.length > 0 && (
          <>
            <section>
              <Title level={2}>Borders</Title>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {borderingCountries.map((country) => {
                  return <CountryLink key={country.cca2} country={country} />;
                })}
              </div>
            </section>
          </>
        )}

        {currencyKeys.length > 0 && (
          <>
            <section>
              <Title level={2}>Currencies</Title>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {currencyKeys.map((key) => {
                  const currency = country.currencies[key];
                  return <IconInfoDisplay key={key} icon={currency.symbol} title={currency.name} />;
                })}
              </div>
            </section>
          </>
        )}

        {country.timezones.length > 0 && (
          <>
            <section>
              <Title level={2}>Timezones</Title>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {timezones.map((tz) => {
                  // Add closing bracket
                  let name = tz.tzName;
                  if (tz.tzName.includes("(") && !tz.tzName.includes(")")) name = name + ")";
                  return (
                    <IconInfoDisplay
                      key={tz.abbreviation}
                      icon={<span className="text-xs">{tz.abbreviation}</span>}
                      title={name}
                      description={`${tz.gmtOffsetName}`}
                    />
                  );
                })}
              </div>
            </section>
          </>
        )}

        {country.states.length > 0 && (
          <>
            <section>
              <Title level={2}>Divisions</Title>
              <div className="mt-3 space-y-0.5">
                {country.states.map((state) => {
                  const isOnStatePage = divisionCode === state.state_code;
                  return (
                    <div key={state.id}>
                      <GhostNavLink to={`./${state.state_code}`}>
                        <IconInfoDisplay icon={state.state_code.slice(0, 2)} title={state.name} />
                      </GhostNavLink>
                      {isOnStatePage && (
                        <div className="mt-2 ml-5 mb-2">
                          <Outlet />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

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

function IconInfoDisplay({ icon, title, description }: { icon: ReactNode; title: string; description?: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="p-1 w-8 h-8 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center font-mono">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        {description && <div className="text-sm">{description}</div>}
      </div>
    </div>
  );
}
