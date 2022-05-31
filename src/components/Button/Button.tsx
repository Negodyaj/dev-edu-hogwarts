import './Button.scss';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { Icon } from '../../shared/enums/Icon';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';
import { StyledButton } from './styled/StyledButton';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';

export type ButtonProps = {
  text?: string;
  type?: ButtonType;
  model: ButtonModel;
  icon?: Icon;
  url?: string;
  link?: 'btn-link';
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
  direction?: string;
};

export enum ButtonModel {
  White,
  Colored,
  Text,
  EllipseColored,
  EllipseWhite,
}

export enum ButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

export const Button = (props: ButtonProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const buttonClass = (() => {
    switch (props.model) {
      case ButtonModel.White:
        return 'btn-white-with-border';
      case ButtonModel.Colored:
        return 'btn-fill';
      case ButtonModel.Text:
        return 'btn-text';
      case ButtonModel.EllipseColored:
        return 'btn-fill ellipse';
      case ButtonModel.EllipseWhite:
        return 'btn-white-with-border ellipse';
      default:
        return '';
    }
  })();

  let buttonImg;

  if (props.icon) {
    buttonImg = <SvgIcon icon={props.icon} />;
  }

  return props.url ? (
    <a href={props.url} className={`btn ${buttonClass}`}>
      {props.text}
      {buttonImg}
      {props.direction ? <SvgArrow direction={`${props.direction}`} /> : ''}
    </a>
  ) : (
    <StyledButton
      buttonProps={props}
      isDark={isDark}
      className={`btn ${buttonClass}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ width: `${props.width}px` }}
    >
      {props.text}
      {buttonImg}
      {props.direction ? <SvgArrow direction={`${props.direction}`} /> : ''}
    </StyledButton>
  );
};
