import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darkTheme, defaultTheme } from '../../../shared/colors';

export const StyledLinkArrow = styled(Link)<{ isDarkMode: boolean }>`
  display: flex;
  gap: 4px;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? darkTheme.darkLavender : defaultTheme.darkLavender)};

  .arrow-right,
  .arrow-left {
    & path {
      fill: ${(props) => (props.isDarkMode ? darkTheme.darkLavender : defaultTheme.darkLavender)};
    }
  }
`;
