const knex = require("knex")(require("./knexfile"));
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await knex("tasks");
    res.status(202).json(data);
  } catch (err) {
    res.status(400).send("Error retrieving Tasks: ${err}");
  }
});
app.post("/", async (req, res) => {
  try {
    const { taskname: name, priority, due_date } = req.body;
    if (!name) {
      return res.status(400).send("Failed: Task name is required.");
    }
    if (!priority) {
      return res.status(400).send("Failed: Task priority is required.");
    }
    if (!due_date) {
      return res.status(400).send("Failed: Task due_date is required.");
    }
    if (isNaN(new Date(due_date).getTime())) {
      return res.status(400).send("Failed: Task due_date is invalid.");
    }
    const [taskId] = await knex("tasks").insert({
      taskname: name,
      priority,
      due_date,
    });

    res.status(201).send({ id: taskId });
  } catch (err) {
    res.status(500).send("Server error ${err}");
  }
});

app.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await knex("tasks").where({ id: taskId }).del();
    if (deletedTask) {
      res.status(200).send(`Task with ID ${taskId} deleted successfully`);
    } else {
      res.status(404).send(`Task with ID ${taskId} not found`);
    }
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).send("Error deleting task");
  }
});

app.put("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
      await knex("tasks").where({ id: taskId }).update(req.body);
      res.status(200).send(`Update ${taskId}`);
  } catch (error) {
    console.log("Error!!!");
  }
});

app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
