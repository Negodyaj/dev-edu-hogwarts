import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme, lavenderColor } from '../../../shared/colors';

export type DropDownElemProps = {
  isDark: boolean;
};

export const DropDownElement = styled.li<DropDownElemProps>`
  ${({ isDark }) => {
    return css`
      cursor: pointer;
      border-bottom: 1px solid ${isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
      padding: 9px 0;
      color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};

      &:last-child {
        border: 0;
        padding-top: 10px;
        padding-bottom: 0;
      }

      &:first-child {
        padding-bottom: 10px;
        padding-top: 0;
      }

      &::marker {
        content: '';
      }

      &:hover {
        color: ${lavenderColor};
      }
    `;
  }}
`;
