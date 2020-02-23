// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'template2';
// }
import { Component } from '@angular/core';
import { LanguageTranslateService } from './SharedServices/language-translate.service';
import { BaseComponent } from './SharedServices/base-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'template2';
  open = false; // is the nav menu open
  userMenu = false; // toggles menu mode on mobile
  constructor(
    public languageTranslateService:LanguageTranslateService
  ) {
      super(languageTranslateService);
  }

  toggleMenu(){
    this.open = !this.open;
  }
}
