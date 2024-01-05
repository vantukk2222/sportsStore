import moment from 'moment';
import { formatNumber } from 'react-native-localize';

export const isValidEmail = (mail) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}

export const onValidUsername = (val) => {
  const regex = /^[a-z][a-zA-Z0-9]{5,24}$/;
  return regex.test(val)
}
export const isValidComment = (val) => {
  const regex = /^[\p{L}\s\d'-.,'!@#`\n]{25,200}$/u;
  return regex.test(val)
}

export const isValidName = (val) => {
  const regex = /^[\p{L}\s'-]{5,49}$/u;
  return regex.test(val)
}
export const isValidCIC = (val) =>{
  const regex = /^\d{9,11}$/;
  return regex.test(val)
}

export const isValidPhone = (val) => {
  const regex = /^(84|0)\d{9,11}$/;
  return regex.test(val)
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
export const findMainImage = (Listimg) => {
  for (let i = 0; i < Listimg.length; i++) {
    if (Listimg[i].is_main === true) {
      //console.log(images[i].url)
      var img = Listimg[i].url
      //  setImages(im)
      return Listimg[i].url;
    }
  }
  return Listimg.length > 0 ? Listimg[0].url : null;
}