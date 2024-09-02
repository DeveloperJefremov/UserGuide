import { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

const GuideSetHeader = ({
	title,
	onToggleContent,
	isContentVisible,
	onCreateSet,
	onLaunchSet,
}) => {
	return (
		<div className={styles.guideSetHeader}>
			<h2>{title}</h2>
			<div className={styles.buttonContainer}>
				{onCreateSet && (
					<Button onClick={onCreateSet} variant='lightGrey' size='lg'>
						Add: Tutorial
					</Button>
				)}
				{onLaunchSet && (
					<Button onClick={onLaunchSet} variant='default' size='lg'>
						Launch Set
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

export default function GuideSet({
	data = [],
	title,
	onCreateSet,
	onLaunchSet,
}) {
	const [isContentVisible, setIsContentVisible] = useState(false);

	const toggleContentVisibility = () => {
		setIsContentVisible(prevState => !prevState);
	};

	if (!data && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				title={data && data[0] ? data[0].setHeader : title}
				onToggleContent={!onCreateSet && toggleContentVisibility}
				isContentVisible={isContentVisible}
				onCreateSet={onCreateSet}
				onLaunchSet={onLaunchSet}
			/>

			{isContentVisible && (
				<GuideSetBody>
					<GuideStepsList data={data} key={data.id} />
				</GuideSetBody>
			)}

			{isContentVisible && data && (
				<GuideSetFooter content={data[0] ? data[0].setFooter : ''} />
			)}
		</div>
	);
}
