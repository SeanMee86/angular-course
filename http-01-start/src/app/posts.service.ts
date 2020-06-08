import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";

import {Post} from './post.model';
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class PostsService {
  rootURL = 'https://ng-complete-guid-501ad.firebaseio.com';
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    return this.http
      .post<{name: string}>(
        `${this.rootURL}/posts.json`,
        postData,
        {
          observe: 'response'
        }
      )
      .pipe(
        tap(
        responseData => {
          // console.log(responseData);
        }
      ));
  }

  fetchPosts() {
    let searchParams = new HttpParams().append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{[key: string]: Post}>(
      `${this.rootURL}/posts.json`,
      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
        }),
        params: searchParams,
        responseType: 'json'
      })
      .pipe(
        map(responseData => {
          const responseDataArray: Post[] = [];
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              responseDataArray.push({ ...responseData[key], id: key})
            }
          }
          return responseDataArray
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      )
  }

  deletePosts() {
    return this.http
      .delete(`${this.rootURL}/posts.json`,
        {
          observe: 'events'
        }).pipe(
          tap(
            event => {
              if(event.type === HttpEventType.Sent) {
                // ...
              }
              if(event.type === HttpEventType.Response) {
                console.log(event.body);
              }
            }
          )
      );
  }
}
