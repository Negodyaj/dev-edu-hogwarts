import styled from 'styled-components';
import { darkTheme, defaultTheme } from '../../shared/colors';

export const ContentContainer = styled.div<{ isDarkMode: boolean }>`
  background: ${(props) => (props.isDarkMode ? darkTheme.whiteColor : defaultTheme.whiteColor)};
  width: 940px;
  box-shadow: 4px 7px 15px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 50px 45px;
  transition: width ease-in-out 0.5s;
  color: ${(props) => (props.isDarkMode ? darkTheme.blackColor : defaultTheme.blackColor)};
`;
