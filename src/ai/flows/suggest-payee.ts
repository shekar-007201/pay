// src/ai/flows/suggest-payee.ts
'use server';

/**
 * @fileOverview A flow to suggest payees based on transaction history.
 *
 * - suggestPayee - A function that suggests payees based on transaction history.
 * - SuggestPayeeInput - The input type for the suggestPayee function.
 * - SuggestPayeeOutput - The return type for the suggestPayee function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPayeeInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('The transaction history of the user.'),
  currentPayee: z.string().optional().describe('The current payee, if any.'),
});
export type SuggestPayeeInput = z.infer<typeof SuggestPayeeInputSchema>;

const SuggestPayeeOutputSchema = z.object({
  suggestedPayees: z
    .array(z.string())
    .describe('The suggested payees based on transaction history.'),
});
export type SuggestPayeeOutput = z.infer<typeof SuggestPayeeOutputSchema>;

export async function suggestPayee(input: SuggestPayeeInput): Promise<SuggestPayeeOutput> {
  return suggestPayeeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPayeePrompt',
  input: {schema: SuggestPayeeInputSchema},
  output: {schema: SuggestPayeeOutputSchema},
  prompt: `You are a payment assistant that suggests payees based on transaction history.

  Given the following transaction history:
  {{transactionHistory}}

  Suggest a list of payees that the user might want to send money to.  If the user has already typed in a payee, don't include that payee in the list.
  Here is the current payee, if any: {{currentPayee}}
  `,
});

const suggestPayeeFlow = ai.defineFlow(
  {
    name: 'suggestPayeeFlow',
    inputSchema: SuggestPayeeInputSchema,
    outputSchema: SuggestPayeeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
