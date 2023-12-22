export class Users {
    public email: string;
    public phone: string;
    public cityId: number;

    public constructor(email: string, phone: string, cityId: number) {
        this.email = email;
        this.phone = phone;
        this.cityId = cityId;
    }
}
export type Deals = {
     value: number
     type: number
     date: string
     shopId: number
     dateStr: string
}