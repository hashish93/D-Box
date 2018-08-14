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
  id: Number
  _id:Number,
  creator:any,
  title: string,
  likes: Number,
  image: string,
  description: string,
  thumbnail: string,
  thumbnails: Object,
  defaultImageUrl:string,
  counter:{
    likes : number,
    views : number
  },
  _method:string,
  date: Date,
  categories: Category[],
  category: Category,
  category_id: number,
  category_name: string,
  is_liked:boolean,
  tags:any,
  file:any,
  num: number,
  num_chunks: number,
  blob: any,
  checked:any
}
