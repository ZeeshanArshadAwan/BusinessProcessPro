import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { LocationDetailComponent } from './location-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'LocationDetail',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LocationDetailComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationDetailRoutingModule { }
