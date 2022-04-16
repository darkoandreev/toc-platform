import { LanguageAbbreviation } from './language-abbreviation.enum';

export interface Language {
  flag: string;
  title: string;
  abbreviation: LanguageAbbreviation;
}
