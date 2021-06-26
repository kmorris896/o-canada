# Discord Bot Template

This project holds the template for building a discord bot.  It
incorporates the following tutorials:

* [How to Build Your First Discord Bot with
  Node.js](https://www.sitepoint.com/discord-bot-node-js/) by Michiel
  Mulders
* [Dockerizing a Node.js web
  app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) -
  Official node.js Guide

This node project uses an `.env` file to store the Discord Bot Token.
For the purposes of this template, it is version controlled.  However,
upon forking this project, you shouldn't keep it version controlled.  To
remove it from your git repository, issue the following command:

```
git rm --cached .env
```

Then create a `.gitignore` file with the following entry:

```
.env
```


