export interface Question {
  id: string | undefined;
  content: string | undefined;
  topic: string | undefined;
  difficulty: string | undefined;
  answer: string | undefined;
  type: string | undefined;
}

export const fieldOptions = {
  type: ['Behavioral', 'Technical'],
  difficulty: ['Easy', 'Medium', 'Hard'],
  topic: ['JavaScript', 'TypeScript', 'MongoDB', 'Data Structure'],
};
