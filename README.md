# Pleiades Network Performance Dashboard

## Project Overview

This project is a web-based dashboard designed to visualize and analyze network performance data collected during different sessions. Users can log in to view detailed metrics such as download/upload rates, signal strength, and latency through interactive charts, a searchable data table, and a geographical map.

## Features

- **User Authentication**: Secure login and signup functionality to manage user access.
- **Session Management**: A sidebar displays a list of available data collection sessions, allowing users to select and view data for a specific session.
- **Interactive Dashboard**: The main interface is a multi-tab dashboard that includes:
  - **Charts**: Dynamic line charts for visualizing performance metrics over time and a pie chart to show the distribution of different network technologies. Metrics displayed can include download rate, upload rate, ping, and SMS delivery time.
  - **Data Table**: A searchable and paginated table that displays detailed session records. It supports sorting and custom formatting for better readability. The table also uses color-coding to indicate the quality of different metrics like download rate, ping, and signal strength.
  - **Map**: A component to visualize data points on a map, allowing users to filter what is displayed based on continuous and discrete metrics.
- **Data Filtering**: A dedicated filter sidebar allows users to select which performance metrics they want to visualize on the dashboard.

## Technologies Used

- **Frontend**:
  - React
  - Chakra UI: Likely used for styling and components.
  - Recharts: Used for creating the line and pie charts.
  - Axios: A library for making API requests to fetch session and drive data.
- **Backend**: The application interacts with a backend server for authentication and data retrieval.

## Getting Started

### Prerequisites

- Node.js
- NPM
- A running backend server that provides the necessary API endpoints.

### Installation

1.  Clone the repository:
    ```sh
    git clone [your-repo-url]
    cd [your-project-directory]
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```

The application should now be running at `http://localhost:5173`.
