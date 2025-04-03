import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MetodoRubioComponent } from './page/metodo-rubio/metodo-rubio.component';




export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'metodo-rubio', component: MetodoRubioComponent},

];