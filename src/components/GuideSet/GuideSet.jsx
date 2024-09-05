import { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

export default function GuideSet({
	setListMode, // Начальное состояние: 'folded' или 'expanded'
	data = [],
	title,
	handleSetChange,
	onCreateSet,
	onLaunchSet,
	guideSetsList,
	setGuideSetsList,
	handleEditSet,
	handleDeleteSet,
}) {
	// Устанавливаем режим (свёрнутый или развернутый)
	const [setMode, setSetMode] = useState(setListMode);

	// Логика переключения режима отображения
	const toggleSetMode = () => {
		setSetMode(prevMode =>
			prevMode === 'folded' || setMode === 'create' ? 'expanded' : 'folded'
		);
	};

	// const totalSteps = data ? data.length : 0;

	if (!data && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				setMode={setMode} // Передаем текущее состояние в Header
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={data && data[0] ? data[0].setHeader : title}
				onToggleContent={toggleSetMode} // Добавляем логику переключения
			/>

			{/* Отображаем GuideSetBody и GuideSetFooter только в режиме expanded */}
			{setMode === 'expanded' && (
				<GuideSetBody setMode={setMode}>
					<GuideStepsList
						setListMode={setListMode}
						// totalSteps={totalSteps}
						data={data}
						key={data.id}
						setGuideSetsList={setGuideSetsList}
						guideSetsList={guideSetsList}
					/>
				</GuideSetBody>
			)}

			{setMode === 'expanded' && (
				<GuideSetFooter onLaunchSet={onLaunchSet} setMode={setMode} />
			)}
		</div>
	);
}

const GuideSetHeader = ({
	setMode,
	handleDeleteSet,
	handleEditSet,
	title,
	onToggleContent,
}) => {
	// Определяем текст для кнопки в зависимости от состояния setMode
	console.log(setMode);
	let displayButtonText =
		setMode === 'folded' || setMode === 'create' ? '+' : '-';

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

const GuideSetBody = ({ children, setMode }) => {
	// Применяем CSS классы в зависимости от состояния setMode
	let cssClassList = `${styles.setBody} ${
		setMode === 'expanded' ? styles.expanded : styles.folded
	}`;

	return <div className={cssClassList}>{children}</div>;
};

const GuideSetFooter = ({ onLaunchSet, setMode }) => {
	const cssClassList = `${styles.stepFooter} ${
		setMode === 'expanded' || setMode === 'edit' ? styles.expanded : ''
	} ${setMode === 'folded' ? styles.folded : ''}`;
	return (
		<div className={cssClassList}>
			{onLaunchSet && (
				<Button onClick={onLaunchSet} variant='default' size='lg'>
					Launch: Lesson
				</Button>
			)}
		</div>
	);
};
