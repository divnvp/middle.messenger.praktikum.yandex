import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';

export function onLoad(elementId: string) {
  const element = document.getElementById(elementId);

  if (element) {
    element.addEventListener('submit', onValidateSubmit);
    element.querySelectorAll('input').forEach(input => {
      input.addEventListener('blur', (e: Event) => onValidate(e));
    });
  }
}
