import './App.css'
import { Button } from "@/components/ui/button"

function App() {
	

	return (
		<div className='bg-slate-100 container'>
			<header className='mt-0 p-2 text-left'>
				<div className='p-1 bg-slate-300 rounded-lg'>
					<Button className='bg-white text-slate-900'>asd</Button>
				</div>
			</header>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 bg-slate-700 rounded-lg">
				<div>01</div>
				<div>02</div>
			</div>
		</div>
	)
}

export default App
