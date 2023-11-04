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