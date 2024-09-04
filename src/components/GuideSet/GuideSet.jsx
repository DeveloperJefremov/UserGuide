import { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

export default function GuideSet({
	setListMode: initialSetMode, // Начальное состояние: 'folded' или 'expanded'
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
	const [setMode, setSetMode] = useState(initialSetMode);

	// Логика переключения режима отображения
	const toggleSetMode = () => {
		setSetMode(prevMode => (prevMode === 'folded' ? 'expanded' : 'folded'));
	};

	if (!data && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				setMode={setMode} // Передаем текущее состояние в Header
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={data && data[0] ? data[0].setHeader : title}
				onToggleContent={toggleSetMode} // Добавляем логику переключения
				onLaunchSet={onLaunchSet}
			/>

			{/* Отображаем GuideSetBody и GuideSetFooter только в режиме expanded */}
			{setMode === 'expanded' && (
				<GuideSetBody setMode={setMode}>
					<GuideStepsList
						data={data}
						key={data.id}
						setGuideSetsList={setGuideSetsList}
						guideSetsList={guideSetsList}
					/>
				</GuideSetBody>
			)}

			{setMode === 'expanded' && (
				<GuideSetFooter content={data[0] ? data[0].setFooter : ''} />
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
	onLaunchSet,
}) => {
	// Определяем текст для кнопки в зависимости от состояния setMode
	let displayButtonText = setMode === 'folded' ? '+' : '-';

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

				{onLaunchSet && (
					<Button onClick={onLaunchSet} variant='default' size='lg'>
						Launch: Lesson
					</Button>
				)}

				{/* Кнопка для переключения свёрнутого/развернутого состояния */}
				<Button size='icon' variant='default' onClick={onToggleContent}>
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

const GuideSetFooter = ({ content, setMode }) => {
	const cssClassList = `${styles.stepFooter} ${
		setMode === 'expanded' || setMode === 'edit' ? styles.expanded : ''
	} ${setMode === 'folded' ? styles.folded : ''}`;
	if (!content) return null;
	return (
		<div className={cssClassList}>
			<p>{content}</p>
		</div>
	);
};
