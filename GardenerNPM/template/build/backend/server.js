// server.ts
import 'dotenv/config';
import express from 'express';
import frontendRoute from './routes/gardener.route.js';
import path from "path";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFiles = path.resolve(__dirname, '..', 'frontend');
app.set('views', path.join(staticFiles, 'views'));
app.set("view engine", "ejs");
app.use(express.static(staticFiles));
app.use(express.json());
app.use(frontendRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server listening 🚀🚀🚀 PORT:", PORT);
});
//# sourceMappingURL=server.js.map