<h1>VibeActually Take home assignment</h1>

This project is a full-stack, AI-powered chat application designed to provide dynamic and intelligent conversational experiences. It features a modern, responsive user interface and a robust backend infrastructure capable of handling real-time chat interactions and complex data processing. The application's core functionality is powered by OpenAI's cutting-edge models, providing users with a highly interactive and context-aware chat environment.

<b>Key Features</b>
<ul>
  <li>Real-time Chat: Intelligent Responses: The core of the application is the GPT-4-0613 model. This allows the AI to generate highly accurate, coherent, and contextually relevant responses, making the conversations feel natural and insightful.</li>

  <li>Semantic Search & Retrieval: The application utilizes OpenAI's text embedding models to convert text into numerical vectors. This enables semantic search, allowing the AI to retrieve and reference relevant information from a pre-ingested knowledge base, ensuring its responses are grounded in specific data.</li>

  <li>Intuitive User Interface: The frontend, built with Next.js, provides a fast and modern user experience. It features a clean, intuitive layout for easy navigation and interaction.</li>

  <li>Admin Dashboard: A dedicated admin dashboard, powered by Recharts, provides high-level analytics on user engagement and AI performance. This includes visualizations of chat volume, response times, and other key metrics.</li>
</ul>

<b>Technology Stack</b>

<ul>
  <li>
  Frontend:
  <ul>
    <li>      
  Next.js: Used for building a fast, server-side rendered, and static-generated React application.
    </li>
  </ul>
  </li>

<li>
Backend:

<ul>
  <li>
Express.js: A flexible and minimalist Node.js web application framework that provides a robust API layer for handling all client-side requests, including chat interactions and data retrieval.
  </li>
</ul>
</li>

<li>
Database:

<ul>
  <li>
Prisma: A next-generation ORM that provides a type-safe and intuitive way to interact with the database.
  </li>

  <li>   
Supabase (PostgreSQL): A scalable, open-source backend-as-a-service that provides a managed PostgreSQL database, handling user authentication, and data storage.
  </li>
</ul>

</li>

<li>
Artificial Intelligence:

<ul>
  <li>
OpenAI GPT-4-0613: The large language model (LLM) responsible for generating the AI's chat responses.
  </li>

  <li>
OpenAI Text Embeddings: Used for creating vector representations of text for semantic search capabilities.
  </li>
</ul>

</li>


<li>
Admin Tools:

<ul>
  <li>
Recharts: A charting library for React, used to build interactive and informative charts on the admin dashboard.
  </li>
</ul>
</li>

</ul>

<b>How to run this application locally</b>

<ul>
  <li>Open the IDE</li>
  <li>
    Run these commands in the terminal of the IDE
    <ul>
    <li>
        frontend
        <ul>
        <li>cd frontend</li>
        <li>npm run dev</li>
        </ul>
    </li>

    <li>
        backend
        <ul>
        <li>cd backend</li>
        <li>npm run start</li>
        </ul>
    </li>
    </ul>
  </li>
</ul>


