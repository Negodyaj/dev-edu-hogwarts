import { useSelector } from 'react-redux';
import { LoaderState } from '../../store/reducers/loader.reducer';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { AppState } from '../../store/store';
import { AnimationForLoader } from './AnimationForLoader';
import { LoaderStyled } from './LoaderStyled';

export const Loader = () => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const { loaderCount } = useSelector((state: AppState) => state.loaderState as LoaderState);
  return (
    <>
      <LoaderStyled isDark={isDark} loaderCount={loaderCount}>
        <AnimationForLoader />
      </LoaderStyled>
    </>
  );
};
