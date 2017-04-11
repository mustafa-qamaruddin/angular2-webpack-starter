/**
 * @author Qamar-ud-Din <m.qamaruddin@mQuBits.com>
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';

@Injectable()
export class Handler {
    public render(error: Response | any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 400) {
                errMsg = error.json().message;
            } else {
                const body = error.json() || '';
                const err = body.message || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }

        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
