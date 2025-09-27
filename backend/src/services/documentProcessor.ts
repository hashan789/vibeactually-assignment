import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import readXlsxFile from 'read-excel-file/node';
import openaiService from './openaiService.ts'

class DocumentProcessor {
    chunkSize: number;
    chunkOverlap: number;

    constructor() {
      this.chunkSize = 1000; // Characters per chunk for embeddings
      this.chunkOverlap = 200; // Overlap between chunks
    }
  
    async processDocument(file: any, content = null) {
      try {
        let extractedText = content;
        
        if (!extractedText) {
          extractedText = await this.extractTextFromFile(file);
        }
  
        // const sections = this.segmentDocument(extractedText);
        // const metadata = this.generateMetadata(extractedText, file);
        // const chunks = this.createChunks(extractedText);
  
        return {
          content: extractedText
          // sections,
          // metadata,
          // chunks
        };
      } catch (error) {
        console.error('Document processing error:', error);
        throw new Error('Failed to process document');
      }
    }
  
    async extractTextFromFile(file: any) {
      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      
      switch (fileExtension) {
        case 'pdf':
          const pdfData = await pdfParse(file.buffer);
          return pdfData.text;
        
        case 'docx':
          const docxData = await mammoth.extractRawText({ buffer: file.buffer });
          return docxData.value;
        
        case 'txt':
          return file.buffer.toString('utf-8');

        case 'xlsx':
          const rows = await readXlsxFile(file.buffer);     
          return rows.map(row => row.join(' ')).join('\n');   
        
        default:
          throw new Error('Unsupported file format');
      }
    }
  
}

const documentProcessor = new DocumentProcessor();

export default documentProcessor