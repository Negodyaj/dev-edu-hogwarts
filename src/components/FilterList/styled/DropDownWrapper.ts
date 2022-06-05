import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';

export type WrapperProps = {
  isDark: boolean;
};

export const DropDownWrapper = styled.div<WrapperProps>`
  ${({ isDark }) => {
    return css`
      display: flex;
      font-size: 18px;
      width: fit-content;
      position: relative;

      span {
        color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }

      & button {
        padding: 0;
        border: 0;
        background-color: transparent;
        font-size: 18px;
      }
    `;
  }}
`;
