import { INPUT_NAMES } from '@/shared/const/input-names';

export let errorMessage = '';

export function isValueValid(name: string, value: string) {
  const isPassword =
    name === INPUT_NAMES.Password ||
    name === INPUT_NAMES.PasswordAgain ||
    name === INPUT_NAMES.OldPassword ||
    name === INPUT_NAMES.NewPassword;

  if (name === INPUT_NAMES.Login) {
    return checkLogin(value);
  }

  if (isPassword) {
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
    'Неверное имя: первая буква должна быть заглавной, без пробелов, допустим символ "-"';
  return /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/.test(value);
}

function checkLogin(value: string) {
  errorMessage =
    'Неверный логин: не менее 3-х и не более 20-ти символов, латиница, допустимы символы "-" и "_"';
  return /^[A-Za-z][A-Za-z0-9_-]{2,19}$/.test(value);
}

function checkEmail(value: string) {
  errorMessage = 'Неверный email: латиница, допустимы символы "-" и "_", должна быть «@»';
  const re = /^[a-zA-Z0-9_.+-]+@[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  return re.test(value.toLowerCase());
}

function checkPassword(value: string) {
  errorMessage =
    'Неверный пароль: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
  return /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/.test(value);
}

function checkPhone(value: string) {
  errorMessage =
    'Неверный телефон: от 10 до 15 символов, состоит из цифр, может начинается с плюса';
  return /^(\+)?\d{10,15}$/.test(value);
}

function checkMessage(value: string) {
  errorMessage = 'Неверное сообщение: не должно быть пустым';
  return /.+/.test(value);
}
