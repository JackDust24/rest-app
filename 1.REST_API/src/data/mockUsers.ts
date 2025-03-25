import { User } from '../utils/types';

const users: User[] = [
  {
    id: '1e9324b9-17bc-40c5-8414-95352e665be7',
    email: 'john.snow@example.com',
    password: 'password123',
    name: 'John Snow',
    dob: new Date('1990-05-15'),
    gender: 'Male',
    address: '123 Winterfell St, Westeros',
    isSubscribed: true,
  },
  {
    id: '2d9314c0-27bd-40d1-92f6-cdfaa89d982f',
    email: 'daenerys.targaryen@example.com',
    password: 'password456',
    name: 'Daenerys Targaryen',
    dob: new Date('1985-07-25'),
    gender: 'Female',
    address: '456 Red Waste, Essos',
    isSubscribed: false,
  },
];

const mockID = users[0].id;

export { users, mockID };
