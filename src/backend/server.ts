// server.ts
import express from 'express';
import gardenerRoute from './routes/gardener.route.js'
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./"));
app.use(express.json());
app.use(gardenerRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server listening 🚀🚀🚀 PORT:", PORT);
});

