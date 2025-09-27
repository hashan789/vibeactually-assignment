import { PrismaClient } from "@prisma/client";

class Analytics{

    prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient();
    }


    async getNoOfResponses(){
        const noOfResponses = await this.prisma.response.count();

        return noOfResponses;
    }

    async getQueries(){
        const queries = await this.prisma.response.findMany({
                select: {
                    query: true,
                }
            }
        );

        const originalQueries = [...new Set(queries)]

        return originalQueries;

    }

    async getNoOfWords(){
        const responses = await this.prisma.response.findMany({
                select: {
                    content: true,
                }
            }
        ); 
        
        let totalWords = 0;
        responses.forEach(response => {
            totalWords += response.content.split(' ').length;
        });

        return totalWords;
    }
}


const analytics = new Analytics();

export default analytics