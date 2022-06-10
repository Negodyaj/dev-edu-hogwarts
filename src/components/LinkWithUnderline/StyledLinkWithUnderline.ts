import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darkTheme, defaultTheme } from '../../shared/colors';

export const StyledLinkWithUnderline = styled(Link)<{ isDarkMode: boolean }>`
  cursor: pointer;
  text-underline-offset: 1px;
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.isDarkMode ? darkTheme.darkLavender : defaultTheme.darkLavender)};
  text-decoration: underline;
`;
