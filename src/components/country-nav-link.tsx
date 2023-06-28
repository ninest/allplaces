import clsx from "clsx";
import { Country } from "../countries";
import { GhostNavLink } from "./ghost-nav-link";

export function CountryLink({ country }: { country: Country }) {
  return (
    <GhostNavLink to={`/${country.cca2}`}>
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
    </GhostNavLink>
    // <NavLink
    //   to={`/${country.cca2}`}
    //   className={({ isActive }) =>
    //     clsx("block rounded-lg -mx-2 px-2 py-2 hover:bg-gray-100 text-sm group", { "bg-primary-50": isActive })
    //   }
    // >
    //   {({ isActive }) => (
    //     <div className="flex space-x-2">
    //       <div
    //         className={clsx(
    //           "p-1 w-8 h-8 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center text-lg justify-center",
    //           { "bg-primary-200": isActive }
    //         )}
    //       >
    //         {country.flag}
    //       </div>
    //       <div>
    //         <div className="block font-semibold">{country.name.common}</div>
    //         <div>
    //           {country.subregion && <>{country.subregion}, </>}
    //           {country.region}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </NavLink>
  );
}
