const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "MissionReady@2021",
  database: "todoslist",
});

app.post("/newTodo", (req, res) => {
  const todosTitle = req.body.todosTitle;
  const todosDescription = req.body.todosDescription;

  db.query(
    "INSERT INTO todostable (todosTitle, todosDescription) VALUES (?,?)",
    [todosTitle, todosDescription],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.get("/showTodo", (req, res) => {
  db.query("SELECT * FROM todostable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteTodo/:id", (req, res) => {
  const todosTitle = req.params.id;
  db.query("DELETE FROM todostable WHERE id = ?", todosTitle, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("todo deleted");
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const todosDescription = req.body.todosDescription;

  db.query(
    "UPDATE todostable SET todosDescription = ? WHERE id = ?",
    [todosDescription, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(todosDescription);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("app works");
});
