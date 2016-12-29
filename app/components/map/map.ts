import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Loading, NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { PickupDirective } from '../pickup/pickup';
import { AvailableCarsDirective } from '../available-cars/available-cars'
import {CarService} from '../../providers/car/car';


/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html',
  directives: [PickupDirective, AvailableCarsDirective],
  providers: [CarService]
})
export class MapDirective implements OnInit {

  @Input() isPickupRequested;

  public map: google.maps.Map;
  public isMapIdle: boolean;

  constructor(public nav: NavController ) {
  }
   
  ngOnInit() {
    this.map = this.createMap();
    this.addMapEventListeners();

    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }



  addMapEventListeners() {

      google.maps.event.addListener(this.map, "dragstart", () => {
        this.isMapIdle = false;
      });

     google.maps.event.addListener(this.map, 'idle', () => {
        this.isMapIdle = true;
      });

  }

  getCurrentLocation() {
    let loading = Loading.create({
      content: 'loading...'
    });

    this.nav.present(loading);

    let options = {timeout: 10000, enableHighAccuracy: true};

    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let long =  resp.coords.longitude;

          let location =  new google.maps.LatLng(lat,long);
          observable.next(location);
          loading.dismiss();
        },
        (err) => {
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })
    });

    return locationObs;
  }

  createMap(location = new google.maps.LatLng(48.816363,2.317384)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map =  new google.maps.Map(mapEl, mapOptions);

    return map;
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    }
    else {
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }
}
