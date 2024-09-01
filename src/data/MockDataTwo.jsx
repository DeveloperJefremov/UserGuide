// const apiUrl = 'https://dog.ceo/api/breeds/image/random';

const mockDataTwo = [
	{
		title: 'Set title 1',
		footer: undefined,
		guideSteps: [
			{
				id: '1',
				order: 1,
				title: 'Step 1: Introduction',
				description: 'This is the first step of the guide.',
				elementId: 'btn-1',
				imgChecked: true,
				imgWidth: 300,
				imgHeight: 200,
				imageUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_7866.jpg',
			},
		],
	},
	{
		title: 'Set title 2',
		footer: undefined,
		guideSteps: [
			{
				id: '2',
				order: 2,
				title: 'Step 2: Setup',
				description: 'Setup your environment with the following instructions.',
				elementId: 'link-1',
				imgChecked: false,
				imgWidth: 300,
				imgHeight: 200,
				imageUrl:
					'https://images.dog.ceo/breeds/spaniel-sussex/n02102480_6569.jpg',
			},
		],
	},
	{
		title: 'Set title 3',
		footer: undefined,
		guideSteps: [
			{
				id: '3',
				order: 3,
				title: 'Step 3: Configuration',
				description: 'Configure your settings to match the requirements.',
				elementId: 'icon-1',
				imgChecked: true,
				imgWidth: 400,
				imgHeight: 300,
				imageUrl:
					'https://images.dog.ceo/breeds/setter-gordon/n02101006_585.jpg',
			},
		],
	},
];

export default mockDataTwo;
