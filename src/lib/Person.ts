export class Person {
	name: string;
	gross: number;
	net: number;
	id: string;
	under25: boolean;
	personalTaxDiscount: boolean;
	freshMarriage: boolean;
	freshMarriageToggle: boolean;
	familyTaxDiscountToggle: boolean;
	marriageDateString: string;
	familyTaxFavored: number;
	familyTaxDependent: number;

	constructor () {
		this.name = "";
		this.gross = 100000;
		this.net = 0;
		this.id = "id" + Math.random().toString(16).slice(2);
		this.under25 = false;
		this.personalTaxDiscount = false;
		this.freshMarriage = false;
		this.freshMarriageToggle = false;
		this.familyTaxDiscountToggle = false;
		this.marriageDateString = "";
		this.familyTaxDependent = 0;
		this.familyTaxFavored = 0;
	}

	calcNet = ():number => {
		let tax: number = 0;

		if(this.under25 && this.gross > 499952) {
			tax += ((this.gross - 499952) * 0.15);
		}

		if(!this.under25) {
			tax += (this.gross * 0.15);
		}
		
		tax += (this.gross * 0.185)

		if (this.personalTaxDiscount) {
			tax -= 77300;
		}

		

		let factor: number = 0;
		switch (this.familyTaxFavored) {
			case 1:
				factor = 10000;
				break;
			case 2:
				factor = 20000;
				break;
			case 3:
				factor = 33000;
				break;
			default:
				factor = 0;
				break;
		}

		tax -= (factor * this.familyTaxDependent);

		let net: number = tax > 0 ? this.gross - tax : this.gross;

		if (this.freshMarriage) {
			net += 5000;
		}

		return net;
	}
}