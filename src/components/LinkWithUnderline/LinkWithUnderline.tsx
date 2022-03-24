import {Link} from "react-router-dom";
import './LinkWithUnderline.scss'

export type LinkWithUnderlineProps = {
  text: string
  path: string
}

export const LinkWithUnderline = (props: LinkWithUnderlineProps) => {
  return(
      <Link to={`/${props.path}`} className='link-with-text-decoration'>
        {props.text}
        <span></span>
      </Link>
  )
}