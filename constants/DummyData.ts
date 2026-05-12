export interface Note {
	id: string;
	title: string;
	content: string;
	date: string;
}

export const DUMMY_NOTES: Note[] = [
	{
		id: '1',
		title: 'Meeting Notes',
		content:
			'Discussed project timeline and deliverables for Q2. Need to follow up with design team.',
		date: 'May 10, 2026'
	},
	{
		id: '2',
		title: 'Shopping List',
		content: 'Milk, Eggs, Bread, Coffee, Vegetables, Fruits, Chicken',
		date: 'May 9, 2026'
	},
	{
		id: '3',
		title: 'Project Ideas',
		content: 'Build a weather app, Create a task manager, Develop a recipe finder app',
		date: 'May 8, 2026'
	},
	{
		id: '4',
		title: 'Book Recommendations',
		content:
			'Atomic Habits, The Pragmatic Programmer, Clean Code, Designing Data-Intensive Applications',
		date: 'May 7, 2026'
	},
	{
		id: '5',
		title: 'Workout Routine',
		content: 'Monday: Chest & Triceps, Wednesday: Back & Biceps, Friday: Legs & Shoulders',
		date: 'May 6, 2026'
	},
	{
		id: '6',
		title: 'Travel Plans',
		content: 'Visit Japan in December - Tokyo, Kyoto, Osaka. Book flights 3 months in advance.',
		date: 'May 5, 2026'
	},
	{
		id: '7',
		title: 'Recipe: Pasta Carbonara',
		content:
			'Ingredients: Spaghetti, eggs, parmesan, guanciale, black pepper. Cook pasta, mix with egg mixture.',
		date: 'May 4, 2026'
	},
	{
		id: '8',
		title: 'Learning Goals',
		content: 'Master TypeScript, Learn React Native animations, Build 5 portfolio projects',
		date: 'May 3, 2026'
	}
];
