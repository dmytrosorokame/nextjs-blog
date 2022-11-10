import { MongoClient } from "mongodb";

const CONNECTION_URL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.ut4wkse.mongodb.net/${process.env.mongodb_db}?retryWrites=true&w=majority`;

const handler = async (req, res) => {
  const { method, body } = req;

  if (method !== "POST") return;

  const { email, name, message } = body;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  )
    return res.status(422).json({ message: "Not valid data!" });

  const newMessage = {
    email,
    name,
    message,
  };

  let client;

  try {
    client = await MongoClient.connect(CONNECTION_URL);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }

  const db = client.db();

  try {
    const result = await db.collection("messages").insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "storing message failed!" });
  }

  client.close();

  res.status(201).json({ message: "New message added!", newMessage });
};

export default handler;
