# LMVerse

LMVerse is a modern Learning Management System (LMS) built with **Next.js 16**, **React 19**, **TypeScript**, and **Supabase**. It provides a scalable platform for creating, managing, and purchasing online courses with support for multiple user roles, secure authentication, file storage, payments, and multilingual content.

---

## ✨ Features

* 📚 Course creation and management
* 🎥 Video lessons and downloadable resources
* 👨‍🏫 Instructor dashboard
* 👨‍🎓 Student dashboard
* 🔐 Secure authentication and authorization
* 💳 Course payments and enrollment
* 🌍 Internationalization (i18n)
* 📁 Object storage for course files and thumbnails
* 📊 Progress tracking
* 📱 Responsive design
* ⚡ Built with the Next.js App Router

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Shadcn/UI
* React Hook Form
* Zod
* TanStack Query
* Zustand

### Backend

* Next.js Server Actions
* Route Handlers
* Supabase

### Authentication

* Supabase Auth

### Storage

* S3-Compatible Object Storage (Selectel)

---

## Application Roles

LMVerse currently supports multiple user roles:

* Student
* Instructor
* Administrator

Each role has its own dashboard and permissions.

---

## Architecture

LMVerse follows a feature-oriented architecture to improve scalability and maintainability.

Core principles include:

* Server Components by default
* Client Components only when necessary
* Feature-based organization
* Server Actions for mutations
* Type-safe database access
* Reusable UI components
* Separation of business logic from presentation

---

## Future Features

* Course reviews and ratings
* Certificates
* Quizzes and exams
* Assignments
* Live classes
* Notifications
* Discussion forums
* AI-powered learning assistant
* Analytics dashboard
* Mobile application

## License

This project is licensed under the MIT License.

---

## Author

Developed as part of the **LMVerse** platform.
