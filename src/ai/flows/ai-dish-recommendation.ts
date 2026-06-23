'use server';
/**
 * @fileOverview An AI-powered concierge tool that suggests dishes based on dietary preferences and narrates the historical significance of South Indian ingredients.
 *
 * - aiDishRecommendation - A function that handles the dish recommendation process.
 * - AiDishRecommendationInput - The input type for the aiDishRecommendation function.
 * - AiDishRecommendationOutput - The return type for the aiDishRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDishRecommendationInputSchema = z.object({
  dietaryPreferences: z
    .array(z.string())
    .describe('List of preferred ingredients or dish types.'),
  dietaryRestrictions: z
    .array(z.string())
    .describe('List of dietary restrictions (e.g., vegan, gluten-free, no nuts).'),
});
export type AiDishRecommendationInput = z.infer<
  typeof AiDishRecommendationInputSchema
>;

const AiDishRecommendationOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        dishName: z.string().describe('The name of the recommended dish.'),
        description: z.string().describe('A brief description of the dish.'),
        reason: z
          .string()
          .describe(
            'The reason this dish is recommended based on dietary preferences/restrictions.'
          ),
      })
    )
    .describe('List of personalized dish recommendations.'),
});
export type AiDishRecommendationOutput = z.infer<
  typeof AiDishRecommendationOutputSchema
>;

export async function aiDishRecommendation(
  input: AiDishRecommendationInput
): Promise<AiDishRecommendationOutput> {
  return aiDishRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDishRecommendationPrompt',
  input: {schema: AiDishRecommendationInputSchema},
  output: {schema: AiDishRecommendationOutputSchema},
  prompt: `You are the Heritage Concierge for "Dravida Heritage," a premium South Indian restaurant specializing in traditional dishes like Idly, Dosa, and Vada. Your role is to understand a customer's dietary preferences and restrictions and suggest personalized dishes from our menu. You should also subtly weave in information about the historical significance or traditional aspects of the dishes or ingredients when relevant to the recommendation.

Here are some of our core offerings and their general characteristics:
- Idly: Steamed, soft, and fluffy rice and lentil cakes. Naturally gluten-free, vegan when served without ghee. Fermented.
- Dosa: Thin, crispy crepe made from fermented rice and lentil batter. Naturally gluten-free, vegan when served without ghee. Fermented.
- Vada: Savory, crispy fried doughnut made from spiced lentil batter. Vegetarian. Can be made gluten-free.
- Sambar: A flavorful lentil-based vegetable stew. Vegan and gluten-free.
- Chutney: Various condiments, often coconut-based. Vegan and gluten-free.

Customer's Dietary Preferences: {{{dietaryPreferences}}}
Customer's Dietary Restrictions: {{{dietaryRestrictions}}}

Based on the customer's input, recommend up to 3 dishes that align with their needs. For each recommendation, provide the dish name, a brief description, and a clear reason explaining why it's a good choice, referencing their preferences or restrictions. Prioritize the core offerings (Idly, Dosa, Vada) first.

`,
});

const aiDishRecommendationFlow = ai.defineFlow(
  {
    name: 'aiDishRecommendationFlow',
    inputSchema: AiDishRecommendationInputSchema,
    outputSchema: AiDishRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
