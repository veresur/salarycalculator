import './App.css'
import { Button } from './components/ui/button';
import { Person } from './lib/Person';
import { useState } from 'react';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Slider } from './components/ui/slider';
import { cn } from './lib/utils';

function App() {
	
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [family, setFamily] = useState<Person[]>([new Person]);

	const modifyGross = (factor : number) : undefined => {
		setFamily(prevFamily => {
			const updatedFamily = [...prevFamily];
			updatedFamily[currentIndex].gross = Math.floor(factor * updatedFamily[currentIndex].gross);
			console.log(updatedFamily[0]);
			return updatedFamily;
		})
	}

	const setGross = (amount : number) : undefined => {
		setFamily(prevFamily => {
			const updatedFamily = [...prevFamily];
			updatedFamily[currentIndex].gross = amount;
			console.log(updatedFamily[0]);
			return updatedFamily;
		})
	}

	return (
		<div className='bg-slate-100 p-2'>
			<header className='mt-0 text-left'>
				<div className='p-1 bg-slate-300 rounded-lg'>
					<Button className='bg-white text-slate-900 hover:text-white'>asd</Button>
				</div>
			</header>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
				<div className='bg-slate-300 rounded-lg p-3 text-left'>
					<h1 className='text-2xl flex font-bold'>
						{family[currentIndex].name}<span className='uppercase'>&nbsp;bérének kiszámítása</span>
					</h1>
					<Label htmlFor='name'>Családtag neve:</Label>
					<Input 
						name='name' 
						className='w-1/2' 
						value={family[currentIndex].name} 
						onChange={(e) => {
							setFamily(prevFamily => {
								const updatedFamily = [...prevFamily];
								updatedFamily[currentIndex].name = e.target.value;
								return updatedFamily;
							
						})}}
						placeholder='Bendi'
					></Input>
					<p className="text-sm mt-2 text-muted-foreground text-black/50">Add meg a családtag nevét!</p>

					<Label htmlFor='name'>Bruttó bér:</Label>
					<Input 
						name='name' 
						className='w-1/2' 
						value={family[currentIndex].gross}
						onChange={(e) => {
							setFamily(prevFamily => {
								const updatedFamily = [...prevFamily];
								if (!isNaN(parseInt(e.target.value))) {
									updatedFamily[currentIndex].gross = parseInt(e.target.value);
								}
								else if (e.target.value.length == 0) {
									updatedFamily[currentIndex].gross = 0;
								}
								return updatedFamily;
							
						})}}
						placeholder='Bendi'
					></Input>
					<p className="text-sm mt-2 text-muted-foreground text-black/50">Add meg a bruttó béredet!</p>

					<Slider
						max={1000000}
						step={1}
						className={cn("w-[60%]", "my-2")}
						onValueChange={(e) => setGross(e[0])}
						value={[family[currentIndex].gross]}
					/>
					
					<Button className='ml-3 mt-2' onClick={() => modifyGross(0.90)}>-10%</Button>
					<Button className='ml-3 mt-2' onClick={() => modifyGross(0.95)}>-5%</Button>
					<Button className='ml-3 mt-2' onClick={() => modifyGross(1.05)}>+5%</Button>
					<Button className='ml-3 mt-2' onClick={() => modifyGross(1.10)}>+10%</Button>

					<p>netto ber: {family[currentIndex].gross + 23}</p>
				</div>
				<div className='bg-slate-300 rounded-lg'>02</div>
			</div>
		</div>
	)
}

export default App
