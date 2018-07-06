export interface CreatorPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Creator[]
}

export interface Creator {
  _id: Number,
  email: string,
  password:string,
  password_confirmation:string,
  fullname:string,
  mobile:string,
  title: string,
  address:string,
  description: string,
  job: string,
  country: string,
  age: Number,
  date: Date,
  facebook: string,
  twitter: string,
  google: string,
  instagram: string,
  social:any,
  counter:{
    videos:Number,
    likes:Number
  },
  avatar:string,
  cover:string,
  _index:string,
  _type:string,
  _score:Number,
  user_type:string
}
