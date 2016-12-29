import {Page} from 'ionic-angular';
import {MapDirective} from '../../components/map/map';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [MapDirective]
})
export class HomePage {
  public isPickupRequested = false;

  constructor() {

  }

  confirmPickup() {
    this.isPickupRequested = true;
  }

  cancelPickup() {
    this.isPickupRequested = false;
  }
}
