import { useState } from 'react'
import { useField } from 'formik'
import { BsEye, BsEyeFill } from 'react-icons/bs'

interface TextInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    width: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, width, type, ...props }) => {
	const [showPassword, setShowPassword] = useState(false)
	const [field, meta] = useField(props)

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="flex justify-start items-center px-10">
			<div className="flex flex-col items=start p-3">
				<label htmlFor={props.name} className="font-sans text-sm text-light-green text-start p-1">{label}</label>
				<div className="relative">
					<input
						className={`text-input rounded bg-gray font-mono text-light-green text-sm p-2 ${width}`}
						{...field}
						{...props}
						type={showPassword ? 'text' : type}
					/>
					{type === 'password' && (
						<div
							className="absolute top-2 right-4 cursor-pointer"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? (
								<BsEyeFill />
							) : (
								<BsEye />
							)}
						</div>
					)}
				</div>
				{meta.touched && meta.error ? (
					<div className="error font-sans text-sm text-pink text-start p-1">{meta.error}</div>
				) : null}
			</div>
		</div>
	)
}

export default TextInput
