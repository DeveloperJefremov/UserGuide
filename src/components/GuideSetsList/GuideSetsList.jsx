import { useState } from 'react';
import mockData from '../../data/MockData';
import Button from '../Button/Button';
import GuideSet from '../GuideSet/GuideSet';
import GuideSetHeaderForm from '../GuideSet/GuideSetHeaderForm';
import Modal from '../UI/Modal';

export default function GuideSetsList() {
	const [guideSetsList, setGuideSetsList] = useState(mockData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newSetTitle, setNewSetTitle] = useState('');
	const [mode, setMode] = useState('display');
	const [currentSetId, setCurrentSetId] = useState(null);
	// const [targetElementId, setTargetElementId] = useState('');

	const handleCreateSet = () => {
		setNewSetTitle('');
		setMode('create');
		setIsModalOpen(true);
	};

	const handleLaunchSet = () => {
		setMode('execute');
		console.log('Launching set:', { mode });
	};

	const handleEditSet = id => {
		const selectedSet = guideSetsList.find(set => set.id === id);
		setNewSetTitle(selectedSet.data[0].setHeader); // Заполняем заголовок выбранного набора
		setCurrentSetId(id); // Запоминаем ID текущего набора
		setMode('edit');
		setIsModalOpen(true);
	};

	const handleDeleteSet = id => {
		const updatedGuideSetsList = guideSetsList.filter(
			guideSet => guideSet.id !== id
		);
		setGuideSetsList(updatedGuideSetsList); // Обновляем список, исключая удалённый набор
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
				data: [
					{
						setHeader: newSetTitle,
						setFooter: 'Footer for the new set',
					},
				],
			};
			setGuideSetsList([...guideSetsList, newSet]);
		} else if (mode === 'edit') {
			// Обновляем существующий набор
			const updatedGuideSetsList = guideSetsList.map(guideSet => {
				if (guideSet.id === currentSetId) {
					return {
						...guideSet,
						data: [{ ...guideSet.data[0], setHeader: newSetTitle }],
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
		setIsModalOpen(false); // Закрываем окно
		setNewSetTitle(''); // Очищаем заголовок
	};

	// const handleLaunchSet = id => {
	// 	const element = document.getElementById(id); // Получаем элемент по id
	// 	if (element) {
	// 		const rect = element.getBoundingClientRect();
	// 		setPosition({
	// 			top: `${rect.top + window.scrollY}px`,
	// 			left: `${rect.right + window.scrollX + 30}px`, // Отступ вправо на 30px
	// 		});
	// 		setTargetElementId(id);
	// 		setShowModal(true); // Показать модальное окно
	// 		console.log('position', position);
	// 	}
	// };

	return (
		<div>
			<h2>Create New Set</h2>
			<Button onClick={handleCreateSet} variant='lightGrey' size='lg'>
				Add: Tutorial
			</Button>

			{/* Модальное окно с формой */}
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

			<h2>Guide Sets List:</h2>
			<ul>
				{guideSetsList.map((guideSet, index) => (
					<li key={guideSet.id}>
						<div key={guideSet.data[0]?.setHeader || `set-${index}`}>
							<GuideSet
								handleEditSet={() => handleEditSet(guideSet.id)} // Передаем ID для редактирования
								handleDeleteSet={() => handleDeleteSet(guideSet.id)} // Передаем ID для удаления
								mode={mode}
								//FIXME: Need finish handler
								onModeChange={newMode => setMode(newMode)}
								onLaunchSet={handleLaunchSet}
								setGuideSetsList={setGuideSetsList}
								guideSet={guideSet}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
