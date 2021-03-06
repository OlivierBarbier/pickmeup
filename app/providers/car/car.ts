import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SimulateService} from '../../providers/simulate/simulate';
import 'rxjs/add/operator/map';

/*
  Generated class for the Car provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarService {
  
  public simulate: SimulateService;

  constructor(private http: Http) {
    this.simulate = new SimulateService(http); 
  }

  getCars(lat, lng) {
    return Observable
      .interval(2000)
      .switchMap(() => this.simulate.getCars(lat, lng))
      .share();
  }


}


