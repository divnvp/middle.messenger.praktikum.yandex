import Router from '../../shared/router/router';
import { Routes } from '../const/routes';
import { SysError } from '../const/errors';

export function isUserInSystemOrError(e: unknown) {
  if (e == SysError.UserIsAlreadyInSystem) {
    Router.go(Routes.ChatPanel);
  } else {
    throw new Error(String(e));
  }
}
