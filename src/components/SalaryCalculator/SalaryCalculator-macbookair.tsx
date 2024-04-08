import { Person } from "@/lib/Person";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { InputComponent } from "./components/InputComponent";
import { Slider } from "./../ui/slider"
import { SwitchComponent } from "./components/SwitchComponent";

type salaryCalculatorProps = {
  family: Person[],
  setFamily: (family: Person[]) => void,
  currentIndex: number
}

export const SalaryCalculator : React.FunctionComponent<salaryCalculatorProps> = ({family, setFamily, currentIndex}) => {

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

	

	return <>
		<div className='bg-slate-300 rounded-lg p-3 text-left'>
			<h1 className='text-2xl flex font-bold'>
				{family[currentIndex].name}<span className='uppercase'>&nbsp;bérének kiszámítása</span>
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

			<p>netto ber: {family[currentIndex].gross + 23}</p>

			<p className="text-lg font-bold uppercase">Kedvezmények</p>

			<SwitchComponent
				labelText="25 év alattiak SZJA mentessége"
				childSwitchProps={{
					id: 'under-25'

				}}
			/>
		</div>
	</>;
};

export default SalaryCalculator;


