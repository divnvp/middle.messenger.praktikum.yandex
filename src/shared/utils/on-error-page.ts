import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';

const router = new Router();

export function onErrorPage(response: XMLHttpRequest) {
  if (response.status === 400) {
    onNotFoundPage();
  }

  if (response.status === 500) {
    onErrorServerPage();
  }
}

function onNotFoundPage() {
  const isPageExists = Object.values(Routes).find(v => v === router.getCurrentRoute());

  if (!isPageExists) {
    router.go(Routes.Error400);
  }
}

function onErrorServerPage() {
  router.go(Routes.Error500);
}
