import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(message: string, duration: number): Promise<void> {
    const toast = await this.toastController.create({ message,duration });

    await toast.present();
  }
}
