import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme, lavenderColor } from '../../../shared/colors';
import { FilterListProps } from '../FilterList';

export type StyledDropDownRoll = {
  dropDownProps: FilterListProps;
  isDark: boolean;
};

export const DropDownRoll = styled.ul<StyledDropDownRoll>`
  ${({ dropDownProps, isDark }) => {
    return css`
      padding: 0;
      line-height: 18px;
      width: max-content;
      min-width: 99px;
      max-height: 132px;
      overflow: ${dropDownProps.data.length > 4 ? 'auto' : ''};
      padding-right: ${dropDownProps.data.length > 4 ? '10px' : 0};

      &::-webkit-scrollbar {
        width: 1px;
      }

      &::-webkit-scrollbar-track {
        background-color: ${isDark ? darkTheme.selectionColor : defaultTheme.selectionColor};
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${lavenderColor};
      }
    `;
  }}
`;
