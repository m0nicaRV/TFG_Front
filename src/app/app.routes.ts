import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';




export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

];