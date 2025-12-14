// server.ts
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gardenerRoute from './routes/gardener.route.js'
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '../src/backend/views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '../src/frontend')));
app.use(express.json());
app.use(gardenerRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server listening 🚀🚀🚀 PORT:", PORT);
});

