import { useField } from 'formik'

interface SelectInputProps {
    label: string;
    name: string;
    width: string;
    children: JSX.Element[] | JSX.Element;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, width, ...props }) => {
	const [field, meta] = useField(props)

	return (
		<div className="flex justify-start items-center px-10">
			<div className="flex flex-col items=start p-3">
				<label htmlFor={props.name} className="font-sans text-sm text-light-green text-start p-1">{label}</label>
				<select className={`text-input rounded bg-gray font-mono text-light-green text-sm p-2 ${width}`} {...field} {...props} />
				{meta.touched && meta.error ? (
					<div className="error font-sans text-sm text-pink text-start p-1">{meta.error}</div>
				) : null}
			</div>
		</div>
	)
}

export default SelectInput