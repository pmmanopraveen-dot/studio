"use server";

import { knowledgeHubResearchAssistant } from '@/ai/flows/knowledge-hub-research-assistant';

export async function researchAction(prevState: any, formData: FormData) {
  const query = formData.get('query') as string;
  const searchResults = formData.get('searchResults') as string;

  if (!query || !searchResults) {
    return { answer: "Please provide both a question and search results." };
  }

  try {
    const result = await knowledgeHubResearchAssistant({ query, searchResults });
    return { answer: result.answer };
  } catch (error) {
    console.error("Error in research action:", error);
    return { answer: "An error occurred while processing your request." };
  }
}
