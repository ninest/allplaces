import clsx from "clsx";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Country } from "./countries";
import { getCountries } from "./countries/api";
import { useState } from "react";
import { TransparentContainer } from "./components/transparent-container";
import { FaSliders } from 'react-icons/fa6'

export async function rootLayoutLoader() {
  const countries = await getCountries();
  return countries;
}

export function RootLayout() {
  const countries = useLoaderData() as Country[];
  const location = useLocation();
  const onCountryPage = location.pathname !== "/";

  const [showSearchFilters, setShowSearchFilters] = useState(false)
  const regions = [...new Set(countries.map((country) => country.region))].sort();

  const [searchQuery, setSearchQuery] = useState("");
  const toggleRegionFilter = (region: string) => {
    if (searchQuery.toLowerCase().includes(region.toLowerCase())) {
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
    <div>
      <TransparentContainer className="px-5 pt-5 pb-2 sticky top-0">
        <form className="space-y-2">
          <fieldset className="flex items-center items-stretch focus-within:form-field-focus-ring">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ..."
              className="form-field w-full flex-1 rounded-r-none"
            />
            <div className="form-field rounded-l-none flex items-center justify-center">
              <button
                type='button'
                onClick={() => setShowSearchFilters(!showSearchFilters)}
                className={clsx("text-sm p-2 rounded-md flex items-center justify-center", {
                  'bg-gray-200': !showSearchFilters,
                  'bg-primary-100': showSearchFilters
                })}
              >
                <FaSliders />
              </button>
            </div>
          </fieldset>



          {showSearchFilters && <>
            <fieldset className="flex flex-wrap">
              {regions.map((region) => {
                const included = searchQuery.toLowerCase().includes(region.toLowerCase());
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
          </>}
        </form>
      </TransparentContainer>

      <div className="px-5 pb-5 space-y-1">
        {filteredCountries.map((country, index) => {
          return <CountryLink key={index} country={country} />;
        })}
      </div>
    </div >
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
          <div>{sidebar}</div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <aside className="md:w-[300px] lg:w-[400px] md:border-r md:overflow-y-scroll">
          <div className="h-full">{sidebar}</div>
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
