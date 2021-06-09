const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const sequelize = new Sequelize("groupotest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const app = express();
app.use(express.json());
app.post("/users", async (req, res) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const User = sequelize.define("User", {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

test();

app.listen(3000);
