import { useState } from 'react';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

import GuideStep from '../GuideStep/GuideStep';
const GuideSetHeader = ({ setTitle, onToggleContent, isContentVisible }) => {
	return (
		<div className={styles.guideSetHeader}>
			<h2>{setTitle}</h2>
			<div className={styles.buttonContainer}>
				<button className={styles.createStepButton}>Create Step</button>
				<button className={styles.launchButton}>Launch Set</button>
				<button className={styles.toggleButton} onClick={onToggleContent}>
					{isContentVisible ? '-' : '+'}
				</button>
			</div>
		</div>
	);
};

const GuideSetBody = ({ children }) => {
	return <div className={styles.mainContentBody}>{children} </div>;
};

const GuideSetFooter = ({ content }) => {
	if (!content) return null;
	return (
		<div className={styles.guideSetFooter}>
			<p>{content}</p>
		</div>
	);
};

export default function GuideSet({ data }) {
	const [isContentVisible, setIsContentVisible] = useState(false);
	const [setCase, setSetCase] = useState('');

	const toggleContentVisibility = () => {
		setIsContentVisible(prevState => !prevState);
	};

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				setTitle={data[0].setHeader}
				onToggleContent={toggleContentVisibility}
				isContentVisible={isContentVisible}
			/>

			{isContentVisible && (
				<GuideSetBody>
					<GuideStepsList data={data} key={data.id} />
				</GuideSetBody>
			)}

			{isContentVisible && <GuideSetFooter content={data[0].setFooter} />}
		</div>
	);
}
