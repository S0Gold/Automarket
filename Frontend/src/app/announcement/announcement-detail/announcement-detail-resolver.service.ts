import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementDetailResolverService implements Resolve<Announcement> {

  constructor(private router: Router,  private announce: AnnouncementService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Announcement | Observable<Announcement> | Promise<Announcement> {
    throw new Error('Method not implemented.');
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement> {
  //     const propId = route.params['id'];
  //     return this.announce.GetAnnouncement(+propId).pipe(
  //       catchError(() => {
  //         this.router.navigate(['/']);
  //         return of(null);
  //       })
  //     );
  // }

}
