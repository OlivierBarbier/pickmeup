import { Component, Input, OnChanges } from '@angular/core';


/*
  Generated class for the Pickup component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup',
  templateUrl: 'build/components/pickup/pickup.html'
})
export class PickupDirective implements OnChanges {

  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  private pickupMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;
  
  constructor() {
  }

  ngOnChanges(changes) {
    if (this.isPinSet) {
      this.showPickupMarker();
    } else {
      this.removePickupMarker();
    }
  }

  showPickupMarker() {
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: 'img/person-icon.png'
    });

    setTimeout( () => {
      this.pickupMarker.setAnimation(null);
    }, 750);

    this.showPickTime();
  }

  removePickupMarker() {
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null);
    }
  }

  showPickTime() {

    this.popup = new google.maps.InfoWindow({
      content: '<h5>You are Here</h5>'
    });

    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker); 
    });

  }
}
