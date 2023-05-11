import { faker } from '@faker-js/faker';

export const SIDEBAR_ICONS = [
	{
		name: 'messages',
		icon: 'fa-regular fa-message',
	},
	{
		name: 'pinned',
		icon: 'fa-regular fa-bookmark',
	},
	{
		name: 'profile',
		icon: 'fa-regular fa-gear',
	},
];

export const TEST_USER_CHATS = [
	{
		id: '1',
		icon: '',
		lastMessage: 'Hello',
		userName: 'Vovan',
		isPinned: true,
	},
	{
		id: '2',
		icon: '',
		lastMessage: 'Hello',
		userName: 'Maks',
		isPinned: true,
	},
	{
		id: '3',
		icon: '',
		lastMessage: 'Hello',
		userName: 'Serhio',
		isPinned: false,
	},
	{
		id: '4',
		icon: '',
		lastMessage: 'Hello',
		userName: 'Varya',
		isPinned: false,
	},
	{
		id: '5',
		icon: '',
		lastMessage: 'Hello',
		userName: 'Nazarovych',
		isPinned: false,
	},
];

export const messages = [
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: '1',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: 'w',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
	{
		userId: '976cfa58-7146-4a98-fa3e-08db4ffc83b3',
		id: 'w',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam voluptatibus beatae ea, fuga facere corrupti veritatis id nihil unde fugit quod suscipit explicabo, sunt ab temporibus quaerat assumenda quas.',
		date: '22:31',
	},
];

export const fakeUsers = [
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
	{
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		id: faker.datatype.uuid(),
		image: faker.image,
	},
];
