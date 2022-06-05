import { DPprops } from '../Datepicker';
import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type StyledDatepickerProps = {
  datepickerProps: DPprops;
  isDark: boolean;
};
export const DatePicker = styled.div`
  ${() => {
    const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
    return css`
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
    `;
  }}
`;
