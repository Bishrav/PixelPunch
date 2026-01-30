# PixelPunch: The Future of Digital Dealerships

**PixelPunch** is a cutting-edge full-stack web application designed to revolutionize the automotive e-commerce experience. Built with a futuristic "cyber-sleek" aesthetic, it merges high-performance web technologies with robust backend architecture to create a seamless platform for browsing, buying, and selling premium vehicles.

The platform provides an end-to-end solution for users to explore exclusive collections, claim time-limited offers, and manage their automotive portfolio through a powerful real-time dashboard.

---

## 🚀 Key Features

### 🌟 Immersive Frontend
- **Dynamic 3D-style Animations**: Powered by custom CSS and JavaScript for a premium feel.
- **Interactive Showroom**: Browse extensive car collections with advanced filtering and search.
- **Responsive Design**: optimized for all devices, delivering a consistent "wow" factor.
- **Real-time User Feedback**: Instant toast notifications and smooth transitions.

### 💼 Comprehensive Dashboard
- **Analytics & Reporting**: Integrated **Chart.js** visualizations for revenue, sales trends, and inventory stats.
- **Inventory Management**: Add, remove, and manage vehicle listings effortlessly.
- **Offer System**: Create and deploy special discount offers with automated expiry tracking.
- **Activity Logging**: Full audit trail of all user actions (purchases, sales, logins) tracked in real-time.

### 🔐 Secure Authentication
- **OAuth Integration**: Seamless clear access via **Google** and **GitHub**.
- **JWT Implementation**: Stateless, secure session management with token-based authentication.
- **Role-Based Access**: Protected routes ensuring admin-level features are secure.

---

## 🛠️ Technology Stack

### **Frontend (Client)**
- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Styled Components & Custom CSS3
- **Visualization**: [Chart.js](https://www.chartjs.org/) & react-chartjs-2
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library
- **Networking**: Axios for optimized API consumption

### **Backend (Server)**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL / SQLite with [Sequelize ORM](https://sequelize.org/)
- **Authentication**: [Passport.js](https://www.passportjs.org/) (Strategies: Google, GitHub, Local)
- **Security**: BCrypt for hashing, CORS protection, and Dotenv configuration
- **Testing**: [Jest](https://jestjs.io/) & Supertest for API endpoint validation

---

## 🧪 Testing Strategy

PixelPunch maintains high reliability through a dual-layer testing strategy:

1.  **Unit & Component Testing (Frontend)**:
    -   Uses **Vitest** for blazing-fast test execution.
    -   Validates UI components (`Login`, `Register`, `Dashboard`) are rendering correctly.
    -   Ensures critical user flows (like button clicks and form submissions) function as expected.

2.  **Integration & API Testing (Backend)**:
    -   Uses **Jest** and **Supertest** to simulate HTTP requests.
    -   Verifies all API endpoints (`/auth`, `/cars`, `/offers`) return correct status codes and payloads.
    -   Validates database operations including CRUD actions and relationship integrity.

---

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Bishrav/PixelPunch.git
    cd PixelPunch
    ```

2.  **Install Dependencies**:
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup**:
    -   Create `.env` in `server/` with your DB credentials, JWT Cloud secrets, and OAuth keys.

4.  **Run the Application**:
    ```bash
    # Start Backend
    cd server
    npm run dev

    # Start Frontend
    cd client
    npm run dev
    ```

---

_PixelPunch represents the synthesis of modern design and robust engineering—built for speed, security, and scale._
