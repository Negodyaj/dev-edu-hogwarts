import { DPprops } from '../Datepicker';
import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme, modalBackgroundColor } from '../../../shared/colors';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { InputStyle } from '../../styled/StyledInput';

export type StyledDatepickerProps = {
  datepickerProps: DPprops;
  isDark: boolean;
};
export const DatePicker = styled.div<{ isDark: boolean }>`
  ${InputStyle};
  border: 1px solid
    ${(props) => (props.isDark ? darkTheme.mediumGrayColor : defaultTheme.mediumGrayColor)};
  display: flex;
  justify-content: space-between;

  & .form-control {
    border: 0;
    padding: 0;
    font-family: inherit;
    outline: 0;
    width: 100%;
    font-weight: 400;
    font-size: 18px;
  }

  &.active-dp {
    outline: 1px solid $lavender-color;
  }

  & .date-picker__button {
    border: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    height: 24px;

    & svg path {
      stroke: ${(props) => (props.isDark ? darkTheme.mediumGrayColor : defaultTheme.blackColor)};
    }
  }
  background-color: ${(props) => (props.isDark ? darkTheme.whiteColor : defaultTheme.whiteColor)};
`;
export const DatepickerInput = styled.input`
  ${() => {
    const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
    return css`
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      color: ${modalBackgroundColor};
    `;
  }}
`;
export const DateTimew = styled.input`
  ${() => {
    const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
    return css`
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      color: ${modalBackgroundColor};
    `;
  }}
`;
