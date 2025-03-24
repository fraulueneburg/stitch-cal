import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Button from './Button'

const StitchClicker = () => {
	const [boxesTotal, setBoxesTotal] = useState(40)
	const [decreasesTotal, setDecreasesTotal] = useState(24)
	const [arr, setArr] = useState([])

	useEffect(() => {
		console.log('boxesTotal', boxesTotal)
		const testArr = new Array(+boxesTotal).fill('O')

		setArr(testArr)
	}, [boxesTotal])

	const handleButtonClick = (event) => {
		const itemIndex = event.target.dataset.index
		const className = event.target.className
		console.log(itemIndex, className)

		if (className === 'O') {
			setArr((prev) => prev.toSpliced(itemIndex, 1, 'X'))
			setDecreasesTotal((prev) => prev - 1)
		} else if (className === 'X') {
			setArr((prev) => prev.toSpliced(itemIndex, 1, 'O'))
			setDecreasesTotal((prev) => prev + 1)
		}
	}

	return (
		<>
			<h1>Stitch Clicker</h1>
			<fieldset className="form-stitch-player">
				<div className="form-elem">
					<label>stitches</label>
					<input
						type="number"
						min="0"
						max="100"
						placeholder="0"
						value={boxesTotal}
						onChange={(event) => setBoxesTotal((prev) => +event.target.value)}
					/>
				</div>
				<div className="form-elem">
					<label>decreases left</label>
					<input
						type="number"
						min="0"
						max="100"
						placeholder="0"
						value={decreasesTotal}
						disabled
						onChange={(event) => setDecreasesTotal((prev) => +event.target.value)}
					/>
				</div>
			</fieldset>
			<ul className="unstyled horizontal mini">
				{arr.map((elem, index) => (
					<li key={nanoid()}>
						<Button className={elem} label={elem} dataIndex={index} onClick={() => handleButtonClick(event)} />
					</li>
				))}
			</ul>
		</>
	)
}

export default StitchClicker
