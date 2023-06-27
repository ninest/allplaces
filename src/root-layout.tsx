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

  const [searchQuery, setSearchQuery] = useState("");
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
    return (
      country.name.common.toLowerCase().includes(searchQuery) ||
      country.name.official.toLowerCase().includes(searchQuery) ||
      country.region.toLowerCase().includes(searchQuery) ||
      country.subregion.toLowerCase().includes(searchQuery)
    );
  });

  const sidebar = (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search ..."
        className="form-field w-full"
      />
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
        <aside className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="p-5 h-full space-y-3">{sidebar}</div>
        </aside>
        <div className="flex-1 h-screen overflow-y-scroll">
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
