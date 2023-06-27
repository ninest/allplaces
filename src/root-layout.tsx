import clsx from "clsx";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Country } from "./countries";
import { getCountries } from "./countries/api";
import { useState } from "react";

export async function rootLayoutLoader() {
  const countries = await getCountries();
  return countries;
}

export function RootLayout() {
  const countries = useLoaderData() as Country[];
  const location = useLocation();
  const onCountryPage = location.pathname !== "/";

  const regions = [...new Set(countries.map((country) => country.region))].sort();

  const [searchQuery, setSearchQuery] = useState("");
  const toggleRegionFilter = (region: string) => {
    if (searchQuery.toLowerCase().includes(region.toLowerCase())) {
      // setSearchQuery(searchQuery.replaceAll(region, ""));
      // Case insensitive replace all
      setSearchQuery(searchQuery.replace(new RegExp(region, "gi"), "").trim());
    } else {
      setSearchQuery(`${region} ${searchQuery.trim()}`);
    }
  };

  const filteredCountries = countries.filter((country) => {
    if (!searchQuery) return true;
    const groups = searchQuery.toLowerCase().trim().split(" ");
    return groups.some(
      (group) =>
        country.name.common.toLowerCase().includes(group) ||
        country.name.official.toLowerCase().includes(group) ||
        country.region.toLowerCase().includes(group) ||
        country.subregion.toLowerCase().includes(group) ||
        country.flag.toLowerCase().includes(group)
    );
  });

  const sidebar = (
    <>
      <form className="space-y-2">
        <fieldset>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ..."
            className="form-field w-full"
          />
        </fieldset>
        <fieldset className="flex flex-wrap">
          {regions.map((region) => {
            const included = searchQuery.toLowerCase().includes(region.toLowerCase());
            console.log(included);

            return (
              <button
                key={region}
                onClick={() => toggleRegionFilter(region)}
                type="button"
                className={clsx("text-gray-500 text-sm px-2 py-1 mr-1 mb-1 rounded-full", {
                  "bg-gray-50 ": !included,
                  "bg-primary-100": included,
                })}
              >
                {region}
              </button>
            );
          })}
        </fieldset>
      </form>
      <div className="space-y-1">
        {filteredCountries.map((country, index) => {
          return <CountryLink key={index} country={country} />;
        })}
      </div>
    </>
  );
  return (
    <main>
      {/* Mobile */}
      <div className="md:hidden">
        {onCountryPage ? (
          <>
            <Outlet />
          </>
        ) : (
          <div className="p-5 space-y-3">{sidebar}</div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <aside className="md:w-[300px] lg:w-[400px] md:border-r">
          <div className="p-5 h-full space-y-3">{sidebar}</div>
        </aside>
        <div className="flex-1 h-screen ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

function CountryLink({ country }: { country: Country }) {
  return (
    <NavLink
      to={`/${country.cca2}`}
      className={({ isActive }) =>
        clsx("block rounded-lg -mx-2 px-2 py-2 hover:bg-gray-100 text-sm group", { "bg-primary-50": isActive })
      }
    >
      {({ isActive }) => (
        <div className="flex space-x-2">
          <div
            className={clsx(
              "p-1 w-8 h-8 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center text-lg justify-center",
              { "bg-primary-200": isActive }
            )}
          >
            {country.flag}
          </div>
          <div>
            <div className="block font-semibold">{country.name.common}</div>
            <div>
              {country.subregion && <>{country.subregion}, </>}
              {country.region}
            </div>
          </div>
        </div>
      )}
    </NavLink>
  );
}
