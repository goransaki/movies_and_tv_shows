import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomQueryEncoderHelper} from '../helpers/custom-query-encoder-helper';
import {map} from 'rxjs/operators';

@Injectable()
export class ApiService {
  public url: string;
  public model: any;
  public defaultParams: any = {};
  protected baseUrl = 'http://api.movies-backend.test';

  constructor(protected http: HttpClient) {
  }

  public getModels(params: any = {}): Observable<HttpResponse<any[]>> {
    const preparedParams = new HttpParams({
      encoder: new CustomQueryEncoderHelper(),
      fromObject: Object.assign({}, this.defaultParams, params)
    });

    return this.http.get<any[]>(this.baseUrl + this.url, {
      observe: 'response',
      params: preparedParams
    });
  }

  public addModel(model = {}) {
    this.beforeAddModel(model);
    return this.http.post(this.baseUrl + this.url, Object.assign({}, model, this.defaultParams)).pipe(map(res => <any> res));
  }

  protected beforeUpdateModel(model) {
  }

  protected beforeAddModel(model) {
  }
}
