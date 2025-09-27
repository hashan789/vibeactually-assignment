import documentProcessor from "../services/documentProcessor.ts"

export const upload_doc = async (req: any,res: any) => {
    try {
        const file = req.file;
    
        if (!file) {
          return res.status(400).json({ error: 'No file or content provided' });
        }
    
        // Process document
        const processed = await documentProcessor.processDocument(file);
    
        res.json({
          content : processed.content
        });
    
      } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ error: 'Failed to process document' });
      }
}