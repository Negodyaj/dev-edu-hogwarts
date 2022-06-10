import './StyledLinkWithUnderline';
import { StyledLinkWithUnderline } from './StyledLinkWithUnderline';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';

export type LinkWithUnderlineProps = {
  text: string;
  path: string;
};

export const LinkWithUnderline = (props: LinkWithUnderlineProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  return (
    <StyledLinkWithUnderline
      isDarkMode={isDark}
      to={`/${props.path}`}
      className="link-with-text-decoration"
    >
      {props.text}
    </StyledLinkWithUnderline>
  );
};
