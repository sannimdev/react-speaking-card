import { IQuestion } from '../../types';

export interface IReversibleCardProps {
  questions: IQuestion[];
  shuffle?: boolean;
  subject?: string;
}
