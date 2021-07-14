import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RateService} from '../../services/rate.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TYPE_TV_SHOW = 'tv-show';
  TYPE_MOVIE = 'movie';

  public page = 1;
  public totalCount = 0;
  public pageSize = 0;
  public currentPage = 0;
  public pageCount = 0;
  public offset = 0;
  public filters: any = {};
  public videoLIst = [];
  public type = 'movie';

  constructor(private videoService: VideoService,
              private authService: AuthService,
              private rateService: RateService,
              public domSanitizer: DomSanitizer,
              private router: Router) {
  }

  ngOnInit() {
    this.getVideoList();
  }

  private getVideoList(search = null) {
    this.videoService.getModels({page: this.page, type: this.type, search: search}).subscribe((response) => {
      this.videoLIst = this.videoLIst.concat(response.body);
      this.setPaginationData(response.headers);
    });
  }

  setPaginationData(headers) {
    this.totalCount = Number(headers.get('X-Pagination-Total-Count'));
    this.pageSize = Number(headers.get('X-Pagination-Per-Page'));
    this.currentPage = Number(headers.get('X-Pagination-Current-Page'));
    this.pageCount = Number(headers.get('X-Pagination-Page-Count'));
    this.offset = (this.currentPage - 1) * this.pageSize + 1;
  }

  readMore() {
    this.page++;
    this.getVideoList();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onRatingSet(value, id) {
    this.rateService.addModel({video_id: id, user_id: this.authService.getUserId(), rating: value}).subscribe();
  }

  changeType(type: string) {
    this.type = type;
    this.page = 1;
    this.videoLIst = [];
    this.getVideoList();
  }

  search(value: any) {
    if (value.length < 2) {
      this.page = 1;
      this.videoLIst = [];
      this.getVideoList();
      return;
    }
    this.page = 1;
    this.videoLIst = [];
    this.getVideoList(value);
  }


}
