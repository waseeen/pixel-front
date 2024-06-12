import i18n, { ErrorCodes } from '../i18n/index';
import { toast } from 'react-toastify';

export const showError = (errorCode: ErrorCodes) => {
  const t = i18n.t;
  toast.error(<string>t(`error:${errorCode}`));
};
