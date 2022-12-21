import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private baseurl = "http://wd.etsisi.upm.es:10000";

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    let myparameters = new HttpParams()
      .append('username', username)
      .append('password', password);
    return this.http.get(this.baseurl + '/users/login', {params: myparameters , observe: 'response'});
  }

  public exists(username: string): Observable<any> {
    return this.http.get(this.baseurl + '/users/' + username, {observe: 'response'});
  }

  public register(username: string, email: string, password: string): Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = "username="+ username + "&email=" + email + "&password=" + password;
    return this.http.post(this.baseurl + '/users', body, {headers: headers, observe: 'response'})
  }

  public getRecords(): Observable<any> {
    return this.http.get(this.baseurl + '/records', {observe: 'response'});
  }

  public getPRecords(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(this.baseurl + '/records/' + username, {headers: headers, observe: 'response'});
  }

  public storeScore(token: string, score: number, ufos: number, time: number): Observable<any>{
    const headers = new HttpHeaders().set("Authorization", token)
                                     .set("Content-Type", "application/x-www-form-urlencoded");
    const body = "punctuation=" + score + "&ufos=" + ufos + "&disposedTime=" + time;
    console.log(body);
    return this.http.post(this.baseurl + '/records', body, {headers: headers, observe: 'response'});
  }

}
