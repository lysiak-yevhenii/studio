'use server';

/**
 * @fileOverview Connection suggestion AI agent.
 *
 * - suggestConnections - A function that suggests connections based on user profile data.
 * - ConnectionSuggestionsInput - The input type for the suggestConnections function.
 * - ConnectionSuggestionsOutput - The return type for the suggestConnections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConnectionSuggestionsInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma separated list of the users skills.'),
  experience: z.string().describe('Description of the users professional experience.'),
  industry: z.string().describe('The industry the user works in.'),
});
export type ConnectionSuggestionsInput = z.infer<typeof ConnectionSuggestionsInputSchema>;

const ConnectionSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggested connections based on the users profile data. Each entry should be the name and title of the suggested connection.'
    ),
});
export type ConnectionSuggestionsOutput = z.infer<typeof ConnectionSuggestionsOutputSchema>;

export async function suggestConnections(input: ConnectionSuggestionsInput): Promise<ConnectionSuggestionsOutput> {
  return suggestConnectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'connectionSuggestionsPrompt',
  input: {schema: ConnectionSuggestionsInputSchema},
  output: {schema: ConnectionSuggestionsOutputSchema},
  prompt: `You are a professional networking expert. Given the following information about a user, suggest 5 relevant connections for them. Respond with only a JSON array of strings. Each entry should be the name and title of the suggested connection.\n\nSkills: {{{skills}}}\nExperience: {{{experience}}}\nIndustry: {{{industry}}}`,
});

const suggestConnectionsFlow = ai.defineFlow(
  {
    name: 'suggestConnectionsFlow',
    inputSchema: ConnectionSuggestionsInputSchema,
    outputSchema: ConnectionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
