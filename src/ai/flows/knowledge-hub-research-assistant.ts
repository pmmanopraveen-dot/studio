'use server';

/**
 * @fileOverview A research assistant for the knowledge hub.
 *
 * - knowledgeHubResearchAssistant - A function that answers questions about research papers found online.
 * - KnowledgeHubResearchAssistantInput - The input type for the knowledgeHubResearchAssistant function.
 * - KnowledgeHubResearchAssistantOutput - The return type for the knowledgeHubResearchAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KnowledgeHubResearchAssistantInputSchema = z.object({
  query: z.string().describe('The question to ask about the research papers.'),
  searchResults: z.string().describe('The search results from the internet.'),
});
export type KnowledgeHubResearchAssistantInput = z.infer<typeof KnowledgeHubResearchAssistantInputSchema>;

const KnowledgeHubResearchAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type KnowledgeHubResearchAssistantOutput = z.infer<typeof KnowledgeHubResearchAssistantOutputSchema>;

export async function knowledgeHubResearchAssistant(input: KnowledgeHubResearchAssistantInput): Promise<KnowledgeHubResearchAssistantOutput> {
  return knowledgeHubResearchAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'knowledgeHubResearchAssistantPrompt',
  input: {schema: KnowledgeHubResearchAssistantInputSchema},
  output: {schema: KnowledgeHubResearchAssistantOutputSchema},
  prompt: `You are a research assistant that answers questions about research papers.

  You will be given a question and a set of search results from the internet.

  Use the search results to answer the question. If the search results do not contain the answer, say that you could not find the answer in the provided search results.

  Question: {{{query}}}
  Search Results: {{{searchResults}}}`,
});

const knowledgeHubResearchAssistantFlow = ai.defineFlow(
  {
    name: 'knowledgeHubResearchAssistantFlow',
    inputSchema: KnowledgeHubResearchAssistantInputSchema,
    outputSchema: KnowledgeHubResearchAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
