// const apiUrl = 'https://dog.ceo/api/breeds/image/random';

const mockData = [
	{
		id: '1',

		data: [
			{
				setHeader: 'Set Header 1',
				setFooter: 'Set footer 1',
				setBody: [
					{
						id: '1',
						order: 1,
						title: 'Step 1: Introduction',
						description: 'This is the first step of the guide.',
						elementId: 'btn-1',
						imgChecked: true,
						imgWidth: 300,
						imgHeight: 200,
						imageUrl:
							'https://images.dog.ceo/breeds/labrador/n02099712_7866.jpg',
					},
					{
						id: '4',
						order: 4,
						title: 'Step 4: Execution',
						description: 'Execute the following commands to proceed.',
						elementId: 'btn-2',
						imgChecked: false,
						imgWidth: 300,
						imgHeight: 200,
						imageUrl:
							'https://images.dog.ceo/breeds/clumber/n02101556_5023.jpg',
					},
				],
			},
		],
	},
	{
		id: '2',
		data: [
			{
				setHeader: 'Set Header 2',
				setFooter: 'Set footer 2',
				setBody: [
					{
						id: '2',
						order: 2,
						title: 'Step 2: Setup',
						description:
							'Setup your environment with the following instructions.',
						elementId: 'link-1',
						imgChecked: false,
						imgWidth: 300,
						imgHeight: 200,
						imageUrl:
							'https://images.dog.ceo/breeds/spaniel-sussex/n02102480_6569.jpg',
					},
					{
						id: '5',
						order: 5,
						title: 'Step 5: Verification',
						description: 'Verify that everything is working as expected.',
						elementId: 'link-2',
						imgChecked: true,
						imgWidth: 500,
						imgHeight: 400,
						imageUrl:
							'https://images.dog.ceo/breeds/spaniel-japanese/n02085782_230.jpg',
					},
				],
			},
		],
	},
	{
		id: '3',
		data: [
			{
				setHeader: 'Set Header 3',
				setFooter: 'Set footer 3',
				setBody: [
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
					{
						id: '6',
						order: 6,
						title: 'Step 6: Troubleshooting',
						description: 'Troubleshoot common issues that might arise.',
						elementId: 'icon-2',
						imgChecked: true,
						imgWidth: 350,
						imgHeight: 250,
						imageUrl:
							'https://images.dog.ceo/breeds/pembroke/n02113023_2256.jpg',
					},
				],
			},
		],
	},

	// {
	// 	id: '4',
	// 	order: 4,
	// 	title: 'Step 4: Execution',
	// 	description: 'Execute the following commands to proceed.',
	// 	elementId: 'btn-2',
	// 	imgChecked: false,
	// 	imgWidth: 300,
	// 	imgHeight: 200,
	// 	imageUrl: 'https://images.dog.ceo/breeds/clumber/n02101556_5023.jpg',
	// },
	// {
	// 	id: '5',
	// 	order: 5,
	// 	title: 'Step 5: Verification',
	// 	description: 'Verify that everything is working as expected.',
	// 	elementId: 'link-2',
	// 	imgChecked: true,
	// 	imgWidth: 500,
	// 	imgHeight: 400,
	// 	imageUrl:
	// 		'https://images.dog.ceo/breeds/spaniel-japanese/n02085782_230.jpg',
	// },
	// {
	// 	id: '6',
	// 	order: 6,
	// 	title: 'Step 6: Troubleshooting',
	// 	description: 'Troubleshoot common issues that might arise.',
	// 	elementId: 'icon-2',
	// 	imgChecked: true,
	// 	imgWidth: 350,
	// 	imgHeight: 250,
	// 	imageUrl: 'https://images.dog.ceo/breeds/pembroke/n02113023_2256.jpg',
	// },
	// {
	// 	id: '7',
	// 	order: 7,
	// 	title: 'Step 7: Maintenance',
	// 	description:
	// 		'Perform regular maintenance to keep everything running smoothly.',
	// 	elementId: 'btn-3',
	// 	imgChecked: false,
	// 	imgWidth: 300,
	// 	imgHeight: 200,
	// 	imageUrl: 'https://images.dog.ceo/breeds/hound-ibizan/n02091244_5639.jpg',
	// },
	// {
	// 	id: '8',
	// 	order: 8,
	// 	title: 'Step 8: Upgrades',
	// 	description: 'Upgrade your system with the latest features.',
	// 	elementId: 'link-3',
	// 	imgChecked: true,
	// 	imgWidth: 600,
	// 	imgHeight: 300,
	// 	imageUrl: 'https://images.dog.ceo/breeds/pembroke/n02113023_11397.jpg',
	// },
	// {
	// 	id: '9',
	// 	order: 9,
	// 	title: 'Step 9: Backup',
	// 	description: 'Ensure that you have a backup of your important data.',
	// 	elementId: 'icon-2',
	// 	imgChecked: false,
	// 	imgWidth: 300,
	// 	imgHeight: 200,
	// 	imageUrl:
	// 		'https://images.dog.ceo/breeds/terrier-scottish/n02097298_7629.jpg',
	// },
	// {
	// 	id: '10',
	// 	order: 10,
	// 	title: 'Step 10: Conclusion',
	// 	description: 'Wrap up the guide and review the key points.',
	// 	elementId: 'btn-4',
	// 	imgChecked: true,
	// 	imgWidth: 400,
	// 	imgHeight: 300,
	// 	imageUrl: 'https://images.dog.ceo/breeds/spaniel-sussex/n02102480_7189.jpg',
	// },
];

export default mockData;
