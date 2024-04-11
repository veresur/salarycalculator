import HouseholdSalaryCalculator from "./components/HouseHoldSalaryCalculator";
import './App.css'
import { useEffect } from "react";

export default function Fapp() {
	useEffect(() => {
		document.title = "Salary Calculator App"
	}, [])

	return <HouseholdSalaryCalculator/>;
}