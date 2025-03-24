import { useState, useEffect } from 'react'
import Button from './Button'
import { nanoid } from 'nanoid'

function StitchPlayer() {
	const [numStartSts, setNumStartSts] = useState(0)
	const [numDecSts, setNumDecSts] = useState(0)

	const [stsLength, setStsLength] = useState(0)
	const [decLength, setDecLength] = useState(0)
	const [resultArr, setResultArr] = useState([])

	const handleChangeStartSts = (event) => {
		const newNumStart = +event.target.value

		if (newNumStart >= numDecSts / 2) {
			console.log(`newNumStart >= numDecSts / 2`, `${newNumStart}`, numDecSts / 2)
			setStsLength(newNumStart - numDecSts * 2)
			setNumStartSts(newNumStart)
		}
	}

	const handleChangeDec = (event) => {
		const newNumDec = +event.target.value
		setStsLength(numStartSts - newNumDec * 2)
		setDecLength(newNumDec)

		setNumDecSts(newNumDec)
	}

	useEffect(() => {
		const arrSts = new Array(stsLength).fill('k1')
		const arrDecs = new Array(decLength).fill('k2tog')

		if (stsLength % 2 == 0) {
			const part1 = arrSts.slice(0, stsLength / 2)
			const part2 = arrSts.slice(stsLength / 2, stsLength)

			setResultArr(part1.concat(arrDecs, part2))
		} else {
			setResultArr(arrSts.concat(arrDecs))
		}
	}, [stsLength, decLength])

	return (
		<>
			<div>
				<h1>Stitch Player</h1>
				<fieldset className="form-stitch-player">
					<div className="form-elem">
						<label>stitches</label>
						<input
							type="number"
							min="0"
							max="100"
							placeholder="0"
							value={numStartSts}
							onChange={() => handleChangeStartSts(event)}
						/>
					</div>
					<div className="form-elem">
						<label>decrease by</label>
						<input
							type="number"
							min="0"
							max={Math.floor(numStartSts / 2)}
							placeholder="0"
							value={numDecSts}
							onChange={() => handleChangeDec(event)}
						/>
					</div>
					<div className="form-elem">
						<label>sum</label>
						<input type="number" min="0" max="1000" placeholder="0" value={numStartSts - numDecSts} disabled />
					</div>
				</fieldset>
			</div>
			<ul className="unstyled horizontal">
				{resultArr.map((elem) => (
					<li key={nanoid()}>
						<Button className={elem} label={elem} />
					</li>
				))}
			</ul>
		</>
	)
}

export default StitchPlayer
