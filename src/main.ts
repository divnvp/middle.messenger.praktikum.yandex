import { AuthPage } from '@/pages/auth';
import { RegistrationPage } from '@/pages/registration';
import Router from '@/shared/utils/router/router';

const router = new Router();

router.use('/', AuthPage).use('/sign-up', RegistrationPage);

document.addEventListener('DOMContentLoaded', () => router.go('/'));
