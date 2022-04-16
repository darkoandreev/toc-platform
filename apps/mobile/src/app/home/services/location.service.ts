import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Capacitor } from '@capacitor/core';

@Injectable()
export class LocationService {
  constructor(private locationAccuracy: LocationAccuracy, private androidPermissions: AndroidPermissions) {}

  async checkPermissions(): Promise<boolean> {
    return await new Promise(async (resolve, _) => {
      const hasPermission = await this.checkGPSPermission();
      if (hasPermission) {
        if (Capacitor.isNativePlatform()) {
          const canUseGPS = await this.askToTurnOnGPS();
          resolve(canUseGPS);
        } else {
          resolve(true);
        }
      } else {
        const permission = await this.requestGPSPermission();
        if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
          if (Capacitor.isNativePlatform()) {
            const canUseGPS = await this.askToTurnOnGPS();
            resolve(canUseGPS);
          } else {
            resolve(true);
          }
        } else {
          resolve(false);
        }
      }
    });
  }

  private async askToTurnOnGPS(): Promise<boolean> {
    return await new Promise((resolve, _) => {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
              resolve(true);
            },
            (error) => {
              resolve(false);
            }
          );
        } else {
          resolve(false);
        }
      });
    });
  }

  private async checkGPSPermission(): Promise<boolean> {
    return await new Promise((resolve, _) => {
      if (Capacitor.isNativePlatform()) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
          (result) => {
            if (result.hasPermission) {
              // If having permission show 'Turn On GPS' dialogue
              resolve(true);
            } else {
              // If not having permission ask for permission
              resolve(false);
            }
          },
          (err) => {
            alert(err);
          }
        );
      } else {
        resolve(true);
      }
    });
  }

  private async requestGPSPermission(): Promise<string> {
    return await new Promise((resolve, _) => {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          resolve('CAN_REQUEST');
        } else {
          // Show 'GPS Permission Request' dialogue
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
            (result) => {
              if (result.hasPermission) {
                // call method to turn on GPS
                resolve('GOT_PERMISSION');
              } else {
                resolve('DENIED_PERMISSION');
              }
            },
            (error) => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
            }
          );
        }
      });
    });
  }
}
