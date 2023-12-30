import moment from 'moment';
import { formatNumber } from 'react-native-localize';

export const isValidEmail = (mail) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}

export function isValidPassword(pw) {

  return /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 4;

}
export const formatMoneyVND = (amount) => {
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formattedAmount;
};
export const isExpired = (endDate) => {
  const currentDate = moment();
  const expirationDate = moment(endDate);
  return expirationDate.isBefore(currentDate);
};
export function isValidDouble(value) {
  // Kiểm tra xem giá trị có phải là số thực hay không
  return /^\d+(\.\d+)?$/.test(value);
}

export function isValidInteger(value) {
  return /^\d+$/.test(value);
}