import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';

export type StyledTabItemProps = {
  isDark: boolean;
};

export const StyledTabItem = styled.div<StyledTabItemProps>`
  ${({ isDark }) => {
    return css`
      color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      &.active-tab {
        color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      }
    `;
  }}
`;
