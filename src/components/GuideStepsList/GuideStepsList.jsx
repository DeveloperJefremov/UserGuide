import GuideStep from '../GuideStep/GuideStep';

export default function GuideStepsList({ data }) {
	if (!data || data.length === 0) {
		// Если данные отсутствуют или пусты, вернуть сообщение
		return <p>Lesson list empty</p>;
	}

	const handleCreateStep = () => {
		setIsModalOpen(true);
	};

	return (
		<div>
			{/* Компонент для создания нового шага */}
			<GuideStep
				title='Create New Step'
				mode='create'
				handleCreateStep={handleCreateStep}
			/>

			<ul>
				<h2>Guide Steps List:</h2>
				{/* Отображение существующих шагов */}
				{data.map((set, index) => (
					<li key={set.setHeader || `set-${index}`}>
						<div>
							{set.setBody &&
								set.setBody.map((step, idx) => (
									<GuideStep
										key={`${set.setHeader}-${idx}`}
										{...step}
										mode='folded'
									/>
								))}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
