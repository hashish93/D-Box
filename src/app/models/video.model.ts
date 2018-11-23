import {Category} from "./category.model";
/**
 * Created by mohammed on 7/4/2018.
 */
export interface VideoPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Video[]
}

export interface Video {
  id: number
  _id:number,
  creator:any,
  title: string,
  likes: number,
  image: string,
  description: string,
  thumbnail: string,
  thumbnails: any,
  defaultImageUrl:string,
  counter:{
    likes : number,
    views : number
  },
  _method:string,
  date: Date,
  categories: Category[],
  categories_names: number[],
  category: Category,
  category_id: number,
  category_name: string,
  is_liked:boolean,
  is_watched:boolean,
  tags:any,
  file:any,
  num: number,
  num_chunks: number,
  blob: any,
  checked:any,
  small:any,
  published:number,
  activated:number,
  time_ago:string,
  share:boolean,
  duration:any
}
