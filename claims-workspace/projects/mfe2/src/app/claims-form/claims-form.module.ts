import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsFormComponent } from './claims-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDataComponent } from "@shared";
import { FileDragAndDropDirective } from './fileDrag&Drop.directive';
import { ClaimsListComponent } from './claims-list/claims-list.component';


export const routes: Routes = [
  {path: '', redirectTo: 'claims-form', pathMatch: 'full'},
  {path: 'claims-form', component: ClaimsFormComponent}
];

@NgModule({
  declarations: [ClaimsFormComponent,ClaimsListComponent,FileDragAndDropDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedDataComponent,
],
})
export class ClaimsFormModule { }
