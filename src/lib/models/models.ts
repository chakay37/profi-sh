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
export class Deals {
    public id: number;
    public date: Date;
    public enddate: Date;
    public shopId: number;
    public value: string;
    public type: number;
    public text: string;
    public tableText = '';

    public constructor(id: number, date: Date, endDate: Date, shopId: number, value: string, type: number, text: string, tableText = '') {
        this.id = id;
        this.date = date;
        this.enddate = endDate;
        this.shopId = shopId;
        this.value = value;
        this.type = type;
        this.text = text;
        this.tableText = tableText;
    }
}