import { useDispatch } from 'react-redux';

type ErrorMessageProps = {
  callback?: any;
};

export const ErrorMesage = ({ callback }: ErrorMessageProps) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{ fontSize: '20px', marginTop: '50px', marginBottom: '20px' }}>
        Что-то пошло не так, повторите попытку еще раз
      </div>
      <button className="btn btn-fill" onClick={() => dispatch(callback)}>
        Обновить
      </button>
    </div>
  );
};
