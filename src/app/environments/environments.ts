import { HttpContextToken } from '@angular/common/http';

export const IGNORE_AUTH_INTERCEPTOR = new HttpContextToken<boolean>(() => false);

export const admin:boolean = false;
export const configuracion={
  url_host:'http://127.0.0.1:8000/',
  direccion: 'hola ',
  telefono: '123456789',
  email: 'm@gmail.com',
  titulo: 'Gestor de Eventos',
  instagram: 'https://www.instagram.com/jesus_ortiz_/',
  logo: 'hola',
}
export const environment = {
  url_host:'http://127.0.0.1:8000/',
  production: false,
  googleCalendar: {
    CLIENT_ID: '901640707227-rkhpj544mg15h2avo64mf0juk4n510ut.apps.googleusercontent.com', 
    SCOPES: 'https://www.googleapis.com/auth/calendar',
  }
};