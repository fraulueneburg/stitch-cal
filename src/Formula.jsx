import Button from './Button'
import { useState, useEffect } from 'react'

const Formula = () => {
	const [isKnitInRound, setIsKnitInRound] = useState(true)

	const [numStart, setNumStart] = useState(24)
	const [numTarget, setnumTarget] = useState(20)
	const [numDiff, setNumDiff] = useState(numStart - numTarget)

	const handleChange = (event) => {
		const { id, value } = event.target

		if (id === 'stsStart') {
			setNumStart(value)
		} else if (id === 'stsDiff') {
			setNumDiff(value)
		} else if (id === 'stsEnd') {
			setnumTarget(value)
		}
	}

	useEffect(() => {
		setnumTarget(numStart - numDiff)
	}, [numStart, numDiff])

	useEffect(() => {
		setNumDiff(numStart - numTarget)
	}, [numTarget])

	const calculateDecreases = (numStart, numTarget) => {
		if (numStart === numTarget) {
			return `Your starting and target number are the same. No decreases possible. Please try a higher starting or lower target number.`
		} else if (numStart < numTarget) {
			return `You are trying to increase. Please switch to our increase calculator and try again.`
		} else if (numStart && numStart / 2 > numTarget) {
			return `
                You can not decrease more than 50% of stitches.
                Enter at least ${Math.floor(numStart / 2)} as your target number
                or increase the number of starting stitches.
            `
		}

		const numDecreases = numStart - numTarget
		const numSts = numTarget - numDecreases

		const numSpacesFlat = numDecreases + 1
		const stsPerSpaceFlat = Math.floor(numSts / numSpacesFlat)
		const leftoverStsFlat = numSts % numSpacesFlat

		const numSpacesRound = numDecreases
		const stsPerSpaceRound = Math.floor(numSts / numSpacesRound)
		const leftoverStsRound = numSts % numSpacesRound

		let arrFlat = [],
			arrRound = []

		const instructions = `from ${numStart} to ${numTarget} sts
            👉 removing ${numDecreases} sts
            👉 result consists of ${numSts} sts + ${numDecreases} k2togs
            
            WHEN KNITTING FLAT:
            So we’re dividing ${numSts} into ${numSpacesFlat} parts
            👉 ${numSts}/${numSpacesFlat} = ${numSts / numSpacesFlat} => that’s ${stsPerSpaceFlat} sts per space
            👉 and there’s ${numSts}%${numSpacesFlat} = ${leftoverStsFlat} leftover stitches.
            
            1) creating an array of ${numSts}-${leftoverStsFlat} = ${numSts - leftoverStsFlat} stitches
            2) inserting k2togs every ${stsPerSpaceFlat} stitches, ${numDecreases} times total
            3) adding ${leftoverStsFlat} leftover stitch
            
            
            WHEN KNITTING IN THE ROUND:
            We’re dividing ${numSts} into only ${numSpacesRound} parts
            👉 ${numSts}/${numDecreases} = ${numSts / numDecreases} => that’s ${stsPerSpaceRound} sts per space
            👉 and there’s ${numSts}%${numSpacesRound} = ${leftoverStsRound} leftover stitches.
        `

		const fillArray = (arr, leftoverSts, stsPerSpace, isKnitInRound) => {
			// create array of stitches
			arr = new Array(numSts - leftoverSts).fill('k1')

			// distribute decreases evenly
			for (let i = numDecreases; i > 0; i--) {
				arr.splice(stsPerSpace * i, 0, '2️⃣')
			}

			// IF ROUND: chopping of the extra sts left and right of the arr
			// and distributing them again?
			if (isKnitInRound) {
				const halfSpaceSize = Math.floor(stsPerSpace / 2)
				const halfSpace = arr.splice(0, halfSpaceSize)
				halfSpace.forEach((e) => arr.push(e))
			}

			// distribute leftover sts, starting in the middle
			// TO DO: DISTRIBUTE MORE EVENLY
			if (leftoverSts) {
				for (let i = 0; i < leftoverSts; i++) {
					const arrMiddle = Math.floor(arr.length / 2)
					arr.splice(arrMiddle, 0, '👻')
				}
			}

			return arr
		}

		const resultFlat = fillArray(arrFlat, leftoverStsFlat, stsPerSpaceFlat, false)
		const resultRound = fillArray(arrRound, leftoverStsRound, stsPerSpaceRound, true)

		const result = `-----
            RESULT:
            Decreasing from ${numStart} to ${numTarget} sts
            
            knit flat
            ${resultFlat}
            ${resultFlat.length}
            
            knit round
            ${resultRound}
            ${resultRound.length}`

		return `${instructions}
                ${result}`
	}

	return (
		<>
			<h1>Formula</h1>
			<div className="row">
				<div>
					<form style={{ textAlign: 'right' }}>
						<h2>Decreasing</h2>
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
							<label htmlFor="stsDiff">decreasing by</label>
							<big> – </big>
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
								value={numTarget}
								onChange={() => handleChange(event)}
								disabled={numStart < 3}
							/>
							<span>stitches</span>
						</div>
						<div>
							<label htmlFor="optionKnitRound">
								<input
									type="checkbox"
									id="optionKnitRound"
									name="checkKnitRound"
									value="is knit round?"
									checked={isKnitInRound}
									onChange={() => setIsKnitInRound((prev) => !prev)}
								/>
								knit round
							</label>
						</div>
					</form>
				</div>
				<div className="note">{calculateDecreases(numStart, numTarget)}</div>
			</div>
		</>
	)
}

export default Formula
