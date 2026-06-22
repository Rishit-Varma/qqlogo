export type Head = {
  name: string;
  portfolio: string;
};

export type TeacherAssignment = {
  event: string;
  teachers: string[];
};

export const heads: Head[] = [
  { name: 'Devansh',  portfolio: 'Research & Development' },
  { name: 'Rishiraj', portfolio: 'Operations' },
  { name: 'Ritankar', portfolio: 'Public Relations' },
  { name: 'Shourja',  portfolio: 'Science & Innovation' },
  { name: 'Vansh',    portfolio: 'Tech & Media' },
];

export const teacherInCharges: TeacherAssignment[] = [
  { event: "Innovators' Thinktank",       teachers: ['Mrs R Mukherjee', 'Ms D Chakraborty'] },
  { event: 'Scientific Debate Roundtable', teachers: ['Mrs S Dhar', 'Mr P P Lahiri'] },
  { event: 'Mathematics Quest',            teachers: ['Mr D Mondal', 'Mr P P Lahiri'] },
  { event: 'Project Envision',             teachers: ['Mr S K Ray', 'Mrs M Mukherjee', 'Mrs S Roy'] },
  { event: 'Model Mayhem',                 teachers: ['Mr D Chakraborty', 'Mr T K Pal'] },
  { event: '8Bit Hack',                    teachers: ['Mr S K Ray', 'Mrs S Roy', 'Mrs M Mukherjee'] },
  { event: 'Scientific Showdown',          teachers: ['Mrs J Bhattacharyya'] },
  { event: 'Scinaptic Expedition',         teachers: ['Mrs A Chowdhury'] },
];
