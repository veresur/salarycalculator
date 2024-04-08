import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Person } from "@/lib/Person";

type familyMembersTabProps = {
	family: Person[],
	currentIndex: number,
	addNewPerson: () => void
}

const FamilyMemberTabs : React.FunctionComponent<familyMembersTabProps> = ({family, currentIndex, addNewPerson}) => {
	return (
		<div className='rounded-lg flex'>
			<div className='bg-slate-300 rounded-lg flex'>
				{
					family.map((person) : ReactNode => {
						return (
							<Button 
								className={'m-1 text-slate-900 font-bold hover:text-white min-w-10 ' + (family[currentIndex].id == person.id ? 'bg-white' : 'bg-slate-300')}
								key={person.id}
							>
								{person.name}
							</Button>
						)
					})
				}
			</div>
			<div>
				{
					(family[currentIndex].name.length > 0) 
					&&
					<Button 
						className="font-bold m-1" 
						variant="outline" 
						size="icon"
						onClick={() => {addNewPerson()}}
					>
						+
					</Button>
				}
			</div>
		</div>
	);
};

export default FamilyMemberTabs;
