import { useState } from 'react';
import mockData, { MockGuideSets } from '../../data/MockData';
import Button from '../Button/Button';
import GuideSet from '../GuideSet/GuideSet';
import GuideSetHeaderForm from '../GuideSet/GuideSetHeaderForm';
import Modal from '../UI/Modal';
import styles from './GuideSetsList.module.css';

export default function GuideSetsList() {
	const [guideSetsList, setGuideSetsList] = useState(MockGuideSets);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newSetTitle, setNewSetTitle] = useState('');
	const [mode, setMode] = useState('display');
	const [currentSetId, setCurrentSetId] = useState(null);
	const [activeGuideSetId, setActiveGuideSetId] = useState(null);
	const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

	const handleCreateSet = () => {
		setNewSetTitle('');
		setMode('create');
		setIsModalOpen(true);
	};

	const handleLaunchSet = setId => {
		setIsGuideModalOpen(true);
		setActiveGuideSetId(setId);
		setMode('execute');
		console.log('Launching set:', { mode });
	};

	const handleEditSet = id => {
		const selectedSet = guideSetsList.find(set => set.id === id);
		setNewSetTitle(selectedSet.setHeader); // Заполняем заголовок выбранного набора
		setCurrentSetId(id); // Запоминаем ID текущего набора
		setMode('edit');
		setIsModalOpen(true);
	};

	const handleDeleteSet = id => {
		const updatedGuideSetsList = guideSetsList.filter(
			guideSet => guideSet.id !== id
		);
		setGuideSetsList(updatedGuideSetsList);
	};

	const handleSaveNewSet = () => {
		if (newSetTitle.trim() === '') {
			alert('Title cannot be empty');
			return;
		}

		if (mode === 'create') {
			// Создаем новый набор
			const newSet = {
				id: guideSetsList.length + 1,
				setHeader: newSetTitle,
				setFooter: 'Footer for the new set',
				setBody: [], // Пустой body для нового набора
			};
			setGuideSetsList([...guideSetsList, newSet]);
		} else if (mode === 'edit') {
			// Обновляем существующий набор
			const updatedGuideSetsList = guideSetsList.map(guideSet => {
				if (guideSet.id === currentSetId) {
					return {
						...guideSet,
						setHeader: newSetTitle,
					};
				}
				return guideSet;
			});
			setGuideSetsList(updatedGuideSetsList);
		}

		setIsModalOpen(false);
		setNewSetTitle('');
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setNewSetTitle('');
	};

	return (
		<div className={styles.guideSetsList}>
			<header className={styles.guideSetsList__header}>
				<section className={styles.guideSetsList__createSection}>
					<h2>Create New Set</h2>
					<Button onClick={handleCreateSet} variant='lightGrey' size='lg'>
						Add: Tutorial
					</Button>

					{isModalOpen && (
						<Modal onClick={handleCancel}>
							<GuideSetHeaderForm
								mode={mode}
								title={newSetTitle}
								onTitleChange={setNewSetTitle}
								onSave={handleSaveNewSet}
								onCancel={handleCancel}
							/>
						</Modal>
					)}
				</section>

				<h2>Guide Sets List:</h2>
			</header>

			<ul>
				{guideSetsList.map((guideSet, index) => (
					<li className={styles.fontList} key={guideSet.id}>
						<article key={guideSet.id || `set-${index}`}>
							<GuideSet
								handleEditSet={() => handleEditSet(guideSet.id)}
								handleDeleteSet={() => handleDeleteSet(guideSet.id)}
								mode={mode}
								isGuideModalOpen={isGuideModalOpen}
								onModeChange={newMode => setMode(newMode)}
								onLaunchSet={() => handleLaunchSet(guideSet.id)}
								activeGuideSetId={activeGuideSetId}
								setGuideSetsList={setGuideSetsList}
								guideSet={guideSet}
							/>
						</article>
					</li>
				))}
			</ul>
		</div>
	);
}
