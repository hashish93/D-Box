/**
 * Created by mohammed on 7/4/2018.
 */
import {environment} from '../environments/environment';

export class AppSettings {
  static getApiEndpoint(env?: string) {
    return environment.apiEndpoint;
  }
  static getStaticEndpoint(env?: string) {
    return environment.staticFilesEndPoint;
  }
}
