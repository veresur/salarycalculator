import { Person } from "@/lib/Person";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { InputComponent } from "./components/InputComponent";
import { Slider } from "./../ui/slider"
import { SwitchComponent } from "./components/SwitchComponent";
import { FreshMerriage } from "./components/FreshMarriage";
import { FamilyTax } from "./components/FamilyTax";
import { Trash } from "lucide-react";

type salaryCalculatorProps = {
  family: Person[],
  setFamily: (family: Person[]) => void,
  currentIndex: number,
  deletePersonById: (id: string) => void
}

export const SalaryCalculator : React.FunctionComponent<salaryCalculatorProps> = ({family, setFamily, currentIndex, deletePersonById}) => {

	const setCurrentPerson = (person: Person): void => {
		const updatedFamily = [...family];
		updatedFamily[currentIndex] = person;
		setFamily(updatedFamily);
	}

	const setCurrentGross = (amount: string | number): void => {
		const currentPerson: Person = family[currentIndex];

		if (typeof amount == 'string') {
			if (!isNaN(parseInt(amount))) {
				currentPerson.gross = Math.round(parseInt(amount));
			}
			else if (amount.length == 0) {
				currentPerson.gross = 0;
			}
		}
		else {
			currentPerson.gross = Math.round(amount);
		}

		setCurrentPerson(currentPerson);
	}

	const modifyCurrentGross = (factor : number) : undefined => {
		setCurrentGross(family[currentIndex].gross * factor);
	}

	const setCurrentName = (newName: string) : void => {
		const currentPerson: Person = family[currentIndex];

		currentPerson.name = newName;

		setCurrentPerson(currentPerson);
	}

	const setCurrentUnder25 = (applicable: boolean): void => {
		const currentPerson: Person = family[currentIndex];

		currentPerson.under25 = applicable;

		setCurrentPerson(currentPerson);
	}

	const setCurrentPersonalTaxDiscount = (applicable: boolean): void => {
		const currentPerson: Person = family[currentIndex];

		currentPerson.personalTaxDiscount = applicable;

		setCurrentPerson(currentPerson);
	}

	const setCurrentFreshMarriage = (applicable: boolean): void => {
		const currentPerson: Person = family[currentIndex];

		currentPerson.freshMarriage = applicable;

		setCurrentPerson(currentPerson);
	}

	const setCurrentFamilyTaxDiscountValue = (value: number): void => {
		const currentPerson: Person = family[currentIndex];

		currentPerson.familyTaxDiscount = value;

		setCurrentPerson(currentPerson);
	}

	return <>
		<div className='bg-slate-300 rounded-lg p-3 pl-5 text-left'>
			<h1 className='text-2xl flex font-bold flex justify-between'>
				<span className='uppercase'>{family[currentIndex].name} bérének kiszámítása</span>
				<Button 
					variant="outline" 
					size="icon"
					onClick={() => deletePersonById(family[currentIndex].id)}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</h1>
			<InputComponent
				labelText='Családtag neve:'
				childInputProps={{
					name: 'name',
					placeholder: 'Bendi',
					onChange: (e) => setCurrentName(e.target.value),
					value: family[currentIndex].name
				}}
				description='Add meg a családtag nevét!'
			></InputComponent>

			<InputComponent
				labelText='Bruttó bér:'
				childInputProps={{
				name: 'gross',
					onChange: (e) => setCurrentGross(e.target.value),
					value: family[currentIndex].gross
					
				}}
				description='Add meg a bruttó béredet!'
			></InputComponent>

			<Slider
				max={1000000}
				step={1}
				className={cn("w-[60%]", "my-2")}
				onValueChange={(e) => setCurrentGross(e[0])}
				value={[family[currentIndex].gross]}
			/>
			
			<Button className='ml-3 mt-2' onClick={() => modifyCurrentGross(0.90)}>-10%</Button>
			<Button className='ml-3 mt-2' onClick={() => modifyCurrentGross(0.95)}>-5%</Button>
			<Button className='ml-3 mt-2' onClick={() => modifyCurrentGross(1.05)}>+5%</Button>
			<Button className='ml-3 mt-2' onClick={() => modifyCurrentGross(1.10)}>+10%</Button>

			<p className="text-lg font-bold uppercase">Kedvezmények</p>

			<SwitchComponent
				labelText="25 év alattiak SZJA kedvezménye"
				childSwitchProps={{
					id: 'under-25',
					onCheckedChange: (checked) => setCurrentUnder25(checked),
					checked: family[currentIndex].under25
				}}
			/>

			<FreshMerriage
				labelText="Friss Házasok Kedvezménye"
				id='fresh-merriage'
				setFreshMarriage={setCurrentFreshMarriage}
				currentPerson={family[currentIndex]}
			/>
			
			<SwitchComponent
				labelText="Személyi adókedvezmény"
				childSwitchProps={{
					id: 'personal-tax-discount',
					onCheckedChange: (checked) => setCurrentPersonalTaxDiscount(checked),
					checked: family[currentIndex].personalTaxDiscount
				}}
			/>

			<FamilyTax
				setFamilyTaxDiscountValue={setCurrentFamilyTaxDiscountValue}
			/>

			<p>{family[currentIndex].freshMarriage ? 'true' : 'false'}</p>

			<div className="flex flex-col justify-end items-center mt-12">
				<div className="font-semibold text-xl">
					Számított nettó bér:
				</div>
				<div className="bg-slate-900 text-white py-4 px-5 text-2xl rounded-xl mt-3 mb-8">
					{family[currentIndex].calcNet().toLocaleString().toString().concat(' Ft')}
				</div>
			</div>
		</div>
	</>;
};

export default SalaryCalculator;


