import { removeLink } from '../../../actions/newHomeworkForm.action';
import { SvgIcon } from '../../../components/SvgIcon/SvgIcon';
import { Icon } from '../../../shared/enums/Icon';
import { useDispatch } from 'react-redux';

type AddedLinkProps = {
  source: string;
  itemNumber: number;
};

export const AddedLink = (props: AddedLinkProps) => {
  const dispatch = useDispatch();

  return (
    <div className="form-input_link__container">
      <a href={props.source} className="form-link" target="_blank">
        {props.source}
      </a>
      <div
        onClick={() => dispatch(removeLink(props.itemNumber))}
        className="form-input_link__delete-link"
      >
        <SvgIcon icon={Icon.Cross} />
      </div>
    </div>
  );
};
