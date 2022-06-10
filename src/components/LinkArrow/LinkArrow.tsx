import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { StyledLinkArrow } from './styled/StyledLinkArrow';

export type LinkArrowProps = {
  text: string;
  to?: string;
};

export const LinkArrow = (props: LinkArrowProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  return (
    <StyledLinkArrow isDarkMode={isDark} className="link-arrow" to={`/${props.to}`}>
      {props.text}
      <SvgArrow direction="right" />
    </StyledLinkArrow>
  );
};
