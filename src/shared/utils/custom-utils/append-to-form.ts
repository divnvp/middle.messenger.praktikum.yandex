export function appendToForm(key: string, value: Blob) {
  const formData = new FormData();
  formData.append(key, value);

  return formData;
}
