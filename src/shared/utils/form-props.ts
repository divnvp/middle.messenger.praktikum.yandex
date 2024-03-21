export function getFormProps(form: HTMLFormElement) {
  const formData = new FormData(form);
  const formProps: Record<string, string> = {};

  for (const [key, value] of Object(formData).entries()) {
    formProps[key] = value;
  }

  return formProps;
}
