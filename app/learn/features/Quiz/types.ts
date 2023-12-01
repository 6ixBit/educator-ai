export interface IQuestion {
    question: string;
    wrong_answers: string[];
    correct_answer: string;
  }
  
export interface IWrongAnswer {
    question: string;
    correctAnswer: string;
    userAnswer: string;
  }