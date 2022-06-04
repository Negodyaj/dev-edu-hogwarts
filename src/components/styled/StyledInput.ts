import styled, { css } from 'styled-components';
import { darkGrayColor, darkTheme, defaultTheme } from '../../shared/colors';
import { InputProps } from './Input';

export type StyledInputProps = {
  isDark: boolean;
  inputProps: InputProps;
};

export const StyledInput = styled.input<StyledInputProps>`
  width: 438px;
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  min-height: 56px;
  background: $white;
  border: 1px solid $medium-gray;
  outline-color: transparent;
  border-radius: 5px;
  padding: 14px 20px 15px 22px;
  margin-top: 10px;
  transition: outline-color 0.3s ease;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &::placeholder {
    font-weight: 400;
    color: $dark-gray;
  }

  &:focus {
    outline: 1px solid $lavender-color;
  }
  .custom-password {
    font-size: 30px;
    letter-spacing: 5px;
    padding-bottom: 0;
    padding-top: 0;
  }
  ${({ isDark, inputProps }) => {
    return css`
      text-align: ${inputProps.textAlign};
      width: ${inputProps.width};
      color: ${darkGrayColor};
      border: 1px solid ${isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor} !important;
      outline: ${inputProps.isInvalid ? '1px solid rgba(255, 41, 0, 0.78)' : ''};
    `;
  }}
`;
