const { getConnectedClient } = require("../database");
const { objectId, ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

const fetchTodos = async (req, res) => {
  try {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNewNote = async (req, res) => {
  try {
    const collection = getCollection();
    let { todo } = req.body;
    const newTodo = await collection.insertOne({ todo, status: false });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const deletedTodo = await collection.deleteOne({ _id });
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStatusNote = async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;
    const updatedTodo = await collection.updateOne(
      { _id },
      { $set: { status: !status } }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  fetchTodos,
  addNewNote,
  deleteNote,
  updateStatusNote,
};
