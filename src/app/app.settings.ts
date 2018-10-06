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
  static getFrontEndpoint(env?: string) {
    return environment.frontEndPoint;
  }
  static getVideoEndpoint(env?: string) {
    return environment.videoEndPoint;
  }
  static getShareEndpoint(env?: string) {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;
    let url='';
    if(protocol){
      url+=protocol+'//';
    }
    if(host){
      url+=host;
    }
    if(port){
      url+=':'+port+'/';
    }else{
      url+='/';
    }
    return url;
  }

}
