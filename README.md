# 🎯 Aligna


Intelligent Task Scheduling Powered by MeTTa Logical Reasoning

Features • Installation • Documentation • Contributing

</div>

## 🌍 Overview

**Aligna** is a revolutionary smart task scheduling and management platform that automatically prioritizes and arranges tasks based on deadlines, dependencies, and importance. Unlike traditional to-do list apps, Aligna uses intelligent scheduling with MeTTa's logical reasoning to generate the most efficient execution order, ensuring prerequisite tasks are completed on time and urgent tasks are never missed.

## ✨ Key Features

### 🔄 Smart Task Alignment
- Automatically prioritizes tasks by urgency, importance, and dependencies using MeTTa's logical reasoning
- Ensures dependent tasks are completed in logical sequence with constraint-based scheduling
- Dynamically optimizes deadlines to prevent missed or late tasks

### 🤖 Intelligent Automation
- Adapts in real time when new tasks are added or deadlines change
- Provides clear next-task recommendations to guide daily productivity
- Balances workload for efficient time management across projects

### 📊 Real-time Analytics
- Interactive graph-based visualization of task dependencies and timelines
- Dynamic task list that updates instantly as tasks are completed
- Comprehensive analytics dashboard for productivity insights and trends

### 🔐 Secure Data Management
- Robust user authentication and authorization system
- Encrypted task data storage for privacy and security
- Role-based access control for team collaboration features

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-990000?style=for-the-badge&logo=django&logoColor=white)

### AI/Logic Engine
![MeTTa](https://img.shields.io/badge/MeTTa-000000?style=for-the-badge&logo=metta&logoColor=white)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Getting Started

### Prerequisites

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aligna.git
   cd aligna
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   Create `.env` files in both `backend` and `frontend` directories with your configuration.

5. **Set up database:**
   ```bash
   cd ../backend
   python manage.py migrate
   ```

6. **Run the development servers:**
   ```bash
   # Terminal 1 - Start backend
   python manage.py runserver
   
   # Terminal 2 - Start frontend
   cd ../frontend
   npm start
   ```

## 👥 The Team

| Name | Role | Contact |
|------|------|---------|
| Francis Masila | Lead Developer | [francismaki14@gmail.com](mailto:francismaki14@gmail.com) |
| Mogaka Mokaya | Frontend Developer | [mokayaj857@gmail.com](mailto:mokayaj857@gmail.com) |
| John Mokaya | Smart Scheduling Logic | [mokayaj857@gmail.com](mailto:mokayaj857@gmail.com) |

## 📈 Project Milestones

### 🎨 UI/UX Design Completion
- Intuitive dashboard for task management
- Visual dependency graph representation
- Responsive design for all devices

### ⚙️ Core Scheduling Engine
- MeTTa integration for logical task reasoning
- Dependency resolution system
- Priority calculation algorithms

### 🔄 Real-time Synchronization
- Live updates across user sessions
- Conflict resolution for concurrent edits
- History and version tracking

### 📊 Analytics Implementation
- Productivity metrics and insights
- Performance tracking and reporting
- Export functionality for data analysis

## 🧠 MeTTa Integration

### 🚀 Why MeTTa?
- **Logical Reasoning:** Advanced constraint solving for optimal task scheduling
- **Flexibility:** Adaptable to complex dependency structures
- **Efficiency:** High-performance reasoning for real-time updates

### 🔧 Implementation Strategy
- MeTTa engine handles complex task dependency resolution
- REST API bridge between Django backend and MeTTa reasoning engine
- Caching layer for frequently accessed scheduling results

## 🔮 Vision

Aligna aims to transform personal and team productivity by moving beyond simple to-do lists to intelligent, adaptive scheduling that understands how tasks relate to each other and optimizes your workflow automatically.

## 📊 Project Status

![Development Status](https://img.shields.io/badge/Status-Active_Development-orange?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Test Coverage](https://img.shields.io/badge/Coverage-70%25-yellow?style=for-the-badge)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MeTTa community for the powerful logical programming environment
- Django and React communities for excellent documentation and support
- Open-source contributors whose work made this project possible
