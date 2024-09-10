import GuideSetsList from '../GuideSetsList/GuideSetsList';
import styles from './MainContent.module.css';

const MainContentHeader = ({ title, description }) => {
	return (
		<header className={styles.mainContentHeader}>
			<h1>{title}</h1>
			<p>{description}</p>
			<button type='button' className={styles.loginButton}>
				Login as admin
			</button>
		</header>
	);
};

const MainContentFooter = ({ info }) => {
	return (
		<footer className={styles.mainContentFooter}>
			<small>{info}</small>
		</footer>
	);
};

const MainContentBody = ({ children }) => {
	return <main className={styles.mainContentBody}>{children}</main>;
};

export default function MainContent() {
	return (
		<section className={styles.mainContent}>
			<MainContentHeader
				title='User Guide'
				description='User guides are a type of technical documentation that enables customers and end-users with step-by-step instructions on how to execute a task or process.'
			/>

			<MainContentBody>
				<GuideSetsList />
			</MainContentBody>

			<MainContentFooter info='2024 Your Company. All rights reserved.' />
		</section>
	);
}
