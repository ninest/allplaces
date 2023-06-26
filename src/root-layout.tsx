import clsx from "clsx";
import { NavLink, Outlet, useLoaderData, useParams, useLocation } from "react-router-dom";
import { Country } from "./countries";
import { getCountries } from "./countries/api";

export async function rootLayoutLoader() {
  const countries = await getCountries();
  return countries;
}

export function RootLayout() {
  const countries = useLoaderData() as Country[];
  const location = useLocation();
  const onCountryPage = location.pathname !== "/";

  const sidebar = (
    <>
      {countries.map((country, index) => {
        return <CountryLink key={index} country={country} />;
      })}
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
          <div className="p-5 space-y-1">{sidebar}</div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <aside className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="p-5 space-y-1 h-full">{sidebar}</div>
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
