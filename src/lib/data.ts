import type { Transaction, UserProfile } from './types';

export const userProfile: UserProfile = {
  name: 'Alex Doe',
  phone: '+1 123-456-7890',
  avatarUrl: 'https://placehold.co/100x100.png',
  avatarFallback: 'AD',
  balance: 5240.3,
};

export const transactions: Transaction[] = [
  {
    id: 'txn_1',
    type: 'received',
    amount: 75.0,
    party: {
      name: 'Jane Smith',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'JS',
    },
    date: '2024-07-29T10:00:00Z',
    description: 'Coffee meeting',
  },
  {
    id: 'txn_2',
    type: 'sent',
    amount: 250.0,
    party: {
      name: 'Electric Co.',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'EC',
    },
    date: '2024-07-28T15:30:00Z',
    description: 'Electricity Bill',
  },
  {
    id: 'txn_3',
    type: 'sent',
    amount: 1200.0,
    party: {
      name: 'Landlord',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'L',
    },
    date: '2024-07-28T09:00:00Z',
    description: 'Monthly Rent',
  },
  {
    id: 'txn_4',
    type: 'received',
    amount: 500.0,
    party: {
      name: 'Work Inc.',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'WI',
    },
    date: '2024-07-27T18:00:00Z',
    description: 'Freelance Project',
  },
  {
    id: 'txn_5',
    type: 'sent',
    amount: 45.5,
    party: {
      name: 'Groceries Store',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'GS',
    },
    date: '2024-07-26T12:45:00Z',
    description: 'Weekly groceries',
  },
  {
    id: 'txn_6',
    type: 'sent',
    amount: 22.0,
    party: {
      name: 'Cinema',
      avatarUrl: 'https://placehold.co/100x100.png',
      avatarFallback: 'C',
    },
    date: '2024-07-25T20:15:00Z',
    description: 'Movie ticket',
  },
];

export const transactionHistoryString = transactions
  .map(
    (t) =>
      `On ${new Date(t.date).toLocaleDateString()}, ${
        t.type === 'sent' ? 'sent' : 'received'
      } $${t.amount} ${
        t.type === 'sent' ? 'to' : 'from'
      } ${t.party.name} for "${t.description}".`
  )
  .join('\n');
