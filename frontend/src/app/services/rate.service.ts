import {Injectable} from '@angular/core';
import {ApiService} from './api.service';


@Injectable()
export class RateService extends ApiService {
  public url = '/v1/rate';
}
