import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'claims-list',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './ClaimsListModule',
      })
        .then((m) => m.ClaimsListModule)
        .catch((err) => console.log(err)),
  },
  {
    path: 'claims-form',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './ClaimsFormModule',
      })
        .then((m) => m.ClaimsFormModule)
        .catch((err) => console.log(err)),
  },
];
