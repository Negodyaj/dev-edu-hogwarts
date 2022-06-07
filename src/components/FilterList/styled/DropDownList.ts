import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';
import { Align, FilterListProps } from '../FilterList';

export type StyledDropDownProps = {
  dropDownProps: FilterListProps;
  isDark: boolean;
};

export const justifyContent = (justify: Align) => {
  switch (justify) {
    case Align.Center:
      return css`center`;
    case Align.Left:
      return css`flex-start`;
  }
};

export const DropDownList = styled.div<StyledDropDownProps>`
  ${({ dropDownProps, isDark }) => {
    return css`
      display: flex;
      min-width: 148px;
      width: 100%;
      font-weight: 600;
      cursor: pointer;
      justify-content: ${dropDownProps.cssAlign
        ? justifyContent(dropDownProps.cssAlign)
        : 'flex-end'};
      align-items: center;

      & input {
        font-weight: inherit;
        font-size: inherit;
        font-family: inherit;
        color: inherit;
        text-align: end;
        padding: 0;
        margin: 0;
        border: 0;
        max-width: fit-content;
        width: 100%;
        cursor: pointer;

        &:focus {
          outline: 0;
        }
      }

      & path {
        fill: ${isDark ? darkTheme.blackColor : defaultTheme.blackColor};
      }

      & svg {
        margin-left: 4px;
        background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      }
    `;
  }}
`;
