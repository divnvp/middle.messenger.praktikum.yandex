import { errorMessage, isValueValid } from '@/shared/utils/validators/validators';

export function onValidate(event: Event): void {
  event.preventDefault();

  const input = event.target as HTMLInputElement;
  const parent = input.parentElement;
  const inputName = input.name;
  const inputValue = input.value;

  const child = document.createElement('p');

  if (!isValueValid(inputName, inputValue)) {
    child.classList.add('validation');
    child.textContent = errorMessage;
    const errorText = parent?.querySelector('.validation');

    if (!errorText) {
      parent?.appendChild(child);
    }
  } else {
    if (parent?.querySelector('p')) {
      parent?.removeChild(parent!.querySelector('p')!);
    }
  }
}

export function onValidateSubmit(event: Event): boolean {
  event.preventDefault();

  let flag = false;
  const form = event.target as HTMLFormElement;

  form.querySelectorAll('input').forEach(input => {
    isValueValid(input.name, input.value);

    const child = document.createElement('p');
    child.classList.add('validation');
    child.textContent = errorMessage;

    const parent = input.parentElement;
    const errorText = parent?.querySelector('.validation');

    if (!isValueValid(input.name, input.value)) {
      if (!errorText) {
        parent?.appendChild(child);
        flag = false;
      }
      flag = false;
    } else {
      if (errorText) {
        parent?.removeChild(errorText);
        flag = true;
      }
      flag = true;
    }
  });

  return flag;
}
