import Item from "../../models/items.model.js";
export default async function getItems(req, res) {
  const items = await Item.find();
  return res.json({ Item: items });
}
