const express = require("express");
const router = express.Router();
const {fetchTodos,addNewNote,updateStatusNote,deleteNote}=require('../controller/todos')

router.get("/todos",fetchTodos);

//POST
router.post("/todos", addNewNote);

//DELETE
router.delete("/todos/:id", deleteNote);

router.put("/todos/:id", updateStatusNote);

module.exports = router;
