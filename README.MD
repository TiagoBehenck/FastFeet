<h1 align="center">
  <img alt="FastFeet" title="FastFeet" src=".github/logo.png" />
</h1>

<h3 align="center">
Order and delivery management
</h3>

<p align="center">
  <a href="#pencil-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#octocat-how-to-contribute">How to contribute</a>
</p>

<p align="center">

  <a href="https://github.com/tiagobehenck">
    <img alt="Made by Tiago" src="https://img.shields.io/badge/made%20by-Tiago Behenck-%237d40e7">
  </a>

  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/TiagoBehenck/FastFeet?color=%237d40e7">
 
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/TiagoBehenck/FastFeet?color=%237d40e7">

   <img alt="Languagues" src="https://img.shields.io/github/languages/count/TiagoBehenck/FastFeet?color=%237d40e7">

  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/TiagoBehenck/FastFeet?color=%237d40e7">

  <img alt="GitHub stars" src="https://img.shields.io/github/stars/TiagoBehenck/FastFeet?color=%237d40e7" />

</p>

## :pencil: About the project

FastFeet is an application that aims to manage orders as well as their deliverers from a logistics company.

The project was developed over the GoStack, <a href="https://rocketseat.com.br">Rocketseat</a> course. It is the final challenge for class 10 of BootCamp.

## :wrench: Installation

### :satellite: Backend

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=FastFeet%20API&uri=https%3A%2F%2Fgithub.com%2FTiagoBehenck%2FFastFeet%2Fblob%2Fmaster%2Fbackend%2FInsomnia.json)

```
  // 1 - Git Clone
  git clone https://github.com/TiagoBehenck/FastFeet

  // 2 - Copy the .env.example and set the environment variables
  cp .env.example .env

  // 3 - Run the services (Be sure to have docker and docker-compose installed)
  docker-compose up -d

    // If dont start de containers, run manually
    docker run --name fastfeetredis -p 6379:6379 -d -t redis:alpine
    docker run --name fastfeetdatabase -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11


  // 4 - Once the services are running, its time to install the dependencies
  yarn install

  // 5 - With the database ok, just populate the tables
  yarn populate

  // 6 - Run the application
  yarn dev

  // 7 - Run the application queue for the mail job
  yarn queue
```

### :computer: Web

```
  // 1 - Git Clone
  git clone https://github.com/TiagoBehenck/FastFeet

  // 2 - Copy the .env.example and set the environment variables
  cp .env.example .env

  // 3 - Installing the dependencies
  yarn install

  // 4 - Run the application (Be sure to have the API running locally)
  yarn start

```

### :iphone: Mobile

```
  // 1 - Git Clone
  git clone https://github.com/TiagoBehenck/FastFeet

  // 2 - Copy the .env.example and set the environment variables
  cp .env.example .env

  // 3 - Installing the project (Be sure to have installed the react native cli)
  yarn install

   // If you're going to emulate with android - run this command
   react-native run-android
   // If you're going to emulate with ios - run this command
   react-native run-ios

  // 4 - Run the application (Be sure to have the API running locally)
    react-native start

  // If usually use have some error, try it
    yarn start --reset-cache

  // If the images do not appear, turn the command
    adb reverse tcp:3333 tcp:3333 // API
    adb reverse tcp:8081 tcp:8081 // App
    adb reverse tcp:9090 tcp:9090 // Reactotron
```

_The application was tested using the Android Studio emulator_

## :octocat: How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`;

Made with ♥ by Tiago :wave: [See my linkedin!](https://www.linkedin.com/in/tiago-behenck-dos-santos/)
