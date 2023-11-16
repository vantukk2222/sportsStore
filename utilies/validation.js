import { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

export const isValidEmail = (mail) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}

export function isValidPassword(pw) {

  return /[A-Z]/       .test(pw) &&
         /[a-z]/       .test(pw) &&
         /[0-9]/       .test(pw) &&
         /[^A-Za-z0-9]/.test(pw) &&
         pw.length > 4;

}