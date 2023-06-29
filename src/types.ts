export interface Question {
  id: string;
  content: string;
  topic: string;
  difficulty: string;
  answer: string;
  type: string;
}

export const fieldOptions = {
  type: ['Behavioral', 'Technical'],
  difficulty: ['Easy', 'Medium', 'Hard'],
  topic: ['JavaScript', 'TypeScript', 'MongoDB'],
};
