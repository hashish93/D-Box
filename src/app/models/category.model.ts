export interface CategoryPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Category[]
}

export interface Category {
  _id: Number,
  title: string,
  description: string,
  date: Date,
  icon: string,
  _index: string,
  _type: string,
  _score:any,
  id:Number

}
