import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

export default function GuideSet({
	isGuideModalOpen,
	onModeChange,
	mode, // Начальное состояние: 'folded' или 'expanded'
	// setData = [],
	title,
	// handleSetChange,
	// onCreateSet,
	activeGuideSetId,
	onLaunchSet,
	guideSet,
	// setGuideSetsList,
	handleEditSet,
	handleDeleteSet,
}) {
	// console.log(guideSet);
	// Устанавливаем режим (свёрнутый или развернутый)
	// const [setMode, setSetMode] = useState(setListMode);
	const [isShownSet, setIsShownSet] = useState(false);

	// Логика переключения режима отображения
	// const toggleSetMode = () => {
	// 	onModeChange(prevMode =>
	// 		prevMode === 'folded' || setMode === 'create' ? 'expanded' : 'folded'
	// 	);
	// };

	// const totalSteps = data ? data.length : 0;
	// useEffect(() => {
	// 	console.log('guideSet', guideSet);
	// }, [guideSet]);

	if (!guideSet && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				isShownSet={isShownSet} // Передаем текущее состояние в Header
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={guideSet.setHeader}
				//TODO
				onToggleContent={() => setIsShownSet(prev => !prev)} // Добавляем логику переключения
			/>

			{/* Отображаем GuideSetBody и GuideSetFooter только в режиме expanded */}
			{isShownSet && (
				<GuideSetBody isShownSet={isShownSet}>
					<GuideStepsList
						isGuideModalOpen={isGuideModalOpen}
						guideSetId={guideSet.id}
						activeGuideSetId={activeGuideSetId}
						mode={mode}
						onModeChange={onModeChange}
						// totalSteps={totalSteps}
						// stepsData={setData}
						key={guideSet.id}
						// setGuideSetsList={setGuideSetsList}
						steps={guideSet.setBody}
					/>
				</GuideSetBody>
			)}

			{isShownSet && (
				<GuideSetFooter
					footerText={guideSet.setFooter}
					onLaunchSet={onLaunchSet}
					setMode={isShownSet}
				/>
			)}
		</div>
	);
}

const GuideSetHeader = ({
	isShownSet,
	handleDeleteSet,
	handleEditSet,
	title,
	onToggleContent,
}) => {
	// Определяем текст для кнопки в зависимости от состояния setMode
	console.log(isShownSet);
	let displayButtonText = !isShownSet ? '+' : '-';

	return (
		<div className={styles.guideSetHeader}>
			<h2>{title}</h2>
			<div className={styles.buttonContainer}>
				<Button onClick={handleEditSet} variant='lightGrey' size='lg'>
					Edit: Tutorial
				</Button>
				<Button onClick={handleDeleteSet} variant='danger' size='lg'>
					Delete: Tutorial
				</Button>

				{/* Кнопка для переключения свёрнутого/развернутого состояния */}
				<Button size='icon' variant='lightGrey' onClick={onToggleContent}>
					{displayButtonText}
				</Button>
			</div>
		</div>
	);
};

const GuideSetBody = ({ children, isShownSet }) => {
	// Применяем CSS классы в зависимости от состояния setMode
	let cssClassList = `${styles.setBody} ${
		isShownSet ? styles.expanded : styles.folded
	}`;

	return <div className={cssClassList}>{children}</div>;
};

const GuideSetFooter = ({ footerText, onLaunchSet, isShownSet }) => {
	const cssClassList = `${styles.stepFooter} ${
		isShownSet ? styles.expanded : ''
	} ${!isShownSet ? styles.folded : ''}`;
	return (
		<div className={cssClassList}>
			{footerText && <p>{footerText}</p>}
			{onLaunchSet && (
				<Button onClick={onLaunchSet} variant='default' size='lg'>
					Launch: Tutorial
				</Button>
			)}
		</div>
	);
};
