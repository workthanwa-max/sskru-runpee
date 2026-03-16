# 🎓 SSKRU Advanced Management System

A clean and simple management system for SSKRU, built with a modern tech stack and streamlined architecture (Pure pnpm Workspaces).

---

## ✨ Features (ความสามารถหลัก)

- **🚀 Admission Hub**: ระบบรับสมัครงานที่ใช้งานง่าย พร้อมกระบวนการสมัครเรียนแบบ 6 ขั้นตอน
- **📋 Academic Portal**: จัดการหลักสูตร (Curriculum Management) ยื่นคำร้องขอเปิด/ปรับปรุงหลักสูตร
- **✅ Quality Assurance**: ระบบอนุมัติหลักสูตรตามลำดับชั้นความสำคัญ
- **🛡️ Admin Center**: จัดการบุคลากร, คณะ และสิทธิ์การใช้งาน (RBAC)

---

## 🏗️ Clean & Simple Tech Stack

เราเน้นความเรียบง่ายและเสถียรภาพ เพื่อให้ดูแลรักษาง่ายที่สุด:

- **Frontend**: `Next.js 14` (App Router) + `Mantine UI`
- **Backend**: `NestJS` (Standard Service-Repository Pattern)
- **Database**: `PostgreSQL 16`
- **Storage**: `Local Disk` (เก็บไฟล์ไว้ที่ `apps/backend/uploads`)
- **Package Manager**: `pnpm` (Workspaces)

---

## 📁 Project Structure (โครงสร้างโฟลเดอร์)

```text
sskru-main/
├── apps/
│   ├── frontend/         # 💻 Next.js Web App
│   └── backend/          # ⚙️ NestJS API
└── docker-compose.yml    # Database configuration
```

---

## 🚀 Getting Started (การเริ่มต้นใช้งาน)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

สร้างไฟล์ `.env` ใน `apps/frontend` และ `apps/backend` (ดูจาก `.env.sample`)

### 3. Start Database

```bash
docker-compose up -d db
```

### 4. Setup Database Schema

```bash
# Backend commands
pnpm --filter backend run db:generate
pnpm --filter backend run db:migrate
pnpm --filter backend run db:seed
```

### 5. Run Application

```bash
# Run Frontend
pnpm --filter frontend run dev

# Run Backend
pnpm --filter backend run dev
```

---

## 🛠️ Development Workflow

โปรเจกต์นี้ใช้ **pnpm workspaces** มาตรฐาน:

- จัดการ Dependencies แยกตามแอปได้ชัดเจน
- รันคำสั่งผ่าน `--filter` เพื่อระบุแอปที่ต้องการ
- สะอาดและดูแลรักษาง่ายที่สุด ไม่มีเลเยอร์ซับซ้อน
