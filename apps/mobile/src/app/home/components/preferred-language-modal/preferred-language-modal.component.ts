import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageAbbreviation } from '../../models/language-abbreviation.enum';
import { Language } from '../../models/language.model';

@Component({
  selector: 'toc-preferred-language-modal',
  templateUrl: './preferred-language-modal.component.html',
  styleUrls: ['./preferred-language-modal.component.scss'],
})
export class PreferredLanguageModalComponent {
  readonly LANGUAGES: Array<Language> = [
    {
      title: 'LANGUAGE_ITEMS.ENGLISH',
      flag: '/assets/flags/en-flag.svg',
      abbreviation: LanguageAbbreviation.EN,
    },
    {
      title: 'LANGUAGE_ITEMS.SERBIAN',
      flag: '/assets/flags/sr-flag.svg',
      abbreviation: LanguageAbbreviation.SR,
    },
    {
      title: 'LANGUAGE_ITEMS.BULGARIAN',
      flag: '/assets/flags/bg-flag.svg',
      abbreviation: LanguageAbbreviation.BG,
    },
  ];

  selectedLanguage = localStorage.getItem('preferredLanguage') || LanguageAbbreviation.EN;

  constructor(private translateService: TranslateService, private modalController: ModalController) {}

  saveLanguage(): void {
    this.translateService.setDefaultLang(this.selectedLanguage);
    localStorage.setItem('preferredLanguage', this.selectedLanguage);
    this.modalController.dismiss();
  }
}
