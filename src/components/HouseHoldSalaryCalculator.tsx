import { Person } from "@/lib/Person";
import { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import { HouseholdSummary } from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [family, setFamily] = useState<Person[]>([new Person]);

	const deletePersonById = (id: string): void => {
		if (family.length == 1) {
			setFamily([new Person()]);
		} else {
			setFamily(family.filter(person => person.id !== id));
			if (currentIndex == family.length - 1) setCurrentIndex(family.length - 2);
		}

	}

	const addNewPerson = (): void => {
		const newPerson: Person = new Person();
		setFamily([...family, newPerson]);
		setCurrentIndex(family.length);
	}

	const loadPersonById = (id: string): void => {
		for (let i = 0; i < family.length; i++) {
			if (family[i].id == id) {
				setCurrentIndex(i);
				return;
			}
		}
	}

	return (
		<div className='bg-slate-100 p-2'>
		<header className='mt-0 text-left'>
			<FamilyMemberTabs
				family={family}
				currentIndex={currentIndex}
				addNewPerson={addNewPerson}
				loadPerson={loadPersonById}
			/>
		</header>
		<main>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
				<SalaryCalculator
					family={family}
					setFamily={setFamily}
					currentIndex={currentIndex}
					deletePersonById={deletePersonById}
				/>
				<HouseholdSummary family={family} />
			</div>
		</main>
		</div>
	);
};

export default HouseholdSalaryCalculator;
