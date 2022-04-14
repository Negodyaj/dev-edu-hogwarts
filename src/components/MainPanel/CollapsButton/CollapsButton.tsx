import { SvgLeftChevron } from '../../SvgIcon/SvgFiles/SvgLeftChevron';
import './CollapseButton.scss'

export type CollapseEvent = {
  onClick: () => void; 
}

export const CollapseButton = (props: CollapseEvent) => {
  return (
        <button className='collapse-button' onClick={props.onClick}>
          <div className='left-part'>
            <SvgLeftChevron/>
          </div>
          <div className='right-part'/>
        </button>
      )
}