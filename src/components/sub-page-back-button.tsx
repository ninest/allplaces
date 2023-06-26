import { Link } from "react-router-dom";

interface SubPageBackButtonProps {
  href?: string;
}

export const SubPageBackButton = ({ href = "/" }: SubPageBackButtonProps) => {
  return (
    <Link to={href} className="-mx-2 p-2 rounded-md hover:bg-gray-100">
      {"<"}
    </Link>
  );
};
