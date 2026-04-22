export class Users {
	public email: string;
	public phone: string;
	public cityid: number;
	public date_registered: Date;

	public constructor(email: string, phone: string, cityid: number, date_registered: Date) {
		this.email = email;
		this.phone = phone;
		this.cityid = cityid;
		this.date_registered = date_registered;
	}
}
export class Deals {
	public id: number;
	public date: string;
	public enddate: string;
	public shopId: number;
	public value: string;
	public type: number;
	public text: string;
	public tableText = '';
	public priority = 0;

	public constructor(
		id: number,
		date: string,
		endDate: string,
		shopId: number,
		value: string,
		type: number,
		text: string,
		priority: number,
		tableText = ''
	) {
		this.id = id;
		this.date = date;
		this.enddate = endDate;
		this.shopId = shopId;
		this.value = value;
		this.type = type;
		this.text = text;
		this.tableText = tableText;
		this.priority = priority;
	}
}
