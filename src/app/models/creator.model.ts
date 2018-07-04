export interface CreatorPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Creator[]
}

export interface Creator {
  _id: Number,
  title: string,
  description: string,
  job: string,
  country: string,
  age: Number,
  date: Date,
  social:any,
  counter:{
    videos:Number,
    likes:Number
  },
  avatar:string,
  cover:string,
  _index:string,
  _type:string,
  _score:Number
}
