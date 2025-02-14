export interface IChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface IChatCreateData {
  title: string;
}

export interface IChatCreatedData {
  id: number;
}

export interface IChatDeleteData {
  chatId: number;
}

export interface IChatDeletedData {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
}
