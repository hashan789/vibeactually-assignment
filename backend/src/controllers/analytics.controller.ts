import analytics from "../services/analytics.ts";

export const get_analytics = async (req: any,res: any) =>{

    try {
        const noOfResponses = await analytics.getNoOfResponses();
        const queries = await analytics.getQueries();
        const noOfWords = await analytics.getNoOfWords();

        console.log({
            noOfResponses, queries
        })

        res.json({
            noOfRes: noOfResponses,
            queries: queries,
            noOfWords: noOfWords
        })
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
}