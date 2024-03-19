import { errorMessage, isValueValid } from '@/shared/utils/validators/validators';

export function onValidate(event: Event): void {
  event.preventDefault();

  const input = event.target as HTMLInputElement;
  const parent = input.parentElement;
  const errorText = parent?.querySelector('.validation');
  const inputName = input.name;
  const inputValue = input.value;

  if (inputValue?.length && !isValueValid(inputName, inputValue)) {
    input.classList.add('error');

    if (!errorText) {
      parent?.appendChild(getParagraph());
    }
  } else {
    input.classList.remove('error');
    console.log(parent, errorText);
    if (errorText) {
      parent?.removeChild(errorText);
    }

    // if (type === Types.Submit) {
    //   getFormProps(event.target as HTMLFormElement);
    // }
  }
}

function getParagraph() {
  const child = document.createElement('p');
  child.classList.add('validation');
  child.textContent = errorMessage;

  return child;
}
