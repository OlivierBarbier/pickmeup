import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Simulate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimulateService {

   private carIndex: number = 0;

  constructor(private http: Http) {

  }

  getCars(lat, lng) {
    let carData = this.cars[this.carIndex];
    
    this.carIndex++;
    
    if (this.carIndex > this.cars.length-1) {
      this.carIndex = 0;
    }
    
    return Observable.create(
      observer => observer.next(carData)
    )
  }

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 48.816906,
        lng:2.318716
      }
    },{
      id: 2,
      coord: {
        lat: 48.816157,
        lng: 2.307065
      }
    }]
  };

  private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 48.816355,
        lng: 2.318373
      }
    },{
      id: 2,
      coord: {
        lat: 48.816129,
        lng: 2.308481
      }
    }]
 };
  private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 48.815847,
        lng: 2.317858
      }
    },{
      id: 2,
      coord: {
        lat: 48.816228,
        lng: 2.309875
      }
    }]
  };

  private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat:48.815296,
        lng: 2.317643
      }
    },{
      id: 2,
      coord: {
        lat: 48.816044,
        lng: 2.311120
      }
    }]
  };

  private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 48.815479,
        lng: 2.316678
      }
    },{
      id: 2,
      coord: {
        lat: 48.815960,
        lng: 2.311957
      }
    }]
  };

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];
}
