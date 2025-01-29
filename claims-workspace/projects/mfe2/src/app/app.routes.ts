import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'claims-form', pathMatch: 'full'},
    {path: 'claims-form', loadChildren: () => import('./claims-form/claims-form.module').then(m => m.ClaimsFormModule)}
];
