import { Link } from "react-router-dom";
import './Link.scss';
export type LinkProps = {
  goTo: string
}
export const LinkArrow = (props: LinkProps) => {

  return (
    <Link to={`/${props.goTo}`}>
      <p className="goto-text">перейти</p>
      <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path d="M1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM5 5L5.70711 5.70711C6.09763 5.31658 6.09763 4.68342 5.70711 4.29289L5 5ZM0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683418 10.0976 1.31658 10.0976 1.70711 9.70711L0.292893 8.29289ZM0.292893 1.70711L4.29289 5.70711L5.70711 4.29289L1.70711 0.292893L0.292893 1.70711ZM4.29289 4.29289L0.292893 8.29289L1.70711 9.70711L5.70711 5.70711L4.29289 4.29289Z" fill="#643173" />
      </svg>
    </Link>
  );
}