import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { PRACTICALS_DATABASE } from './src/lib/practicalsStore.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Public SELECT endpoint: list practicals ordered by display_order
  app.get('/api/practicals', (_req, res) => {
    const sorted = [...PRACTICALS_DATABASE]
      .sort((a, b) => a.display_order - b.display_order)
      .map(({ id, practical_number, practical_name, display_order, created_at }) => ({
        id,
        practical_number,
        practical_name,
        display_order,
        created_at,
      }));
    res.json(sorted);
  });

  // Public SELECT endpoint: fetch complete source_code for a single practical by practical_number
  app.get('/api/practicals/:practicalNumber', (req, res) => {
    const { practicalNumber } = req.params;
    const record = PRACTICALS_DATABASE.find(
      (item) => item.practical_number.toUpperCase() === practicalNumber.toUpperCase()
    );

    if (!record) {
      return res.status(404).json({ error: `Practical ${practicalNumber} not found` });
    }

    return res.json(record);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
