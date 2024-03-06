import * as Pages from '../../pages';
import { IPage } from '../models/page.interface';

export const pages: IPage = {
    chat: [Pages.ChatPage],
    auth: [Pages.AuthPage],
    registration: [Pages.RegistrationPage],
    profile: [Pages.Profile],
    'profile-data': [Pages.ProfileData],
    'change-password': [Pages.ChangePassword],
    'error-500': [Pages.Error500],
    'error-4xx': [Pages.Error4xx]
};
