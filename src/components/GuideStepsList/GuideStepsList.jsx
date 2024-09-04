import { useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
import Modal from '../UI/Modal';

export default function GuideStepsList({
	data,
	guideSetsList,
	setGuideSetsList,
}) {
	const [steps, setSteps] = useState(data || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreatingStep, setIsCreatingStep] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		elementId: '',
		imgChecked: false,
		imgWidth: 0,
		imgHeight: 0,
		imageUrl: '',
	});
	const [stepMode, setStepMode] = useState('folded');

	const handleCreateStep = () => {
		setIsCreatingStep(true);
	};

	const handleEditStep = id => {
		const selectedStep = guideSetsList.find();
	};

	const handleSave = () => {
		// Создаем новый шаг
		const newStep = { ...formData, mode: 'folded' };
		let updatedSteps;

		if (steps.length === 0) {
			updatedSteps = [
				{
					setHeader: 'New Set',
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

		setSteps(updatedSteps);
		setIsCreatingStep(false);

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

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем данные формы
	};

	return (
		<div>
			<div>
				<h2>Create New Lesson</h2>
				<Button size='large' variant='lightGrey' onClick={handleCreateStep}>
					Add: Lesson
				</Button>
				{isCreatingStep && (
					<GuideStepForm
						formData={formData}
						onChange={handleFormChange}
						onSave={handleSave}
					/>
				)}
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
