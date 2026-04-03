'use strict';

import admin from "firebase-admin";
// const express = require('express');
// const bodyParser = require('body-parser');

import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";
import fs from "fs";

let jsonData = JSON.parse(
  fs.readFileSync(".app-firebase-adminsdk.example", "utf-8")
);


// Initialize Firebase Admin SDK
process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential: admin.credential.cert(jsonData),
  projectId: "srs-app-2d73b",
});

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"]
  })
)


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// Define an endpoint to send notifications
app.post('/send-notification', (req, res) => {
  const receivedToken = req.body.token;
  const message = {
    notification: {
      title: "INCOMING CALL",
      body: "Tap here to select the ticket and start the live assistance call"
    },
    token: receivedToken
  }

  getMessaging()
  .send(message)
  .then((response) => {
    res.status(200).json({
      message: "Message succesfully sent"
    });
    console.log("Message successfully sent:", response)
  })
  .catch((error) => {
    res.status(400)
    res.send(error)
    console.log("Error sending message:", error)
  })

});





  


