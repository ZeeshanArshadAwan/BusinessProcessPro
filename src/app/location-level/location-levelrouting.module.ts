import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { LocationLevelComponent } from './location-level.component';

const routes: Routes = [
  {
    path: 'LocationLevel',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LocationLevelComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationLevelroutingModule { }
