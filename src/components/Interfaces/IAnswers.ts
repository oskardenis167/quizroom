export default interface IAnswers {
  answers: string[];
  setAnswer: React.Dispatch<React.SetStateAction<string | null>>;
}
