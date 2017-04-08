/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Config } from './../../environments/config';
import { Handler } from './../handler';

@Injectable()
export class OAuthService {
    private baseUrl;
    private endpoint = 'oauth/access_token';

    constructor(
        private http: Http,
        private handler: Handler
    ) {
        this.baseUrl = Config.get('baseURL');
    }

    public authenticate(): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', Config.get('clientID'));
        body.append('client_secret', Config.get('clientSecret'));
        console.log(body.toString());
        return this.http.post(this.baseUrl + this.endpoint, body.toString(), options)
            .map(
            (response: Response) => {
                localStorage.setItem('token', response.json().access_token);
            }
            );
    }

    public getAccessToken(): Observable<any> {
        let token = localStorage.getItem('token');
        if (!token || token == 'undefined' || token == undefined) {
            return this.authenticate().map((dummy) => (localStorage.getItem('token')) );
        } else {
            return Observable.of(token);
        }
    }
}
