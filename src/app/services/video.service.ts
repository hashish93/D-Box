import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/video.model";
import {RequestOptions} from "@angular/http";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  readonly apiKey: string = 'videos';
  constructor(public  http: HttpClient) { }

  public getVideos(limit?:Number,order?:String,orderBy?:string,filter?:Object,page?:number,pagination?:number,key?:string): Observable<any>{
    let params : string = '';
    if(limit){
      params +='?limit='+limit
    }
    if(order){
      params +='&order='+order
    }
    if(orderBy){
      params +='&orderBy='+orderBy
    }
    if(filter){
      if(params){
        for(let key of Object.keys(filter)){
          params +="&"+key+'='+filter[key];
        }
      }else{
        params +="?"+Object.keys(filter)[0]+'='+filter[Object.keys(filter)[0]]
      }

    }
    if(page){
      params +='&page='+page;
    }
    if(pagination){
      params +='&pagination='+pagination;
    }
    if(key){
      params +='&q='+key
    }
    return this.http.get(this.apiKey+params)
  }

  public getVideo(id?:Number): Observable<any>{
    return this.http.get(this.apiKey+'/'+id);
  }
  public getAuthVideo(id?:Number): Observable<any>{
    return this.http.get("auth/"+this.apiKey+'/'+id);
  }

  public likeVideo(id: Number): Observable<any> {
    return this.http.get('auth/like/'+id);
  }

  public isVideoLiked(id: Number): Observable<any> {
    return this.http.get('auth/isliked/'+id);
  }

  public getLikedVideos(page?:Number,limit?:Number,pagination?:Number): Observable<any>{
    let params : string = '';
    if(page){
      params +='?page='+page
    }
    if(limit){
      params +='&limit='+limit
    }
    if(pagination){
      params +='&pagination='+pagination
    }
    return this.http.get('auth/liked/list'+params);
  }

  public getTags = (text: string): Observable<any> => {
    return this.http.get('tags/search/keywords?keyword='+text);
  };

  public getRegisteredTags(page:number,limit:number,searchText:string): Observable<any>{
    return this.http.get('tags?q='+searchText+'&page='+page+'&limit='+limit);
  }
  public getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
  public postVideo(video: Video):Observable<any> {

    let uploaded= Object.create(video);
    if(uploaded.blob){
      let file = new File([uploaded.file], video.file.name, { type: video.file.type });
      let blob= new File([uploaded.blob], file.name,{type:file.type});
      uploaded.file = file;
      uploaded.title = video.title;
      uploaded.description = video.description;
      uploaded.blob = blob;
      uploaded.file = uploaded.blob;
      uploaded.categories = video.categories;
      uploaded.num = video.num;
      uploaded.num_chunks = video.num_chunks;
      if(video.tags){
        uploaded.tags = video.tags;
      }

      delete uploaded.blob;
    }else{
      uploaded = video;
    }
    console.log(uploaded);
    let videoData = this.getFormData(uploaded);
    return this.http.post('auth/videos',videoData);
  }

  public getMyVideos(page?:Number,limit?:Number,pagination?:Number): Observable<any> {
    let params: string = '';
    if (page) {
      params += '?page=' + page
    }
    if (limit) {
      params += '&limit=' + limit
    }
    if (pagination) {
      params += '&pagination=' + pagination
    }
    return this.http.get('auth/videos' + params);
  }

  deleteVideo(id: any) : Observable<any> {
    return this.http.delete('auth/videos/'+id);
  }

  deleteVideos(IDS: any) {
    return this.http.request('delete','auth/videos/delete/bulk',{ body: {"ids":IDS} });
  }

  editVideo(video: Video) : Observable<any> {
    let myVideo = video;
    myVideo._method = 'put';
    if(myVideo.file){
      myVideo.defaultImageUrl=myVideo.file;
    }else{
      delete myVideo.defaultImageUrl;
    }
    let videoData = this.getFormData(myVideo);
    return this.http.post('auth/videos/'+myVideo.id,videoData);
  }

  addToWatchLater(id: number) {
    return this.http.get('auth/watch/'+id);
  }
  public getMyWatchedLater(page?:Number,limit?:Number,pagination?:Number): Observable<any> {
    let params: string = '';
    if (page) {
      params += '?page=' + page
    }
    if (limit) {
      params += '&limit=' + limit
    }
    if (pagination) {
      params += '&pagination=' + pagination
    }
    return this.http.get('auth/watched/list' + params);
  }
}
