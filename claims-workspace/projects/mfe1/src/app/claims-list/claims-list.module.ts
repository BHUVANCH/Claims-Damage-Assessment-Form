import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsListComponent } from './claims-list.component';
import { FormsModule } from '@angular/forms';


export const routes: Routes = [
  {path: '', redirectTo: 'claims-list', pathMatch: 'full'},
  {path: 'claims-list', component: ClaimsListComponent}
];

@NgModule({
  declarations: [ClaimsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ClaimsListModule { }
