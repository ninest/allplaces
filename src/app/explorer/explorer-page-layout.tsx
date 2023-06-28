import { Outlet } from "react-router-dom";
import { SubPageBackButton } from "../../components/sub-page-back-button";

export function ExplorerPageLayout() {
  return (
    <div className="p-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      <div className="md:hidden mb-2">
        <SubPageBackButton />
      </div>
      <Outlet />
    </div>
  );
}
