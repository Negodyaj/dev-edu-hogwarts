import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../shared/colors';

export type LoaderStyledProps = {
  isDark: boolean;
  loaderCount: number;
};

export const LoaderStyled = styled.div<LoaderStyledProps>`
  ${({ loaderCount: LoaderCount, isDark }) => {
    return css`
      display: ${LoaderCount > 0 ? 'block' : 'none'};
      background-color: ${isDark ? darkTheme.darkLavender : defaultTheme.darkLavender};
    `;
  }};
`;
