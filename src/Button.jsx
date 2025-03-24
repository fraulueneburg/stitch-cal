const Button = (props) => {
	const action = props.onClick
	const label = props.label
	const className = props.className
	const index = props.dataIndex

	return (
		<>
			<button className={className} onClick={action} data-index={index}>
				{label}
			</button>
		</>
	)
}

export default Button
