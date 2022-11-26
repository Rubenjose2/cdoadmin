import { Timestamp } from "firebase/firestore"

export interface NewLife {
    state?: string,
    coach?:{}
}

export interface coachee {
  age?:string,
  email?:string,
  last_name?:string,
  name?:string,
  phone?:string,
  source?:string,
  submitted?:string,
  visible?:boolean
}

export interface comments {
  coach?:string,
  coachee?:string,
  comment?:any,
  dateTime?:any
}
