export interface IncomingFriendRequest {
  friendId: number;
  friendName: string;
  friendEmail: string;
}

export interface FriendRequestPayload {
  email: string;
}

export interface FriendResponsePayload {
  senderId: number;
  receiverId: number;
}

export interface FriendRequestResponse {
  success: boolean;
  code: string;
  message: string;
  data: IncomingFriendRequest[];
}
