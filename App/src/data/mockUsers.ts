import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@kongu.edu',
    name: 'Demo Student',
    department: 'CSE',
    semester: 4,
    role: 'student'
  },
  {
    id: '2',
    email: 'admin@kongu.edu',
    name: 'Admin User',
    department: 'CSE',
    semester: 0,
    role: 'admin'
  }
];