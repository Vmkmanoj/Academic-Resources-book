import { Resource } from '../types';

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    type: 'syllabus',
    subject: 'DSA',
    semester: 4,
    department: 'CSE',
    downloadUrl: 'https://example.com/dsa-syllabus.pdf',
    uploadedAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'Database Management Systems',
    type: 'questionBank',
    subject: 'DBMS',
    semester: 4,
    department: 'CSE',
    downloadUrl: 'https://example.com/dbms-qb.pdf',
    uploadedAt: new Date('2024-03-02')
  },
  {
    id: '3',
    title: 'Operating Systems',
    type: 'eBook',
    subject: 'OS',
    semester: 4,
    department: 'CSE',
    downloadUrl: 'https://example.com/os-ebook.pdf',
    uploadedAt: new Date('2024-03-03')
  }
];