import openaiService from "../services/openaiService.ts";


export const generate_ai_res = async (req: any,res: any) => {

    try {
        const { query, document } = req.body;

        // console.log(query, document)
        
        if (!query || !document) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        // Build context
        const documentContext: any = {
          content: document
        };
    
        // Generate AI response
        const aiResponse = await openaiService.generateResponse(document, query);
    
        res.json({
          response: aiResponse.content
        });
    
      } catch (error) {
        console.error('AI chat error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
      }

}