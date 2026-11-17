import express from "express";
import * as db from "./controllers/controller.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => console.log("futi"));

app.get("/api/equipment/:id", (req, res) => {
  const id = req.params.id;
  const that = db.getById(id);
  if (!that) {
    return res.status(404).json({ message: "Equipment not found." });
  }
  res.status(200).json(that);
});

app.get("/api/equipment/category/:category", (req, res) => {
  const category = req.params.category;
  const that = db.getByCategory(category);
  if (that.length === 0) {
    return res.status(404).json({ message: "Not found." });
  }
  res.status(200).json(that);
});

app.delete("/api/equipment/:id", (req, res) => {
  const id = req.params.id;
  const that = db.getById(id);
  if (!that) {
    return res.status(404).json({ message: "Equipment not found." });
  }
  db.del(id);
  res.status(200).json({ message: "Equipment successfully deleted." });
});

app.put("/api/equipment/:id", (req, res) => {
  const id = req.params.id;
  const that = db.getById(id);

  if (!that) {
    return res.status(404).json({ message: "Equipment not found." });
  }
  const { name, category, brand, price, quantity } = req.body;

  if (!name || !category || !brand || !price || !quantity || price < 0) {
    return res.status(400).json({ message: "wrong datas" });
  }
  db.puti(name, category, brand, price, quantity, id);
  res.status(200).json(db.getById(id));
});
