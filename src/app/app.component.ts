import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  supportedLangs = ['en','es'];
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(this.currentLang);
  }

  switchLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    console.log('switchLang →', lang);
  }

  toggleLang(): void {
    const next = this.currentLang === 'en' ? 'es' : 'en';
    console.log('toggleLang, next →', next);
    this.switchLang(next);
  }
}
