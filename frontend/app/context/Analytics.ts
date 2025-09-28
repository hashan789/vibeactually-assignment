import { create } from 'zustand';
import axios from '../lib/axios';
import { ReactElement, ReactNode } from 'react';

export const useAnalytics = create((set,get) => ({
    noOfQuestions: 0,
    queries: [],
    noOfWords: 0,
    dailyTokens: [],

    fetchAnalytics: async () => {
        try {
            const response = await axios.get('analytics/analytics');
            const data = response.data;
            const arrQueries = data.queries.map((item: { query: string }) => item.query);
            set({ noOfQuestions: data.noOfRes, queries: [...new Set(arrQueries)], noOfWords: data.noOfWords, dailyTokens: data.dailyTokens });
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    }
}))