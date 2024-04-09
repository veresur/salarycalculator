import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Person } from "@/lib/Person";
import { useEffect, useState } from "react";

type familyTaxProps = {
	setFamilyTaxDependent: (value: number) => void,
	setFamilyTaxFavored: (value: number) => void,
	setFamilyTaxToggleField: (value: boolean) => void,
	currentPerson: Person
}

export const FamilyTax : React.FunctionComponent<familyTaxProps> = ({setFamilyTaxDependent,setFamilyTaxFavored,  setFamilyTaxToggleField, currentPerson}) => {
	const [familyTaxToggle, setFamilyTaxToggle] = useState<boolean>(false);
	const [dependentCounter, setDependentCounter] = useState<number>(0);
	const [favoredDependentCounter, setFavoredDependentCounter] = useState<number>(0);

	useEffect(() => {
		setFamilyTaxToggle(currentPerson.familyTaxDiscountToggle);
		setDependentCounter(currentPerson.familyTaxDependent);
		setFavoredDependentCounter(currentPerson.familyTaxFavored);
		console.log(currentPerson.familyTaxDiscountToggle);
	}, [currentPerson])

	useEffect(() => {
		setFamilyTaxDependent(dependentCounter);
		setFamilyTaxFavored(favoredDependentCounter);

		console.log('field set to: ', familyTaxToggle);
	}, [dependentCounter, favoredDependentCounter]);

	useEffect(() => {
		setFamilyTaxToggleField(familyTaxToggle);
		if (!familyTaxToggle) {
			setDependentCounter(0);
			setFavoredDependentCounter(0);
		}
	}, [familyTaxToggle])

	return (
		<>
			<div className="flex items-center space-x-2 mt-2">
				<Switch
					id='family-tax'
					onCheckedChange={setFamilyTaxToggle}
					checked={familyTaxToggle}
				/>
				<Label className="font-semibold" htmlFor='family-tax'>Családi kedvezmény</Label>
			</div>
			<div>
				{
					familyTaxToggle && (
						<p className="mt-2">
							<Button 
								className="max-h-5 max-w-5 m-1" 
								variant="outline" 
								size="icon"
								onClick={() => {
									if (dependentCounter > 0) {
										setDependentCounter(dependentCounter - 1);
										if (dependentCounter == favoredDependentCounter) {
											setFavoredDependentCounter(dependentCounter - 1);
										}
									}
								}}
								disabled={dependentCounter == 0}
							>
								-
					  		</Button>
							{dependentCounter}
							<Button
								className="max-h-5 max-w-5 m-1"
								variant="outline" 
								size="icon"
								onClick={() => {
									setDependentCounter(dependentCounter + 1);
								}}
							>
								+
					  		</Button>
							<span className="mx-2">eltartott, ebből kedvezményezett:</span>
							<Button 
								className="max-h-5 max-w-5 m-1" 
								variant="outline" 
								size="icon"
								onClick={() => {
									if (favoredDependentCounter > 0) setFavoredDependentCounter(favoredDependentCounter - 1)
								}}
								disabled={favoredDependentCounter == 0}
							>
								-
					  		</Button>
							{favoredDependentCounter}
							<Button
								className="max-h-5 max-w-5 m-1"
								variant="outline" 
								size="icon"
								onClick={() => {
									if (dependentCounter > favoredDependentCounter && favoredDependentCounter < 3) {
										setFavoredDependentCounter(favoredDependentCounter + 1);
									}
								}}
								disabled={dependentCounter <= favoredDependentCounter || favoredDependentCounter >= 3}
							>
								+
					  		</Button>
						</p>
					)
				}
			</div>
		</>
	)
}