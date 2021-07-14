import {Injectable} from '@angular/core';
import {ApiService} from './api.service';


@Injectable()
export class VideoService extends ApiService {
  public url = '/v1/video';
}
