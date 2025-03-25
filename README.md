# 🎥 MovieHub

MovieHub is a web application that allows users to explore and discover the best and most popular movies from various genres. With this platform, users can search for specific movies, filter movies by genre, and explore details such as ratings, descriptions, and more.

---

## 🌟 Features

- **Search Movies**: Users can search for movies by their titles.
- **Filter by Genre**: Users can filter movies by genre, including Action, Adventure, Comedy, Drama, Horror, and more.
- **Movie Details**: Each movie includes key information such as its title, genre, rating, runtime, description, and release date.
- **Like/Dislike Buttons**: Users can express their opinion on movies by liking or disliking them.

---

## 📑 Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [Project Architecture](#project-architecture)
6. [Features](#features)
7. [Setting Up The Project](#setting-up-the-project)
8. [Conclusion](#conclusion)

---

## 🛠️ Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/NK-Adeodatus/web-infrastructure-summative
   ```

2. Open the index.html file in your browser:

   ```bash
   open index.html
   ```

No additional installation of dependencies is required as this is a static front-end project.

## 🚀 Usage

Once the project is up and running, follow these steps to navigate the site:

- **Search Movies**: Use the search bar at the top of the page to search for a specific movie by title.
- **Filter by Genre**: Use the genre filter buttons to explore movies from different categories such as Action, Comedy, Drama, etc.
- **Like/Dislike Movies**: Click on the 'Like' or 'Dislike' buttons to express your preference for a movie.
- **View Movie Details**: Click on a movie to view its detailed information such as description, rating, runtime, and more.

## 🛠️ Technologies Used

- **HTML**: Used for the structure of the web pages.
- **CSS**: Used for styling the user interface and making the app responsive.
- **JavaScript**: Handles the dynamic aspects of the web page, including fetching data, filtering movies, and rendering content.
- **Local Storage**: Stores movie data and filters to provide a faster browsing experience.
- **Fetch API**: Retrieves movie data from an external API.

## 🤝 Contributing

Contributions are welcome! If you want to improve this project, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a pull request.

Please make sure to follow the coding standards and include tests for any new features you add.

## Project Architecture

1. Web Servers
The project is cloned from GitHub and deployed on two web servers:

web-01

web-02

Both servers are configured to run the application using Nginx as the web server. Nginx handles the incoming requests and serves the content efficiently.

2. Load Balancer
A single load balancer, lb-01, is used to distribute user requests between the two servers (web-01 and web-02). This load balancing mechanism ensures that traffic is evenly distributed, optimizing server performance and increasing the application's reliability. If one server becomes unavailable, the other server will continue to handle requests, ensuring uptime.

3. IMDb API
The application integrates the IMDb Data API from RapidAPI, provided by OctopusTeam. This API allows access to a wide variety of IMDb data, including information on movies, TV shows, ratings, and more. The API is known for its lightning-fast performance, high reliability, and ease of integration.

API Overview:
Service: IMDb Data API

Provider: OctopusTeam

Purpose: Provides access to IMDb data, including movies, TV shows, ratings, and more.

Key Features:

High performance

Reliable

Easy integration with the project

4. Infrastructure Setup
The application was set up by following these steps:

Cloning the Project: The project repository was cloned from GitHub onto the two web servers (web-01 and web-02).

Hosting with Nginx: Both web servers are configured with Nginx to serve the application efficiently.

Load Balancer Setup: lb-01 load balancer was configured to evenly distribute incoming traffic between web-01 and web-02, ensuring optimal server performance and fault tolerance.

API Integration: The IMDb API is called to retrieve and display real-time data to users, ensuring the application is dynamic and up-to-date.

## Features

Real-time access to IMDb movie and TV show data

Load balancing across two web servers for improved performance and availability

Fast and reliable API integration from RapidAPI

## Setting Up The Project

Steps to Get the project up and running on the servers, follow the steps below:


1. Set Up Nginx on Web Servers
Install and configure Nginx on both web-01 and web-02.

Make sure Nginx is set up to serve the application files on both servers.

2. Set Up the Load Balancer
Configure the load balancer (lb-01) to distribute traffic evenly between web-01 and web-02.

3. Clone the Repository
   ```bash
   git clone https://github.com/NK-Adeodatus/web-infrastructure-summative
   ```

4. Start the Application
Once the files of the are in the /var/www/html directory the servers start hosting the website, and the load balancer will begin handling incoming traffic.

## Conclusion

This project leverages modern infrastructure and APIs to provide an interactive experience for users looking to explore IMDb data. The setup ensures high availability and scalability, providing a seamless user experience.




