import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface SubPageBackButtonProps {
  href?: string;
}

export const SubPageBackButton = ({ href = "/" }: SubPageBackButtonProps) => {
  return (
    <Link to={href} className="block">
      <div className="inline-block hover:bg-gray-100 -mx-2 p-2 rounded-md">
        <FaChevronLeft />
      </div>
    </Link>
  );
};
