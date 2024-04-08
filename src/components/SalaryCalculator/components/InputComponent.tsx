import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type inputComponentProps = {
	labelText: string,
	description: string,
	childInputProps: InputProps
}

export const InputComponent: React.FunctionComponent<inputComponentProps> = ({childInputProps: parentProps, labelText, description}) => {
		
	return <>
		<Label htmlFor='gross'>{labelText}</Label>
		<Input
			className='w-1/2'
			{...parentProps}
		></Input>
		<p className="text-sm mt-2 text-muted-foreground text-black/50">{description}</p>
	</>
}