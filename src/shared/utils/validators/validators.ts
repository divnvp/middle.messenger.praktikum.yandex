import { INPUT_NAMES } from '@/shared/const/input-names';

export let errorMessage = '';

export function isValueValid(name: string, value: string) {
  if (name === INPUT_NAMES.Login) {
    return checkLogin(value);
  }

  if (name === INPUT_NAMES.Password) {
    return checkPassword(value);
  }

  if (name === INPUT_NAMES.Phone) {
    return checkPhone(value);
  }

  if (name === INPUT_NAMES.Email) {
    return checkEmail(value);
  }

  if (name === INPUT_NAMES.FirstName || name === INPUT_NAMES.SecondName) {
    return checkName(value);
  }

  if (name === INPUT_NAMES.Message) {
    return checkMessage(value);
  }

  return false;
}

function checkName(value: string) {
  errorMessage =
    'Введите верное имя (латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов)';
  return /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/.test(value);
}

function checkLogin(value: string) {
  errorMessage =
    'Введите верный логин (от 3 до 20 символов, латиница, может содержать цифры, без пробелов, без спецсимволов)';
  return /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/.test(value);
}

function checkEmail(value: string) {
  errorMessage =
    'Введите верный email (латиница, может включать цифры и спецсимволы, должна быть «@» и точка после неё)';
  const re =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}

function checkPassword(value: string) {
  errorMessage =
    'Введите верный пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра)';
  return /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/.test(value);
}

function checkPhone(value: string) {
  errorMessage =
    'Введите верный телефон (от 10 до 15 символов, состоит из цифр, может начинается с плюса)';
  return /^9[0-9]{9}$/.test(value);
}

function checkMessage(value: string) {
  errorMessage = 'Сообщение не должно быть пустым';
  return /^(?!\s*$).+$/.test(value);
}
