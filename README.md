# Guide on how to start a project

> Note this project is setup using monorepo architecture (NX) workflow

This repo contains both backend and UI portion of a project itself so, this readMe will guide user on how to get started.

## Backend portion
Backend project is created using Node.Js framework called [Express.Js](https://expressjs.com). And for the project folder architecture it follows MVC pattern. For the database this project use [MongoDB](https://www.mongodb.com) which is a NoSQL database and for the file storage it use AWS S3 bucket with cloudfront.

## How to start a project
Here's a quick way to start Backend

```
git clone <project_url>
```
```
yarn
```
For Development Version
```
yarn start:backend
```
For Built/Production Version
```
yarn build:backend
```
After the build is success, all the built files are stored under the dir name dist
```
cd dist/apps/practitioner-backend
```
```
node main.js
```

## UI portion (Frontend)
Frontend project is created using react framework called [Next.Js](https://nextjs.org). For the styling it use [TailwindCss](https://tailwindcss.com).
To understand more about project folder structures please scroll down to folder structure sections.

### How to start a project
Here's a quick way to start UI 

```
git clone <project_url>
```
```
yarn
```
For Development Version
```
yarn start:ui
```
For Built/Production Version
```
yarn build:ui
```
After the build is success, all the built files are stored under the dir name dist
```
cd dist/apps/practitioner-ui
```
```
npm start
```

