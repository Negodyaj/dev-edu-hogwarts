import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme, lavenderColor } from '../../../shared/colors';
import { ButtonModel, ButtonProps } from '../Button';

export type StyledButtonProps = {
  buttonProps: ButtonProps;
  isDark: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  font-family: inherit;
  font-weight: 400;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 0;
  padding: 15px 30px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  ${({ buttonProps, isDark }) => {
    switch (buttonProps.model) {
      case ButtonModel.Colored:
        return css`
          background-color: ${lavenderColor};
          color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
          border: 0;

          &.unavailable,
          &:disabled {
            background: $dark-gray;
            cursor: auto;
          }

          &:hover,
          &:active {
            background: $lavender-button-hover;
          }
        `;
      case ButtonModel.White:
        return css`
          background: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
          border: 1px solid ${lavenderColor};
          color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};

          &.unavailable,
          &:disabled {
            border: 1px solid $dark-gray;
            color: $dark-gray;
            cursor: auto;
          }

          &:hover,
          &:active {
            background-color: ${lavenderColor};
          }
        `;
    }
  }}
`;
