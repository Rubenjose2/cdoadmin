export interface PeopleModel {
    name?: string ,
    last_name?: string,
    email?: string,
    phone?: string,
    age?: string,
    refered_by?: string,
    church_from?: string,
    emergency_contract?: string,
    relationship?: string,
    translation?: string,
    emergency_phone?: string,
    encuentroID?: string,
    maletas?: string,
    pago?:string,
    grupo?:string,
    descuento?:string,
    sponsor?:string,
    checkIn?: string,
    pagoDone?:boolean
}

export interface PeopleRaw {
    sysId?: string,
    name?: string,
    last_name?:string,
    email?:string,
    phone?:string,
    age?:string,
    submitted?:any,
    NewLife?:{}
}

export interface PeopleNormalized {
    id?:string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    age?:string,
    NewLife?:{},
    created?: {}
}

export interface PeopleBasicInfo {
    name?:string,
    last_name?:string,
    phone?:string,
    email?:string
}

export class Normalizer {
    toPeople(peopleObjects:PeopleRaw[]):PeopleNormalized[]{
        return peopleObjects.map((peopleObject) => ({
            id: peopleObject.sysId,
            firstName: peopleObject.name,
            lastName: peopleObject.last_name,
            email: peopleObject.email,
            phone: peopleObject.phone,
            age: peopleObject.age,
            NewLife:peopleObject?.NewLife,
            created : new Date(peopleObject.submitted).toLocaleDateString("en-US")
        }))
    }
}