const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;

const url =
  "mongodb+srv://hgomezadmin:password1@@products.iobyboq.mongodb.net/?retryWrites=true&w=majority&appName=products";

const createPassword = async (req, res, next) => {
  const newPassword = {
    email: req.body.email,
    password: req.body.password,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("company");
    await db.collection("passwords").insertOne(newPassword);
  } catch (e) {
    return res.json({ message: "Could not store password" });
  }
  client.close();

  res.json(newPassword);
};

const signInUser = async (req, res, next) => {
  const client = new MongoClient(url);
  let passwords = null;
  let doesItMatch = null;
  let filteredArrayByEmail = null;

  const passwordToVerify = {
    email: req.params.email,
    password: req.params.password,
  };

  try {
    await client.connect();
    const db = client.db("company");
    passwords = await db.collection("passwords").find().toArray();

    filteredArrayByEmail = passwords.filter((password) => {
      return password.email === passwordToVerify.email;
    });

    if (filteredArrayByEmail[0].password === passwordToVerify.password) {
      doesItMatch = true;
    } else {
      doesItMatch = false;
    }

    if (doesItMatch === true) {
      res.json({ successfullyLoggedIn: true });
    } else {
      res.json({ successfullyLoggedIn: false });
    }
  } catch (e) {
    return res.json({ message: "Error Loggin In" });
  }

  client.close();
};

exports.createPassword = createPassword;
exports.signInUser = signInUser;
