import {Link} from "react-router-dom";
import './LinkArrow.scss'
import {SvgArrow} from "../SvgIcon/SvgFiles/SvgArrow";

export type LinkArrowProps = {
    back: boolean
    text: string
    to: string
}

export const LinkArrow = (props: LinkArrowProps) => {
    return(
        <Link className='link-arrow' to={`/${props.to}`}>
            { !props.back && props.text}
            <SvgArrow back={props.back}/>
            { props.back && props.text}
        </Link>
    )
}