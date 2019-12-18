import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefineApplicationTypeDocumentComponent } from './define-application-type-document.component';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'ApplicationTypeDocument',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DefineApplicationTypeDocumentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class DefineApplicationTypeDocumentRoutingModule { }
