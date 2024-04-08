import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import * as SwitchPrimitives from "@radix-ui/react-switch"

type switchComponentProps = {
	childSwitchProps: SwitchPrimitives.SwitchProps,
	labelText: string
}

export const SwitchComponent : React.FunctionComponent<switchComponentProps> = ({childSwitchProps, labelText}) => {
	return (<>
		<div className="flex items-center space-x-2 mt-2">
			<Switch {...childSwitchProps}/>
			<Label className="font-semibold" htmlFor={childSwitchProps.id}>{labelText}</Label>
		</div>
	</>)
}