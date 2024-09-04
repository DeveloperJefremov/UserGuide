import { useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
// import Modal from '../UI/Modal';

export default function GuideStepsList({ data, setGuideSetsList }) {
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		elementId: '',
		imgChecked: false,
		imgWidth: 0,
		imgHeight: 0,
		imageUrl: '',
	});
	const [steps, setSteps] = useState(data || []);

	const handleCreateStep = () => {
		// setIsModalOpen(true);
	};

	const handleSave = () => {
		// Создаем новый шаг
		const newStep = { ...formData, mode: 'folded' };

		// Обновляем шаги, добавляя новый шаг в существующий setBody
		let updatedSteps;
		if (steps.length === 0) {
			updatedSteps = [
				{
					setHeader: 'New Set', // Можно задать значение по умолчанию или использовать другой подход
					setBody: [newStep],
				},
			];
		} else {
			updatedSteps = steps.map((set, index) => {
				if (index === steps.length - 1) {
					return {
						...set,
						setBody: [...(set.setBody || []), newStep],
					};
				}
				return set;
			});
		}

		// Обновляем состояние шагов
		setSteps(updatedSteps);
		// setIsModalOpen(false); // Закрываем модальное окно после сохранения

		// Сбрасываем форму после сохранения
		setFormData({
			title: '',
			description: '',
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		});
	};

	// const handleCancel = () => {
	// 	setIsModalOpen(false); // Закрываем модальное окно при отмене
	// }

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем данные формы
	};

	return (
		<div>
			{/* Кнопка и модальное окно для создания нового шага */}
			<div>
				<h2>Create New Lesson</h2>
				<Button size='large' variant='lightGrey' onClick={handleCreateStep}>
					Add: Lesson
				</Button>
				{/* {isModalOpen && (
					<Modal onClick={handleCancel}> */}
				<h2>Create New Lesson</h2>
				<GuideStepForm
					formData={formData}
					// isEditMode={true}
					onChange={handleFormChange}
					// onSave={handleSave}
					// onCancel={handleCancel}
				/>
				{/* </Modal> */}
			</div>

			<ul>
				<h2>Guide Steps List:</h2>
				{steps.map((set, index) => (
					<li key={set.setHeader || `set-${index}`}>
						<div>
							{set.setBody &&
								set.setBody.map((step, idx) => (
									<GuideStep
										key={`${set.setHeader}-${idx}`}
										{...step}
										mode='folded'
									/>
								))}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
