set.setBody.map((step, stepIndex) => (						
	<GuideStep
		currentStepIndex={currentStepIndex}
		setCurrentStepIndex={setCurrentStepIndex}
		setListMode={setListMode}
		totalSteps={totalSteps} // Передаем totalSteps в компонент GuideStep
		key={`${set.setHeader}-${stepIndex}`}
		data={step}
		mode='folded'
		handleEditStep={() => handleEditStep(setIndex, stepIndex)} // Привязываем обработчик редактирования к кнопке
		handleDeleteStep={() =>
			handleDeleteStep(setIndex, stepIndex)
		} // Привязываем обработчик удаления к кнопке
	/>
))




*if(setListMode === 'execute'){
	set.setBody.filter(step, stepIndex) => {
		
	}
}else {

(
{




	return (
								<div key={set.setHeader || `set-${setIndex}`}>
									<div>{
										 if (setListMode === 'execute'){
										 
										 set.setBody.filter((step, stepIndex) => stepIndex === activeStepId) => (
											 	<GuideStep>
										 )
									 } else {
										 {set.setBody && set.setBody.map((step, stepIndex) => (
											 	<GuideStep
				currentStepIndex={currentStepIndex}
				setCurrentStepIndex={setCurrentStepIndex}
				setListMode={setListMode}
				totalSteps={totalSteps} // Передаем totalSteps в компонент GuideStep
				key={`${set.setHeader}-${stepIndex}`}
				data={step}
				mode='folded'
				handleEditStep={() => handleEditStep(setIndex, stepIndex)} // Привязываем обработчик редактирования к кнопке
				handleDeleteStep={() =>
					handleDeleteStep(setIndex, stepIndex)
				} // Привязываем обработчик удаления к кнопке
			/>
										 ))}
									 }
									
									
									}</div>
								</div>
							);
						})}
					</ul>
				</div>
			);
		}