'use server';
/**
 * @fileOverview An AI concierge that provides historical information about South Indian ingredients or dishes.
 *
 * - getHeritageInformation - A function that fetches historical information about a given query.
 * - HeritageInformationInput - The input type for the getHeritageInformation function.
 * - HeritageInformationOutput - The return type for the getHeritageInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HeritageInformationInputSchema = z
  .object({
    query: z
      .string()
      .describe(
        'The South Indian ingredient or dish the user is asking about.'
      ),
  })
  .describe('Input for requesting historical information about a culinary item.');
export type HeritageInformationInput = z.infer<
  typeof HeritageInformationInputSchema
>;

const HeritageInformationOutputSchema = z
  .string()
  .describe(
    'Historical significance or origin story of the requested ingredient or dish.'
  );
export type HeritageInformationOutput = z.infer<
  typeof HeritageInformationOutputSchema
>;

export async function getHeritageInformation(
  input: HeritageInformationInput
): Promise<HeritageInformationOutput> {
  return heritageInformationFlow(input);
}

const heritageInformationPrompt = ai.definePrompt({
  name: 'heritageInformationPrompt',
  input: {schema: HeritageInformationInputSchema},
  output: {schema: HeritageInformationOutputSchema},
  prompt: `You are the Dravida Heritage AI Concierge, an expert in South Indian culinary history. Your task is to provide concise, engaging, and historically accurate information about South Indian ingredients or dishes. Focus on their origin stories, cultural significance, and traditional uses.

The user is asking about: {{{query}}}

Please provide the historical significance or origin story of this item.`,
});

const heritageInformationFlow = ai.defineFlow(
  {
    name: 'heritageInformationFlow',
    inputSchema: HeritageInformationInputSchema,
    outputSchema: HeritageInformationOutputSchema,
  },
  async input => {
    const {output} = await heritageInformationPrompt(input);
    return output!;
  }
);
