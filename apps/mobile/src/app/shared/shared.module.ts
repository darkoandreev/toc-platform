import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
  imports: [CommonModule, IonicModule.forRoot(), RouterModule, TranslateModule.forChild()],
})
export class SharedModule {}
