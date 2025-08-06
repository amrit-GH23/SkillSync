# SkillSync 💡🔗

SkillSync is a web-based platform that connects individuals based on the **skills they have** and the **skills they want to learn**. Users can showcase their existing skills, discover others who possess skills they are looking to acquire, and collaborate, connect, or mentor each other. Built with **React**, **Django REST Framework** and **Tailwind CSS**, , SkillSync fosters a collaborative learning community.

---

## 🌟 Features

- 🚀 **Skill Matching** – Connect users based on skill exchange (have vs. want).
- 🧠 **Skill Selection** – Choose from a predefined list or add custom skills.
- 💬 **Real-Time Chat** – Instantly message other users for collaboration.
- 🔐 **JWT Authentication** – Secure login/signup system.
- 🧾 **User Profile** – Manage skills, connections, and personal information.
- 🌐 **Responsive Design** – Fully responsive UI with Tailwind and shadcn/ui.

---

## 🛠️ Tech Stack

| Frontend             | Backend           | Styling        | Others              |
|----------------------|-------------------|----------------|---------------------|
| React (Vite)         | Django REST API   | Tailwind CSS   | JWT Authentication |

---

## ⚙️ Installation Guide

### 📦 Backend Setup (Django)

```bash
git clone https://github.com/amrit-GH23/SkillSync.git
cd skillsync/backend

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Run server
python manage.py runserver
```
### 🌐 Frontend Setup (React + Vite)

```bash
cd ../frontend

# Install dependencies
npm install

# Setup environment variables
echo "VITE_API_URL=http://localhost:8000" > .env

# Run frontend
npm run dev
```
### 🔐 Environment Variables
Frontend:
VITE_API_URL – Backend base URL (e.g., http://localhost:8000 or production URL)

Backend (for production):
SECRET_KEY 
DEBUG
ALLOWED_HOSTS
CORS_ALLOWED_ORIGINS

### 📁 Folder Structure
skillsync/ <br>
├── backend/  <br>
│   ├── api/ <br>
│   └── backend/ <br>
├── frontend/ <br>
│   ├── src/ <br>
│   │   ├── components/ <br>
│   │   ├── pages/ <br>
│   │   

---

### Screenshots

<img width="1742" height="956" alt="Screenshot 2025-08-06 163017" src="https://github.com/user-attachments/assets/97b043d8-27b2-421d-ba8a-002497e91bcd" />

<img width="1348" height="956" alt="image" src="https://github.com/user-attachments/assets/52b818f9-3c14-40e8-a4ce-5137e7c0b276" />

<img width="961" height="959" alt="Screenshot 2025-08-06 163029" src="https://github.com/user-attachments/assets/f9d3eb86-4427-4702-a1cc-fe92f7a58588" />


---
🚀 Deployment <br>
Frontend: Hosted on Vercel <br>
Backend: Deployed via Railway or compatible Django server

🙋‍♂️ Author <br>
Amrit Kumar <br>
GitHub: https://github.com/amrit-GH23 <br>
LinkedIn: https://linkedin.com/in/amritkumar2


