const express = require("express");
const path = require("path");
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

const renderUsersView = async (req, res) => {
  try {
    const users = await UserModel.find({});
    const statusMessages = {
      created: {
        type: "success",
        text: "Cadastro salvo com sucesso.",
      },
      updated: {
        type: "warning",
        text: "Cadastro editado com sucesso.",
      },
      deleted: {
        type: "danger",
        text: "Cadastro deletado com sucesso.",
      },
    };

    const flashMessage = statusMessages[req.query.status] || null;

    res.render("index", { users, flashMessage });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const sanitizeUserPayload = ({ firstName, lastName, email, password }) => ({
  firstName,
  lastName,
  email,
  password,
});

app.get("/", renderUsersView);
app.get("/views", renderUsersView);
app.get("/views/users", renderUsersView);

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/users/:id/edit", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    return res.render("edit", { user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(sanitizeUserPayload(req.body));

    if (req.headers["content-type"]?.includes("application/json")) {
      return res.status(201).json(user);
    }

    return res.redirect("/views?status=created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/users/:id/edit", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      sanitizeUserPayload(req.body),
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    return res.redirect("/views?status=updated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/users/:id/delete", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    return res.redirect("/views?status=deleted");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
