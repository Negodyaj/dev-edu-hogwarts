import { Link } from 'react-router-dom';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

export type LinkArrowProps = {
  text: string;
  to?: string;
};

export const LinkArrow = (props: LinkArrowProps) => {
  return (
    <Link className="link-arrow" to={`/${props.to}`}>
      {props.text}
      <SvgArrow direction="right" />
    </Link>
  );
};
