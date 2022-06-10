import styled from 'styled-components';
import { darkGrayColor, darkTheme, defaultTheme, lavenderColor } from '../../shared/colors';
import { TextareaProps } from './Textarea';

export type StyledTextareaProps = {
  isDark: boolean;
  textareaProps?: TextareaProps;
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
  transition: outline-color 0.3s ease, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &::placeholder {
    font-weight: 400;
    color: ${darkGrayColor};
  }

  color: ${darkGrayColor};
  border: 1px solid ${(props) =>
    props.isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor};
  background-color: ${(props) => (props.isDark ? darkTheme.whiteColor : defaultTheme.whiteColor)};
  outline: ${(props) => (props.textareaProps?.isInvalid ? '1px solid rgba(255, 41, 0, 0.78)' : '')};
  &:focus {outline: 1px solid ${lavenderColor};
`;
