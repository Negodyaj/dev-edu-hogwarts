import styled, { css } from 'styled-components';
import { darkTheme, defaultTheme } from '../../../shared/colors';
import { Align } from '../FilterList';
import { StyledDropDownProps } from './DropDownList';

export const textAlign = (align: Align) => {
  switch (align) {
    case Align.Center:
      return css`center`;
    case Align.Left:
      return css`
        text-align: left;
        right: auto;
        left: -20px;
      `;
  }
};

export const DropDownContainer = styled.div<StyledDropDownProps>`
  ${({ dropDownProps, isDark }) => {
    return css`
      top: 28px;
      right: ${dropDownProps.cssAlign == Align.Left ? 'auto' : '6px'};
      left: ${dropDownProps.cssAlign == Align.Left ? '-20px' : ''};
      text-align: ${dropDownProps.cssAlign ? textAlign(dropDownProps.cssAlign) : 'right'};
      background-color: ${isDark ? darkTheme.whiteColor : defaultTheme.whiteColor};
      position: absolute;
      padding: 10px 20px;
      max-height: 152px;
      min-width: 140px;
      box-shadow: 4px 7px 15px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      z-index: 6;
    `;
  }}
`;
