# 📱 MERN Social Media App

A modern full-stack social media application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js), featuring **user authentication(JWT stored in cookies)**, **image uploads**, **visibility settings**, **public feeds**, and **Redux Toolkit** state management.

---

### 🛠️ Tech Stack

| Frontend     | Backend    | Others        |
| ------------ | ---------- | ------------- |
| React.js     | Express.js | Redux Toolkit | 
| Axios        | Node.js    | Multer        |
| React Router | JWT        | Tailwind CSS  |
| React Hooks  | MongoDB    | Cookie-parser |

---

## ✨ Features

### 🔐 Authentication & User Management
- JWT authentication via **HTTP-only cookies**
- Secure login, registration, logout
- Auto-login on page refresh via cookie validation
- Route protection using middleware
- Clear cookies and handle expiration

### 🖼️ Posts
- Create post with:
  - `title`
  - `description`
  - `visibility`: `public` or `private`
  - `image` (stored in MongoDB as buffer)(image is optional)
- Lazy loading / "Load More" for performance
- Image previews with loading indicator
- Upload validation (file type, size)

### 📂 Feed & Display
- **Public feed** with posts from all users
- **User dashboard** for managing personal posts
- Filter only public posts on feed
- Paginated post retrieval with load more button
- Conditional rendering based on page/route

### 📦 State Management (Redux Toolkit)
- Global state for user auth, post data, and loading state
- Async thunk actions for API calls
- Cache responses & support optimistic UI

### 🎨 UI/UX
- Styled using **Tailwind CSS**
- Centered loaders and spinners
- Alerts/toasts for success & error feedback
- Dark mode support
- Responsive for desktop and mobile

### 🧰 Developer Friendly
- Organized folder structure
- Middleware: auth, error handler
- Uses `multer` for file uploads
- Environment-based config support
- Logs and debug-friendly messages

### 🛡️ Security
- JWT-based token system
- Cookie validation on every request
- File type checks on image upload
- Sanitization of user inputs

---


### 🖼️ Example Post Data

```json
{
  "title": "First Post",
  "description": "This is my first post!",
  "visibility": "public",
  "image": "Binary image data"
}
```

---



### 📄 License

This project is open source and free to use. MIT License.