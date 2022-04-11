import { Link } from "react-router-dom";
import "./ButtonNavigation.scss";
import { useLocation } from "react-router-dom";
import { SvgIcon } from "../../SvgIcon";
import { NavLink } from "../Navigation/Navigation";

export type ButtonProps = {
  data: NavLink
}

export const ButtonNavigation = (props: ButtonProps) => {
  const location = useLocation();

  return (
    <Link
      to={props.data.path}
      className={`nav-link flex-center transition-styles ${props.data.path === location.pathname ? 'active' : ''}`}
    >
      <SvgIcon icon={props.data.icon} />
      <span className="links-name transition-styles">
        {props.data.displayName}
      </span>
    </Link>
  );
}
