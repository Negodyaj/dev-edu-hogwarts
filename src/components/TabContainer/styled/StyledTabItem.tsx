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
      path {
        stroke: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }
      .with-color-on-hover {
        fill: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }
      &.active-tab {
        color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        path {
          stroke: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        }
        .with-color-on-hover {
          fill: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        }
      }
    `;
  }}
`;
