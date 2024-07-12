# Discord Clone

## Overview

This application replicates many of the core features of Discord, providing a comprehensive platform for real-time communication and community building. This clone demonstrates advanced web development techniques and real-time functionality.

## 🌐 Live Demo

Experience the application in action: [Discord Clone](discord-clone-production-e92c.up.railway.app)

## 🚀 Quick Start

1. Clone the repository or download the zip file
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features

### 🖥️ Server Creation
- Users can create their own servers
- Custom server image upload
- Invite users with shareable URLs

### 💬 Real-Time Chat
- Instant messaging using WebSockets
- Message editing and deletion
- Admin and Moderator controls for message management

### 📎 File Attachments
- Support for uploading and sharing various file types (PDF, images, etc.)
- Real-time file transfer to all users in the channel

### 🎥 Video and Audio Channels
- Create and join video channels for face-to-face communication
- Audio-only channels for voice communication
- Screen sharing capabilities
- In-call chat functionality

### 👥 User Management
- Admin and moderator roles
- User permission management (kicking users, assigning roles)
- Moderator abilities (message deletion, channel creation/editing)

### 🔍 Search Functionality
- Quick search for channels and members
- Shortcut commands for efficient navigation

### 💌 Private Messaging
- One-on-one conversations
- Video call functionality in private chats

### 🔄 Infinite Loading
- Efficient message and image loading using React Query
- Optimized performance for large chat histories

### 🟢 Real-Time Status Updates
- Live connection status indicator
- Fallback to polling when WebSocket fails

### 🌓 Dark and Light Modes
- Toggle between dark and light themes for user preference

### 📱 Responsive Design
- Fully responsive layout
- Seamless experience across desktop, tablet, and mobile devices

## Tech Stack

- Next.js
- Zustand
- Socket.io
- TanStack Query
- Prisma
- Tailwind CSS
- PostgreSQL