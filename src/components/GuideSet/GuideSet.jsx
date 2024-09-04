import { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

export default function GuideSet({
	data = [],
	title,
	handleSetChange,
	onCreateSet,
	onLaunchSet,

	handleEditSet,
	handleDeleteSet,
}) {
	const [isContentVisible, setIsContentVisible] = useState(false);

	const toggleContentVisibility = () => {
		setIsContentVisible(prevState => !prevState);
	};

	if (!data && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={data && data[0] ? data[0].setHeader : title}
				onToggleContent={!onCreateSet && toggleContentVisibility}
				isContentVisible={isContentVisible}
				onClick={handleSetChange}
				onLaunchSet={onLaunchSet}
			/>

			{isContentVisible && (
				<GuideSetBody>
					{/* <GuideStepsList
						data={data}
						key={data.id}
						setGuideSetsList={setGuideSetsList}
					/> */}
				</GuideSetBody>
			)}

			{isContentVisible && data && (
				<GuideSetFooter content={data[0] ? data[0].setFooter : ''} />
			)}
		</div>
	);
}

const GuideSetHeader = ({
	handleDeleteSet,
	handleEditSet,
	title,
	handleSetChange,
	onToggleContent,
	isContentVisible,

	onLaunchSet,
}) => {
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
				{onToggleContent && (
					<Button size='icon' onClick={onToggleContent}>
						{isContentVisible ? '-' : '+'}
					</Button>
				)}
			</div>
		</div>
	);
};

const GuideSetBody = ({ children }) => {
	return <div className={styles.mainContentBody}>{children}</div>;
};

const GuideSetFooter = ({ content }) => {
	if (!content) return null;
	return (
		<div className={styles.guideSetFooter}>
			<p>{content}</p>
		</div>
	);
};
