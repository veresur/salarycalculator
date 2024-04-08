import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Person } from "@/lib/Person"
import { useState } from "react"
import { Input } from "@/components/ui/input"

type freshMarriage = {
	id:  string,
	labelText: string,
	setFreshMarriage: (applicable: boolean) => void,
	currentPerson: Person
}

export const FreshMerriage: React.FunctionComponent<freshMarriage> = ({id, labelText, currentPerson, setFreshMarriage}) => {
	const [freshMarriageToggle, setFreshMarriageToggle] = useState<boolean>(false);
	const [marriageDateString, setMarriageDateString] = useState<string>("");

	const isDateValid = (dateString: string): boolean => {
		return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(dateString);
	}

	const updateFreshMarriageDiscount = (dateString: string) => {
		setFreshMarriage(isFreshMarriageDiscountApplicable(dateString));
	}

	const isFreshMarriageDiscountApplicable = (dateString: string):boolean => {
		if (!isDateValid(dateString)) return false;
		
		const today = new Date();
		const marriageDate = new Date(Date.parse(marriageDateString));

		const todayYear = today.getFullYear();
		const marriageYear = marriageDate.getFullYear();

		const todayMonth = today.getMonth();
		const marriageMonth = marriageDate.getMonth();

		if (marriageYear > todayYear) return false;

		if (marriageYear == todayYear && todayMonth <= marriageMonth) return false;

		marriageDate.setFullYear(marriageDate.getFullYear() + 2);
		if (marriageDate < today) return false;

		return true;
	}

	return (
		<>
			<div className="flex items-center space-x-2 mt-2">
				<Switch
					id={id}
					checked={freshMarriageToggle}
					onCheckedChange={(v) => {setFreshMarriageToggle(v);setMarriageDateString(''); if(!v) setFreshMarriage(false)}}
				/>
				<Label className="font-semibold" htmlFor={id}>{labelText}</Label>
				{
					freshMarriageToggle
					
					&&

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className="max-h-6">Dátum megadása</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogDescription>
									A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
								</AlertDialogDescription>
								<AlertDialogTitle>Add meg a házasságkötés dátumát:</AlertDialogTitle>
								<Input placeholder="YYYY-MM-DD" value={marriageDateString} onChange={(e) => {setMarriageDateString(e.target.value);updateFreshMarriageDiscount(e.target.value)}}/>
								<span className="text-sm mt-5 text-muted-foreground text-black/50 inline-block">
									{
										isDateValid(marriageDateString)
										?
											<span className="mr-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Jó formátum</span>
										:
											<>
												<span className="mr-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Rossz formátum</span>
												Például: 2023-12-31
											</>
									}

									
								</span>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => {setFreshMarriageToggle(false);setMarriageDateString('');setFreshMarriage(false);}}>Mésge</AlertDialogCancel>
								<AlertDialogAction disabled={!isDateValid(marriageDateString)}>Mentés</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				}

				{ (freshMarriageToggle && marriageDateString.length > 0 ) && 
					(isFreshMarriageDiscountApplicable(marriageDateString)
					?
						<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">jogosult</span>
					:
						<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">nem jogosult</span>
					)
				}
			</div>
		</>
	)
}