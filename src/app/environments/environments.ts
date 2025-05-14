import { HttpContextToken } from '@angular/common/http';

export const IGNORE_AUTH_INTERCEPTOR = new HttpContextToken<boolean>(() => false);
export const environment = {
  production: false,
  googleCalendar: {
    CLIENT_ID: '901640707227-rkhpj544mg15h2avo64mf0juk4n510ut.apps.googleusercontent.com', // Reemplaza con tu Client ID
    SCOPES: 'https://www.googleapis.com/auth/calendar',
  }
};