/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { OAuthService } from './../oauth/o-auth.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { Config } from './../../environments/config';
import { Handler } from './../handler';

@Injectable()
export class RegisterService {
    private baseUrl;
    private endpoint = 'auth/register';

    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler
    ) {
        this.baseUrl = Config.get('baseURL');
    }

    public register(user: User): Observable<User> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux(user, data)))
            .catch(this.handler.render);
    }

    public aux(user: User, accessToken: String): Observable<User> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let body = JSON.stringify(user);
        console.log(body, options);
        return this.http.post(this.baseUrl + this.endpoint, body, options)
            .map((response: Response) => (response.json().message as User));
    }
}
