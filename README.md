# TechX Frontend Next.js Application Documentation

TechX is a Next.js application for technology enthusiasts to share knowledge, insights, and innovations. This guide provides a detailed overview of the project structure, setup instructions, and how to run the application locally.

---

## Project Structure

The TechX frontend application follows a clear and modular structure to keep the code organized:

- **`src/`**: Contains all the source files for the application.
  - **`app/`**: Holds the main pages and components used across the application.
    - **`about/`**: Contains the "About Us" page.
    - **`contact/`**: Contains the "Contact Us" page.
    - **`post/`**: Contains the pages for individual blog posts.
    - **`privacy/`**: Contains the "Privacy Policy" page.
    - **`terms/`**: Contains the "Terms and Conditions" page.
  - **`components/`**: Reusable UI components.
  - **`hooks/`**: Custom React hooks for managing state and data fetching.
  - **`public/`**: Static files like images and fonts.
  - **`styles/`**: CSS and Tailwind configuration files.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **Yarn**

---

## Installation

Follow these steps to set up the TechX frontend application locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   If you are using `npm`:
   ```bash
   npm install
   ```
   Or if you are using `Yarn`:
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - Add the necessary environment variables as specified in the `.env` file.

---

## Running the Application

To run the application locally:

1. Start the development server using:

   If you are using `npm`:
   ```bash
   npm run dev
   ```
   Or if you are using `Yarn`:
   ```bash
   yarn dev
   ```

2. Open [https://tech-blog-frontend.vercel.app/](https://tech-blog-frontend.vercel.app/) in your browser to view the application.

---

## Building for Production

To create a production build:

1. Run the build command:

   If you are using `npm`:
   ```bash
   npm run build
   ```
   Or if you are using `Yarn`:
   ```bash
   yarn build
   ```

2. This will create a `.next` directory containing production assets.

3. To start the production server:

   If you are using `npm`:
   ```bash
   npm start
   ```
   Or if you are using `Yarn`:
   ```bash
   yarn start
   ```

---

## Additional Scripts

- **Linting**: Run ESLint to check for linting errors:
  
  If you are using `npm`:
  ```bash
  npm run lint
  ```
  Or if you are using `Yarn`:
  ```bash
  yarn lint
  ```

---

## Contributing

Contributions to the TechX project are welcome. Please ensure that you follow the coding standards and guidelines outlined in the `CONTRIBUTING.md` file.

---

## License

TechX is released under the MIT License. See the `LICENSE` file for more details.

---

## Contact

For any queries or feedback, reach out to us at [contact@tecx.com](mailto:contact@tecx.com).

---

This documentation provides all the essential information to get started with the TechX frontend application. For more detailed insights into the codebase, refer to the inline comments and additional READMEs within the project directories.