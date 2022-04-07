import {Link, useMatch} from "react-router-dom";
import "./ButtonNavigation.scss";
import { SvgIcon } from "../../SvgIcon/SvgIcon";
import { NavLink } from "../Navigation/Navigation";

export type ButtonProps = {
  data: NavLink
}

export const ButtonNavigation = (props: ButtonProps) => {
  const match = useMatch({
    path: props.data.path,
    end: props.data.path.length === 1,
  });

  return (
    <Link
      to={props.data.path}
      className={`nav-link ${match ? 'active' : ''}`}
    >
      <SvgIcon icon={props.data.icon} />
      {props.data.displayName}
    </Link>
  );
}
