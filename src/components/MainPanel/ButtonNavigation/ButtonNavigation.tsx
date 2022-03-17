import { Link } from "react-router-dom";
import "./ButtonNavigation.scss";
import { useLocation } from "react-router-dom";
import { SvgIcon } from "../../SvgIcon/SvgIcon";
import { NavLink } from "../Navigation/Navigation";

export type ButtonProps = {
  data: NavLink
}

export const ButtonNavigation = (props: ButtonProps) => {
  const location = useLocation();
  console.log('current button:');
  console.log(props.data.path);
  console.log(location);

  return (
    <Link
      to={props.data.path}
      className={`nav-link ${props.data.path === location.pathname ? 'active' : ''}`}
    >
      <SvgIcon icon={props.data.icon} />
      {props.data.displayName}
    </Link>
  );
}
