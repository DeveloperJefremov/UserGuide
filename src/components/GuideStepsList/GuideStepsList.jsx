import GuideStep from '../GuideStep/GuideStep';

export default function GuideStepsList({ data, setCase }) {
	// console.log(data);

	return (
		<div>
			<h2>Guide Steps List:</h2>
			{
				<ul>
					<li>
						<GuideStep key='0' title='createNewStep' />
					</li>
					{data.map(set => (
						<li key={set.setHeader}>
							<div>
								{set.setBody.map((step, index) => (
									<GuideStep key={index} {...step} />
								))}
							</div>
						</li>
					))}
				</ul>
			}
		</div>
	);
}
