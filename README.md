# 📅 WhatsApp Auto Message Scheduler

A powerful full-stack application designed to schedule automated WhatsApp messages for special occasions like birthdays 🎂, anniversaries 💍, and more! Powered by **Twilio** for messaging and **Cloudinary** for media handling. 🚀

---

## 🛠️ Tech Stack

### **Frontend** 💻
- **React** (via Vite) ⚛️ - Fast and modern UI library
- **TailwindCSS** 🎨 - Utility-first CSS framework for beautiful designs
- **React Icons** 🎭 - Comprehensive icon library
- **Axios** 🌐 - HTTP client for API requests

### **Backend** 🟢
- **Node.js & Express** 🚂 - Robust server-side runtime and framework
- **MongoDB & Mongoose** 🍃 - NoSQL database for flexible data storage
- **Node-cron** ⏰ - Task scheduler for automated messages
- **Multer** 📂 - Middleware for handling multipart/form-data

### **Services & APIs** ☁️
- **Twilio** 💬 - WhatsApp messaging API
- **Cloudinary** 📸 - Cloud image and media management

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory and add the following secrets:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_whatsapp_number # e.g., whatsapp:+14155238886

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note:** Never share your `.env` file! It is ignored by git for security. 🛡️

---

## 🚀 How to Run the Project

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    ```

2.  **Install Dependencies**
    Open two terminals (Powershell or Command Prompt) for Frontend and Backend.

    **Backend:**
    ```bash
    cd backend
    npm install
    npm run dev
    ```

    **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  **Access the App**
    Open your browser and navigate to the URL shown in the frontend terminal (usually `http://localhost:5173`). ✨

---

## ✨ Features

- **🗓️ Smart Scheduling:** Schedule messages for specific dates and times.
- **🖼️ Media Support:** Send images along with your heartfelt messages.
- **🤖 Automated Delivery:** Cron jobs ensure your messages are sent on time, every time.
- **💅 Beautiful UI:** A clean and responsive interface built with TailwindCSS.

---

Happy Scheduling! 💌
