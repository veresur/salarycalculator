import { Person } from "@/lib/Person";
import { ReactNode } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
  

type houseHoldSummaryProps = {
	family: Person[]
}

export const HouseholdSummary :React.FunctionComponent<houseHoldSummaryProps>  = ({family}) => {
  return (
	<div className="bg-slate-300 rounded-lg p-3 pl-5">
		<div className="font-semibold text-xl">
			Háztartás összesített jövedelme:
		</div>
		<Table className="mt-5">
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">Családtag</TableHead>
					<TableHead className="text-center">Nettó bér</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{
					family.map((person) : ReactNode => {
						return (
							<TableRow key={person.id}>
								<TableCell className="font-medium">{person.name}</TableCell>
								<TableCell>{person.calcNet()}</TableCell>
							</TableRow>
						)
					})
				}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Összesen</TableCell>
					<TableCell className="text-center">
						{
							family.reduce((accumulator, person) => accumulator + person.calcNet(), 0).toLocaleString().concat(' Ft')
						}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	</div>
  );
};