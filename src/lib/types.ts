export type Transaction = {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  party: {
    name: string;
    avatarUrl: string;
    avatarFallback: string;
  };
  date: string;
  description: string;
};

export type UserProfile = {
  name: string;
  phone: string;
  avatarUrl: string;
  avatarFallback: string;
  balance: number;
};
