export class Person {
	name: string;
	gross: number;
	net: number;
	id: string;
	under25: boolean;
	personalTaxDiscount: boolean;
	freshMarriage: boolean;
	familyTaxDiscount: number;

	constructor () {
		this.name = "";
		this.gross = 100000;
		this.net = 0;
		this.id = "id" + Math.random().toString(16).slice(2);
		this.under25 = false;
		this.personalTaxDiscount = false;
		this.freshMarriage = false;
		this.familyTaxDiscount = 0;
	}

	calcNet = ():number => {
		return Math.round(this.gross * 0.5);
	}
}