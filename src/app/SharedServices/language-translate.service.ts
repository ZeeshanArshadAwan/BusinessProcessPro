import { EventEmitter } from '@angular/core';
import * as EnglishStrings from '../resources/english';
import * as ArabicStrings from '../resources/arabic';

export class LanguageTranslateService {
  public currentLang: EventEmitter<string> = new EventEmitter();
  setLang(val) {
    this.currentLang.emit(val);
  }
  lang = 'en';
  
  getLangObject(lang) {
    switch(lang){
      case 'ar':
        return ArabicStrings;
      case 'en': 
      default:
        return EnglishStrings;
    }
  }
}