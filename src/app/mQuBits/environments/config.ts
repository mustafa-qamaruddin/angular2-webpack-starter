/**
 * @author Qamar-ud-Din <m.qamaruddin@mQuBits.com>
 */
import { Development, Staging, Production } from './configs';

export class Config {

    public static get(key) {
        let data = {};
        switch (ENV) {
            case 'production':
                data = Production;
                break;
            case 'staging':
                data = Staging;
                break;
            case 'development':
                data = Development;
                break;
            default:
                data = Development;
        }
        return data[key] ? data[key] : null;
    }
}
