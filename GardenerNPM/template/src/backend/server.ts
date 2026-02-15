// server.ts
import 'dotenv/config';
import express from 'express';
import frontendRoute from './routes/gardener.route.js'

const app = express();



app.set('views', './src/frontend/views');
app.set("view engine", "ejs");
app.use(express.static('./src/frontend'));
app.use(express.json());
app.use(frontendRoute);

const PORT = process.env.PORT || 3000;
//
// initDB().then(
//   () => {
//     app.listen(PORT, () => {
//       console.log("server listening 🚀🚀🚀 PORT:", PORT);
//     });
//   }
// )

app.listen(PORT, () => {
  console.log("server listening 🚀🚀🚀 PORT:", PORT);
});


