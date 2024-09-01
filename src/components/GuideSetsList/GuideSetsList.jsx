import { useState } from 'react';
import mockData from '../../data/MockData';
import GuideSet from '../GuideSet/GuideSet';

export default function GuideSetsList() {
	const [guideSetsList, setGuideSetsList] = useState(mockData);
	// console.log(mockData);

	return (
		<div>
			<h2>Guide Sets List:</h2>
			{guideSetsList.map(guideSet => (
				<GuideSet data={guideSet.data} key={guideSet.id} />
			))}
		</div>
	);
}
