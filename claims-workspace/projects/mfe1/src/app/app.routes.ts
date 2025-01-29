import { Routes } from '@angular/router';

export const routes: Routes = [
        {path: '', redirectTo: 'claims-list', pathMatch: 'full'},
        {path: 'claims-list', loadChildren: () => import('./claims-list/claims-list.module').then(m => m.ClaimsListModule)}
];
