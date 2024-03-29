interface NotificationProps {
    error: string | null;
    message: boolean;
}

const Notification: React.FC<NotificationProps> = ({ error, message }) => {
	let errorStyle = {
		color: 'green',
		fontSize: 20,
		padding: 10,
		marginBottom: 10,
	}

	if (!message) {
		errorStyle = {
			color: 'pink',
			fontSize: 12,
			padding: 10,
			marginBottom: 10,
		}
	}

	return (
		<div>
			{error && error !== null && <p style={errorStyle}>{error}</p>}
		</div>
	)
}

export default Notification