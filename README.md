# README
Quack! is a single page clone of Slack built with Ruby on Rails, PostgreSQL, Action Cable Web Sockets, and React/Redux.

## Overview
Quake! makes use of websockets through Rails Action Cable module. Standard HTTP connections only allow for a one way communication at any one time (known as half-duplex). A helpful anaology is using a radio or walkie-talkie, where only one person can talk at a time. The standard HTTP request can be upgraded to a web socket connection which is a full duplex connection. A full duplex connection enables full 2 way communction, analagous to a cell phone, where both parties can communicate at the same time.

The web sockets make use of a publisher-subscriber model, where users are subscribed to a channel. A user sends a message to the channel at large, and anyone subscribed to that channel will recieve it.

## Features
Quake! has a number of features simlar to it's inspiration Slack.

### Rich Text Editor
Quack! features a Rich Text editor with font formats of Bold, Italic, and Underline. Also, a user can make bulleted or numbered lists.

### Emojis 
Quack! integrates emojis since they are a fun part of using any chat applciation.

### Channel Creation and Direct Messages
Quack! allows users to create their own channels and send direct messages selected members.

### Avatars and AWS Itegration
Avatars are stored on AWS to ensure rapid availability and efficient delivery. In addition, members can update their avatars through a modal update form.
