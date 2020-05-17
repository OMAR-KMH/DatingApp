export interface Message {
  id: number;
  senderId: number;
  senderKnownAs: string;
  senderPhotoUrl: string;
  reciptionId: number;
  reciptionKnownAs: string;
  reciptionPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  messagesSent: Date;

}
