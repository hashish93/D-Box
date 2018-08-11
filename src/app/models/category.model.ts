export interface CategoryPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Category[]
}

export interface Category {
  _id: number,
  title: string,
  description: string,
  date: Date,
  color:any
  icon: string,
  _index: string,
  _type: string,
  _score:any,
  id:number

}
