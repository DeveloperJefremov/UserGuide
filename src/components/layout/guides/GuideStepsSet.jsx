import { useState } from 'react';
import GuideStep from './GuideStep';
import styles from './GuideStepsSet.module.css';

const GuideStepsSetHeader = ({
	setTitle,
	onToggleContent,
	isContentVisible,
}) => {
	return (
		<div className={styles.heading}>
			<h2>{setTitle}</h2>
			<div className={styles.buttonContainer}>
				<button className={styles.launchButton}>Launch</button>
				<button className={styles.toggleButton} onClick={onToggleContent}>
					{isContentVisible ? '-' : '+'}
				</button>
			</div>
		</div>
	);
};

const GuideStepsSetFooter = ({ content }) => {
	if (!content) return null;
	return (
		<div className={styles.userGuideFooter}>
			<p>{content}</p>
		</div>
	);
};

const GuideStepSet = ({ guideStep, steps, onEditStep, onDeleteStep, mode }) => {
	const [isContentVisible, setIsContentVisible] = useState(true);
	const [setMode, setSetMode] = useState('display'); // Режим по умолчанию

	const toggleContentVisibility = () => {
		setIsContentVisible(prevState => !prevState);
	};

	return (
		<div className={styles.guideStepSet}>
			<div className={styles.stepsContainer}>
				<GuideStepsSetHeader
					setTitle={guideStep.setTitle}
					onToggleContent={toggleContentVisibility}
					isContentVisible={isContentVisible}
				/>
				{isContentVisible && (
					<div>
						{setMode === 'create' ? (
							<GuideStep
								mode='create'
								stepData={{}} // Передаем пустой объект для создания нового шага
								onEditStep={onEditStep}
								onDelete={onDeleteStep}
							/>
						) : (
							steps.length > 0 && (
								<div className={styles.stepsContainer}>
									{steps.map(step => (
										<GuideStep
											key={step.id}
											stepData={step}
											onEditStep={onEditStep}
											onDelete={onDeleteStep}
											mode={mode} // Передаем текущий режим в GuideStep
										/>
									))}
								</div>
							)
						)}
					</div>
				)}
				<GuideStepsSetFooter content={guideStep.setFooter} />
			</div>
		</div>
	);
};

export default GuideStepSet;
