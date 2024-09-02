import { useState } from 'react';
import mockData from '../../data/MockData';
import GuideSet from '../GuideSet/GuideSet';

export default function GuideSetsList() {
	const [guideSetsList, setGuideSetsList] = useState(mockData);

	const handleCreateSet = () => {
		// Ваш код для создания нового набора
		alert('Create Set button clicked');
	};

	return (
		<div>
			<h2>Guide Sets List:</h2>

			<GuideSet title='Create New Set' onCreateSet={handleCreateSet} />

			<ul>
				{guideSetsList.map(guideSet => (
					<li key={guideSet.id}>
						<GuideSet data={guideSet.data} />
					</li>
				))}
			</ul>
		</div>
	);
}
