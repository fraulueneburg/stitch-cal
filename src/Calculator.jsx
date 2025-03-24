import Button from './Button'
import { useState, useEffect } from 'react'

function Calculator() {
	const [isDecrease, setIsDecrease] = useState(true)

	const [numStart, setNumStart] = useState(0)
	const [numDiff, setNumDiff] = useState(0)
	const [numEnd, setNumEnd] = useState(0)

	// const handleChangeStart = (event) => {
	// 	setNumStart((prev) => event.target.value)
	// }
	// const handleChangeDiff = (event) => {}
	// const handleChangeSum = (event) => {}

	const handleChange = (event) => {
		const { id, value } = event.target

		if (id === 'stsStart') {
			setNumStart(value)
		} else if (id === 'stsDiff') {
			setNumDiff(value)
		} else if (id === 'stsEnd') {
			setNumEnd(value)
		}
	}

	useEffect(() => {
		setNumEnd(numStart - numDiff)
	}, [numStart, numDiff])

	useEffect(() => {
		setNumDiff(numStart - numEnd)
	}, [numEnd])

	return (
		<>
			<h1>Calculator</h1>
			<fieldset className="radio-group">
				<div>
					<input
						type="radio"
						id="optionDecrease"
						name="calcModeRadio"
						value="decrease"
						checked={isDecrease}
						onChange={() => setIsDecrease((prev) => !prev)}
					/>
					<label htmlFor="optionDecrease">decrease</label>
				</div>
				<div>
					<input
						type="radio"
						id="optionIncrease"
						name="calcModeRadio"
						value="increase"
						checked={!isDecrease}
						onChange={() => setIsDecrease((prev) => !prev)}
					/>
					<label htmlFor="optionIncrease">increase</label>
				</div>
			</fieldset>
			<form style={{ textAlign: 'right' }}>
				<div>
					<label htmlFor="stsStart">Starting with</label>
					<input
						id="stsStart"
						type="number"
						placeholder="0"
						min="0"
						max="1000"
						value={numStart}
						onChange={() => handleChange(event)}
					/>
					<span>stitches</span>
				</div>
				<div>
					<label htmlFor="stsDiff">{isDecrease ? 'decreasing by' : 'increasing by'}</label>
					<big>{isDecrease ? ' – ' : ' + '}</big>
					<input
						id="stsDiff"
						type="number"
						placeholder="0"
						min="0"
						max={numStart / 2}
						value={numDiff}
						onChange={() => handleChange(event)}
						disabled={numStart < 3}
					/>
					<span>stitches</span>
				</div>
				<div>
					<label htmlFor="stsEnd">ending at =</label>
					<input
						id="stsEnd"
						type="number"
						placeholder="0"
						min="0"
						max="1000"
						value={numEnd}
						onChange={() => handleChange(event)}
						disabled={numStart < 3}
					/>
					<span>stitches</span>
				</div>
			</form>
		</>
	)
}

export default Calculator
