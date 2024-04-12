import { appendToForm } from '@/shared/utils/custom-utils/append-to-form';
import UserController from '@/shared/controllers/user.controller';

export function readFile(element: HTMLInputElement) {
  const newFile = element.files![0];
  const fileReader = new FileReader();

  fileReader.onload = async () => {
    await UserController.changeAvatar(appendToForm('avatar', newFile));
  };

  fileReader.readAsDataURL(newFile);
}
