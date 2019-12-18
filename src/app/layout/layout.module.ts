import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FooterOnlyLayoutComponent } from './footer-only-layout/footer-only-layout.component';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule, MatSidenavModule, MatBadgeModule, MatRippleModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [FooterComponent, FooterOnlyLayoutComponent, HeaderComponent, MainLayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FlexLayoutModule,
    MatMenuModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatBadgeModule,
    MatRippleModule,
    MatSelectModule
  ],
  exports: [
    MainLayoutComponent,
    FooterOnlyLayoutComponent,
  
  ],
})
export class LayoutModule { }
