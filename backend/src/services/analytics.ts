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

    async getNoOfDailyQueries(date: Date){

        const isDatePresent = await this.prisma.dailyQueries.findFirst({
            where: {
                updatedDate: date.getDate().toLocaleString()
            }
        })

        const dailyQueries = await this.prisma.response.findMany()

        const dailyQueriesUnique = dailyQueries.filter((query) => {
            const queryDate = query.responseTime.getDate();
            return queryDate === date.getDate();
        })

        let totalWords = 0;
        dailyQueriesUnique.forEach(response => {
            totalWords += response.content.split(' ').length;
        });

        if(isDatePresent){
            const updateDailyQueries = await this.prisma.dailyQueries.update({
                where: {
                    id: isDatePresent.id
                },
                data: {
                    totalTokens: totalWords
                }
            })
        }
        else{
            const addDailyQueries = await this.prisma.dailyQueries.create({
                data: {
                    totalTokens: totalWords,
                    updatedDate: date.getDate().toLocaleString()
                }
            })
        }



        const OriginaldailyQueries = await this.prisma.dailyQueries.findMany();

        return OriginaldailyQueries;
    }
}


const analytics = new Analytics();

export default analytics