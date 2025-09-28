import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'
// import { serverConnection } from './lib/server.js'
import http from "http"

import documentRoutes from './src/routes/document.route.ts'
import aiRoutes from './src/routes/ai.route.ts'
import analyticsRoutes from './src/routes/analytics.route.ts'

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// app.set('io', serverConnection(server));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/documents', documentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




