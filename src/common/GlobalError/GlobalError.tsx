import { useSelector } from 'react-redux';
import { selectAppError } from 'app/app.selectors';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { appActions } from 'app/app.slice';
import { useAppDispatch } from 'common/hooks';

export const GlobalError = () => {
  const dispatch = useAppDispatch()
  const error = useSelector(selectAppError)

  if (error !== null) {
    toast.error(error);
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setAppError({error: null}))
    }, 3000)
  })

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};