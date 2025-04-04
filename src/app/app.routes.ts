import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MetodoRubioComponent } from './page/metodo-rubio/metodo-rubio.component';
import { ServiciosComponent } from './page/servicios/servicios.component';
import { PedirComponent } from './user/citas/pedir/pedir.component';



export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'metodo-rubio', component: MetodoRubioComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path : 'citas/pedir', component: PedirComponent},

];