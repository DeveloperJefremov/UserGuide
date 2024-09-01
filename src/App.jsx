import styles from './App.module.css';
import FirstSideBar from './components/Layout/FirstSideBar';
import SecondSideBar from './components/Layout/SecondSideBar';
import MainContent from './components/MainContent/MainContent';
import MainContentBody from './components/layout/MainContentBody';

function App() {
	return (
		<div className={styles.App}>
			<FirstSideBar />
			<SecondSideBar />
			<MainContent />
			{/* <MainContentBody /> */}
		</div>
	);
}

export default App;
