import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");

app.use(express.json());
app.use(express.static("."));

app.get("/api/load", (_req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json(null);
  res.json(JSON.parse(fs.readFileSync(DATA_FILE)));
});

app.post("/api/save", (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Roadmap running on http://localhost:${PORT}`);
});
