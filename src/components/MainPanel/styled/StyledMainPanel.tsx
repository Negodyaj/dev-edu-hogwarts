import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { AppState } from '../../../store/store';

export const StyledMainPanel = styled.aside`
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, fill 0.3s ease-in-out,
    stroke 0.3s ease-in-out;
  ${() => {
    const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
    return css`
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      .logo,
      .logo-name {
        path {
          fill: ${isDark ? darkTheme.gradientColor : defaultTheme.gradientColor};
        }
      }
      .nav-link,
      button {
        color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
        path {
          stroke: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
        }
        .with-color-on-hover {
          fill: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
        }
      }
      .subbutton:not(.collapsed-mode),
      .subbutton:not(.collapsed-mode).active,
      .subbutton:not(.collapsed-mode):hover {
        path {
          stroke: transparent;
          fill: transparent;
        }
      }
      a {
        color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }
      .auth-link {
        color: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }
      .nav-link.active,
      .nav-link:hover {
        color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        path {
          stroke: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        }
        .with-color-on-hover {
          fill: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
        }
      }
    `;
  }}
`;
