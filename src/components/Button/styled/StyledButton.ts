import styled, { css } from 'styled-components';
import {
  darkGrayColor,
  darkTheme,
  defaultTheme,
  lavenderButtonHover,
  lavenderColor,
} from '../../../shared/colors';
import { ButtonModel, ButtonProps } from '../Button';

export type StyledButtonProps = {
  buttonProps: ButtonProps;
  isDark: boolean;
};

export const coloredStyle = (isDark: boolean, props: ButtonProps) => {
  return css`
    background-color: ${lavenderColor};
    color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
    border: 0;
    width: ${props.width}px;

    &.unavailable,
    &:disabled {
      background: ${darkGrayColor};
      cursor: auto;
    }

    &:hover,
    &:active {
      background: ${lavenderButtonHover};
    }
  `;
};

export const whiteStyle = (isDark: boolean, props: ButtonProps) => {
  return css`
    background: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
    border: 1px solid ${lavenderColor};
    color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
    width: ${props.width}px;

    &.unavailable,
    &:disabled {
      border: 1px solid ${darkGrayColor};
      color: ${darkGrayColor};
      cursor: auto;
    }

    &:hover,
    &:active {
      background-color: ${lavenderColor};
    }
  `;
};
export const buttonTextStyle = () => {
  return css`
    font-weight: 600;
    line-height: 21px;
    color: ${lavenderColor};
    border: 0;
    padding: 15px 20px;
    background: none;

    &:disabled {
      color: ${darkGrayColor};
      cursor: auto;
    }
  `;
};

export const ellipseStyleWithColor = (isDark: boolean, colorModel: ButtonModel) => {
  if (colorModel == ButtonModel.EllipseColored) {
    return css`
      border-radius: 50%;
      padding: 12px;
      margin: 20px 50px;
      width: 45px;
      min-width: 45px;
      height: 45px;
      line-height: 12px;
      background-color: ${lavenderColor};
      color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      border: 0;

      &.unavailable,
      &:disabled {
        background: ${darkGrayColor};
        cursor: auto;
      }

      &:hover,
      &:active {
        background: ${lavenderButtonHover};
        color: ${defaultTheme.whiteColor};
      }
    `;
  }

  if (colorModel == ButtonModel.EllipseWhite) {
    return css`
      border-radius: 50%;
      padding: 12px;
      margin: 20px 50px;
      width: 45px;
      min-width: 45px;
      height: 45px;
      line-height: 12px;
      border: 1px solid ${isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
      svg {
        path {
          fill: ${lavenderColor};
        }
      }
      color: ${lavenderColor};
      /* color: ${isDark ? darkTheme.darkLavender : defaultTheme.darkLavender}; */
      &:hover,
      &:active {
        background-color: ${lavenderColor};
        color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        svg {
          path {
            fill: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
          }
        }
      }
      &.unavailable,
      &:disabled {
        border: 1px solid ${isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
        color: ${darkGrayColor};
        cursor: none;
        svg {
          path {
            fill: ${darkGrayColor};
          }
        }
      }
    `;
  }
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
        return coloredStyle(isDark, buttonProps);
      case ButtonModel.White:
        return whiteStyle(isDark, buttonProps);
      case ButtonModel.EllipseColored:
        return ellipseStyleWithColor(isDark, ButtonModel.EllipseColored);
      case ButtonModel.EllipseWhite:
        return ellipseStyleWithColor(isDark, ButtonModel.EllipseWhite);
      case ButtonModel.Text:
        return buttonTextStyle();
        return;
    }
  }}
`;
