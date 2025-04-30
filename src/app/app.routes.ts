import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MetodoRubioComponent } from './page/metodo-rubio/metodo-rubio.component';
import { IndexComponent } from './servicios/index/index.component';
import { PedirComponent } from './citas/pedir/pedir.component';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { ViewComponent} from './citas/view/view.component';
import { loginComponent } from './user/login/login.component';
import { registerComponent } from './user/register/register.component';
import { CreateComponent } from './servicios/create/create.component';



export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'metodo-rubio', component: MetodoRubioComponent},
    {path: 'servicios', component: IndexComponent},
    {path : 'citas/pedir', component: PedirComponent},
    {path: 'citas', component: ViewComponent},
    {path:'admin/calendar', component: CalendarComponent},
    {path:'login', component: loginComponent},
    {path:'register', component: registerComponent},
    {path:'servicios/create', component: CreateComponent},
];