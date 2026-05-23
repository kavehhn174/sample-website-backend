import { createApp } from "./app.js";

const PORT = process.env.PORT || 3001;
const app = createApp({ serveStatic: true });

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
