import styled, { css } from 'styled-components';
import { darkGrayColor, darkTheme, defaultTheme, lavenderColor } from '../../shared/colors';
import { TextareaProps } from './Textarea';

export type StyledTextareaProps = {
  isDark: boolean;
  textareaProps: TextareaProps;
};

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 870px;
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  min-height: 56px;
  border: 1px solid ${darkTheme.selectionColor};
  outline-color: transparent;
  border-radius: 5px;
  padding: 14px 20px 15px 22px;
  margin-top: 10px;
  transition: outline-color 0.3s ease;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &::placeholder {
    font-weight: 400;
    color: ${darkGrayColor};
  }
  .custom-password {
    font-size: 30px;
    letter-spacing: 5px;
    padding-bottom: 0;
    padding-top: 0;
  }
  ${({ isDark, textareaProps }) => {
    return css`
      color: ${darkGrayColor};
      border: 1px solid ${isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      outline: ${textareaProps.isInvalid ? '1px solid rgba(255, 41, 0, 0.78)' : ''};
      &:focus {
        outline: 1px solid ${lavenderColor};
      }
    `;
  }}
`;
