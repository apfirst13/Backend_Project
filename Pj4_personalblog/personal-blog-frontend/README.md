# Personal Blog Application (Decoupled Architecture)

เว็บแอปพลิเคชันบล็อกส่วนตัวที่พัฒนาขึ้นโดยแยกส่วนการทำงานระหว่างหน้าบ้าน (Frontend) และหลังบ้าน (Backend) ออกจากกันอย่างเด็ดขาด เชื่อมต่อข้อมูลผ่าน RESTful API และจัดเก็บข้อมูลในระบบฐานข้อมูลระดับโปรดักชัน

## คุณสมบัติของระบบ (Key Features)

### ฝั่งผู้ดูแลระบบ (Backend & Admin Management)
- พัฒนาด้วย Node.js และ Express.js
- ระบบฐานข้อมูล PostgreSQL รันบน Docker Container ปลอดภัยด้วยระบบ Parameterized Query เพื่อป้องกัน SQL Injection
- จัดเก็บรหัสผ่านและค่าคอนฟิกต่างๆ ผ่าน Environment Variables (.env)
- ระบบตรวจสอบสิทธิ์ผู้ดูแลระบบ (Authentication) ด้วย Session และสร้าง Custom Middleware เป็นด่านตรวจความปลอดภัยก่อนเข้าหน้าควบคุม
- ระบบจัดการข้อมูลบทความครบวงจร (CRUD: Create, Read, Update, Delete) ผ่าน EJS Templates หน้าหลังบ้าน

### ฝั่งผู้ใช้งานทั่วไป (Frontend SPA)
- พัฒนาด้วย React และใช้งาน Vite เป็นเครื่องมือจัดเตรียมระบบ (Build Tool)
- จัดการเส้นทางในเว็บ (Client-Side Routing) ด้วย React Router DOM สลับหน้าเว็บได้อย่างรวดเร็วโดยไม่ต้องรีโหลดหน้าจอใหม่
- ดึงข้อมูลดิบในรูปแบบ JSON มาแสดงผลผ่านการเรียกใช้งาน RESTful API ข้ามโดเมนอย่างปลอดภัยด้วยการตั้งค่า CORS
- จัดการหน้าจอและเลย์เอาต์มินิมอลด้วย Tailwind CSS (v4) รองรับการแสดงผลทุกขนาดหน้าจอ

## เทคโนโลยีที่ใช้งาน (Tech Stack)

- **Frontend:** React, Vite, React Router DOM, Tailwind CSS
- **Backend:** Node.js, Express.js, Express Session, EJS (Hybrid Configuration)
- **Database:** PostgreSQL (Docker Container)
- **Tools & Systems:** Docker, Git, npm, dotenv

## ขั้นตอนการติดตั้งและรันระบบ (Setup & Installation)

### 1. การเตรียมระบบฐานข้อมูล (Database Setup)
เปิดใช้งานโปรแกรม Docker Desktop และรันคำสั่งเพื่อสร้างและสตาร์ทตารางข้อมูล PostgreSQL ผ่านพอร์ต 5434:
```bash
docker run --name local-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5434:5432 -d postgres




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

