import OpenAI from 'openai';
import dotenv from 'dotenv'
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Prisma, PrismaClient } from '@prisma/client';

dotenv.config()

class OpenAIService {
    client: OpenAI
    defaultModel: string
    embeddings_model: OpenAIEmbeddings<number[]>
    prisma: PrismaClient

    constructor() {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      this.embeddings_model = new OpenAIEmbeddings();
      
      this.defaultModel = 'gpt-4-0613';

      this.prisma = new PrismaClient();
    }
  
    async generateResponse(documentContext: string, query: string) {
      try {
        const startTime = Date.now();

        const docs = await this.processAndQuery(documentContext) as any;

        const relevantDocs = await this.getRelevantDocs(docs, query);

        console.log(docs);
        
        // Build system prompt with document context
        const systemPrompt = this.buildSystemPrompt(relevantDocs, query);
        
        const completion: any = await this.client.chat.completions.create({
          model: this.defaultModel,
          messages: [
            { role: 'user', content: systemPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        });
  
        const responseTime = Date.now() - startTime;

        const newResponse = await this.prisma.response.create({
          data: {
            query: query,
            content: completion.choices[0].message.content,
            responseTime: new Date() // or new Date().toISOString()
          }
        })
        
        return {
          content: completion.choices[0].message.content,
          metadata: {
            tokensUsed: completion.usage.total_tokens,
            responseTime,
            model: this.defaultModel
          }
        };
      } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate AI response');
      }
    }

    async processAndQuery(documentContent: any){

        let inputText = "";
        if (typeof documentContent === 'string') {
        inputText = documentContent;
        } else if (Array.isArray(documentContent) && documentContent.every(item => typeof item === 'string')) {
        // If it's an array of strings, join them
        inputText = documentContent.join('\n\n'); 
        } else {
        // Handle other non-string types, or throw an error
        console.error('Invalid input: documentContent must be a string or an array of strings.');
        return; 
        }

        const textSplitter = new CharacterTextSplitter({
            separator: "\n",
            chunkSize: 1000,
            chunkOverlap: 200,
            lengthFunction: (text) => text.length,
        })

        const docs = await textSplitter.createDocuments([inputText]);

        const vectorStore = await MemoryVectorStore.fromDocuments(docs, this.embeddings_model);

        return vectorStore;
    }

    async getRelevantDocs(vectorStore: MemoryVectorStore, query: string){

        const relevantDocs = await vectorStore.similaritySearch(query);

        return relevantDocs;
    }
  
    buildSystemPrompt(documentContext: any, query: string) {
      let prompt = `You are an intelligent learning assistant helping users understand complex documents. Your role is to:
  
        1. Answer questions clearly and accurately based on the document content
        2. Provide explanations that are educational and easy to understand
        3. Connect concepts within the document to help build comprehensive understanding
        4. Ask follow-up questions when appropriate to deepen learning
        5. Cite specific parts of the document when referencing information
        
        Guidelines:
        - Always base your answers on the provided document content
        - If information isn't in the document, clearly state that
        - Use examples from the document to illustrate points
        - Break down complex concepts into simpler terms
        - Encourage critical thinking with thoughtful questions
        - Get the readiness; Readiness: % of total tasks that are not overdue
          Example: Task A is due 01-01-2026, and is therefore not overdue
          Example: John has 2/10 tasks overdue, so is 80% ready
          `;

        const pageContents = documentContext.map((doc: any) => doc.pageContent)
  
      if (documentContext) {
        prompt += `\n\nCurrent Document Context:\n${pageContents}\n\nQuestion: ${query}`;
      }
  
      return prompt;
    }
}

const openaiService = new OpenAIService();

export default openaiService