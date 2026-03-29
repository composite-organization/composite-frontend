export interface Question {
  id: string;
  userName: string;
  createAt: Date;
  content: string;
  likeCount: number;
  isCompleted: boolean;
  isLiked: boolean;
  userId: string;
}
