import styled from 'styled-components';
import { ButtonModel } from '../Button';
import {
  buttonTextStyle,
  coloredStyle,
  ellipseStyleWithColor,
  StyledButtonProps,
  whiteStyle,
} from './StyledButton';

export const StyledButtonWithLink = styled.a<StyledButtonProps>`
  text-decoration: none;
  font-family: inherit;
  font-weight: 400;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 0;
  padding: 15px 30px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  ${({ buttonProps, isDark }) => {
    switch (buttonProps?.model) {
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
      default:
        break;
    }
  }}
`;
