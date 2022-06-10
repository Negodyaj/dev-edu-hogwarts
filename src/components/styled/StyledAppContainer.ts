import styled from 'styled-components';
import { darkTheme, defaultTheme } from '../../shared/colors';

export const StyledAppContainer = styled.body<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? darkTheme.blackColor : defaultTheme.blackColor)};
  background-color: ${(props) =>
    props.isDarkMode ? darkTheme.backgroundColor : defaultTheme.backgroundColor};

  a {
    color: ${(props) => (props.isDarkMode ? darkTheme.darkLavender : defaultTheme.darkLavender)};
  }

  input,
  textarea {
    color: ${(props) => (props.isDarkMode ? darkTheme.blackColor : defaultTheme.blackColor)};
  }
`;
