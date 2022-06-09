import { DPprops } from '../Datepicker';
import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme, modalBackgroundColor } from '../../../shared/colors';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type StyledDatepickerProps = {
  datepickerProps: DPprops;
  isDark: boolean;
};
export const DatePicker = styled.div`
  .rdtPicker {
    background: black;
  }

  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  ${() => {
    const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
    return css`
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
    `;
  }}
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
