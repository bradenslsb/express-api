const express = require("express");
const todoModel = require("../models/todoModel");
const router = express.Router();
const Todos = require("../models/todoModel");
// GET
router.get("/todos", (req, res) => {
	Todos.find((err, todos) => {
		if (err) {
			res.status(404).json({ message: "Get todos err", error: `${err}` });
		} else {
			res.status(200).json([
				...todos.map((todo) => {
					const { _id, title, done } = todo;
					return { id: _id, title, done };
				}),
			]);
		}
	});
});
// POST
router.post("/todo", (req, res) => {
	const todo = new Todos(req.body);
	todo
		.save()
		.then((todo) => {
			const { _id, title, done } = todo;
			res.status(200).json({ id: _id, title, done });
		})
		.catch((err) => {
			res.status(400).json({ message: "unable to post", errors: `${err}` });
		});
});

//PATCH
router.patch("/todo/:id", (req, res) => {
  Todos.findById(req.params.id, {}, {}, (error, todo) => {
    if(err){
      res.status(404).json({ message: " patch problem", errors: `${err}` })
    }else {
      todo.done = req.body.done

      todo 
        .save()
        .then(todo => {
          res.status(204).json(todo)
        })
        .catch(err => {
          res.status(400).json({ message: "unable to update", errors: `${err}` })
        })
    }
  })
})
module.exports = router;