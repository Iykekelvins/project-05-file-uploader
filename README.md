# 📁 File Uploader App

A full-stack file management application built with Express, Prisma, and EJS.
Users can create folders, upload files, preview them, and manage their storage in a structured and secure way.

---

## 🚀 Features

### 🔐 Authentication

- User registration and login using Passport
- Password hashing with bcrypt
- Session-based authentication

### 📂 Folder Management

- Create, view, and delete folders
- Case-insensitive duplicate prevention
- User-specific folder ownership

### 📄 File Management

- Upload files into specific folders using Multer
- File size and type validation
- Store file metadata in database (name, path, size, MIME type)

### 🖼 File Preview System

Supports dynamic previews based on file type:

- Images (PNG, JPG, etc.)
- Videos
- Audio
- PDFs
- Text files

Fallback for unsupported formats with download option

### 🖼 Image Thumbnails

- Automatically generated for image uploads using Sharp
- Displayed in folder view for better UX

### 🗑 Deletion System

- Delete individual files (removes from disk + database)
- Delete folders (removes all contained files recursively)

### 🔐 Secure File Access

- Files are NOT publicly accessible
- Protected routes ensure only the owner can access files

---

## 🧱 Tech Stack

- Backend: Node.js, Express
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Passport.js
- File Uploads: Multer
- Image Processing: Sharp
- Templating: EJS
- Styling: Custom CSS

---

## 📂 Project Structure

```
.
├── prisma/
│   └── schema.prisma
├── uploads/              # Stored files (ignored in git)
├── views/                # EJS templates
├── routes/               # Express routes
├── lib/
│   ├── prisma.js
│   └── multer.js
├── public/
│   └── styles.css
├── app.js
```

---

## ⚙️ Installation

### 1. Clone repository

```
git clone https://github.com/Iykekelvins/project-05-file-uploader.git
cd project-05-file-uploader
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```
DATABASE_URL=your_postgres_connection
SESSION_SECRET=your_secret
PORT=8000
```

---

### 4. Setup database

```
npx prisma migrate dev
npx prisma generate
```

---

### 5. Run the app

```
npm run dev
```

App runs on:

```
http://localhost:8000
```

---

## 📌 Key Implementation Details

### 📁 Folder Isolation

Each folder has its own directory:

```
uploads/<folderId>/
```

---

### 📄 File Storage

- Files are stored locally
- Paths are saved in the database
- Access is controlled via authenticated routes

---

### 🔐 Security

- File access is restricted to owners
- No direct static exposure of upload directory
- Validation on uploads (size + type)

---

### 🧠 Database Design

- User → Folder (1:N)
- Folder → File (1:N)

---

## 📈 Future Improvements

- Nested folders (folder hierarchy)
- Drag-and-drop uploads
- File search functionality
- Cloud storage integration
- UI enhancements (React frontend)

---

## 👨‍💻 Author

Built as a full-stack learning project.
