import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { DefinitionComponent } from './definition.component';



const routes: Routes = [
  {
    path: 'Definition/:username',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DefinitionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class DefinitionRoutingModule { }
