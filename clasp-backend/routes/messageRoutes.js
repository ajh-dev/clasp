const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Message, Conversation } = require("../models/Conversation");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const requireAuth = require("../middlewares/requireAuth");
const socket = require("socket.io");
const _ = require("lodash");

const router = express.Router();

const saltRounds = 15;

router.post("/createmessage/:conversationID", requireAuth, async (req, res) => {
  let message = req.body;
  message = {
    ...message,
    sender: jwt.verify(message.sender, "MY_SECRET_KEY").userID,
  };
  message = new Message(message);

  await Conversation.findOneAndUpdate(
    { _id: req.params.conversationID },
    { $push: { messages: message } }
  );

  res.send("Request received");
});

router.post("/createconversation", requireAuth, async (req, res) => {
  const sender = req.user;
  let previousConvos = [];

  Conversation.find({ users: sender._id }, "users", (err, users) => {
    previousConvos = [...new Set(users.flat())];
  });

  User.find(
    { conditions: sender.conditions[0], _id: { $nin: previousConvos } },
    (err, users) => {
      if (users.length !== 0 && !err) {
        const recipient = users[0];
        const conversation = new Conversation({
          messages: [],
          users: [sender, recipient],
        });

        conversation.save();
        res.send(conversation);
      } else {
        return res
          .status(500)
          .send("Cannot find eligable conversation partner.");
      }
    }
  );
});

router.get("/conversations", requireAuth, async (req, res) => {
  Conversation.find({ users: req.user }, (err, conversations) => {
    if (err) {
      res.send("error");
    } else {
      res.send(conversations);
    }
  });
});

router.get("/conversation/:conversationID", requireAuth, async (req, res) => {
  Conversation.findOne(
    { _id: req.params.conversationID },
    (err, conversation) => {
      if (err) {
        res.send("error");
      } else {
        const self = req.user;
        const other = _.filter(conversation.users, (user) => {
          return !user.equals(self._id);
        })[0];
        res.send({ conversation, other });
      }
    }
  );
});

global.onlineUsersConversation = new Map();
global.onlineUsersMessage = new Map();

const io = socket(4000, {});

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user-conversation", (userID) => {
    jwt.verify(userID, "MY_SECRET_KEY", async (err, payload) => {
      onlineUsersConversation.set(payload.userID, socket.id);
    });
  });

  socket.on("add-conversation", (data) => {
    const selfID = jwt.verify(data.self, "MY_SECRET_KEY").userID;

    const recipient = _.filter(data.conversation.users, (user) => {
      return user._id !== selfID;
    })[0]._id;

    const sendUserSocket = onlineUsersConversation.get(recipient);

    if (sendUserSocket) {
      io.to(sendUserSocket).emit("conversation-receive", data.conversation);
    }
  });

  socket.on("add-user-message", (userID) => {
    jwt.verify(userID, "MY_SECRET_KEY", async (err, payload) => {
      onlineUsersMessage.set(payload.userID, socket.id);
    });
  });

  socket.on("new-message", (data) => {
    const recipient = data.receiver;

    const sendUserSocket = onlineUsersMessage.get(recipient);

    if (sendUserSocket) {
      const sender = jwt.verify(data.sender, "MY_SECRET_KEY");
      io.to(sendUserSocket).emit("message-receive", {
        ...data,
        receiver: data.receiver,
        sender,
      });
    }
  });
});

module.exports = router;
