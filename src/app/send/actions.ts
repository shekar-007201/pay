'use server';

import { suggestPayee } from '@/ai/flows/suggest-payee';
import { transactionHistoryString } from '@/lib/data';

export async function getPayeeSuggestions(currentPayee: string) {
  try {
    const result = await suggestPayee({
      transactionHistory: transactionHistoryString,
      currentPayee: currentPayee,
    });
    return result.suggestedPayees;
  } catch (error) {
    console.error('Error getting payee suggestions:', error);
    return [];
  }
}
