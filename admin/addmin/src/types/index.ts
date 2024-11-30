export interface User {
  id: string;
  email: string;
  department: string;
  semester: number;
  name: string;
  role: 'admin' | 'student';
}

export interface Resource {
  id: string;
  title: string;
  type: 'syllabus' | 'questionBank' | 'eBook';
  subject: string;
  semester: number;
  department: string;
  downloadUrl: string;
  uploadedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}