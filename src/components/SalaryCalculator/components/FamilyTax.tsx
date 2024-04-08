import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react";

type familyTaxProps = {
	setFamilyTaxDiscountValue: (value: number) => void
}

export const FamilyTax : React.FunctionComponent<familyTaxProps> = ({setFamilyTaxDiscountValue}) => {
	const [familyTaxToggle, setFamilyTaxToggle] = useState<boolean>(false);
	const [dependentCounter, setDependentCounter] = useState<number>(0);
	const [favoredDependentCounter, setFavoredDependentCounter] = useState<number>(0);

	useEffect(() => {

		let factor: number = 0;
		switch (favoredDependentCounter) {
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

		setFamilyTaxDiscountValue(factor * dependentCounter);

	}, [dependentCounter, favoredDependentCounter]);

	return (
		<>
			<div className="flex items-center space-x-2 mt-2">
				<Switch
					id='family-tax'
					onCheckedChange={setFamilyTaxToggle}
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