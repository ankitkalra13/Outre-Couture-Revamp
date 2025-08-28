# 🌍 Frontend Environment Setup Guide

## 📋 **Environment Files Overview**

This project uses three environment configurations for different deployment stages:

### **1. Development (Local)**
- **File:** `.env.development` (copy from `env.development.example`)
- **Backend:** `http://localhost:5000/api`
- **Frontend:** `http://localhost:3000`
- **Use Case:** Local development and testing

### **2. Staging**
- **File:** `.env.staging` (copy from `env.staging.example`)
- **Backend:** `https://outre-couture-staging.onrender.com/api`
- **Frontend:** `https://outre-couture-staging.vercel.app`
- **Use Case:** Testing before production deployment

### **3. Production**
- **File:** `.env.production` (copy from `env.production.example`)
- **Backend:** `https://outre-couture-production.onrender.com/api`
- **Frontend:** `https://www.outrecouture.com`
- **Use Case:** Live production website

---

## 🚀 **Setup Instructions**

### **Step 1: Local Development**
```bash
cd Frontend
cp env.development.example .env.development
# Edit .env.development if needed
npm run dev
```

### **Step 2: Staging Deployment**
```bash
# Copy staging environment
cp env.staging.example .env.staging

# Deploy to Vercel with staging environment
vercel --env-file .env.staging
```

### **Step 3: Production Deployment**
```bash
# Copy production environment
cp env.production.example .env.production

# Deploy to Vercel with production environment
vercel --env-file .env.production --prod
```

---

## 🔧 **Vercel Environment Variables**

### **Staging Environment:**
- `NEXT_PUBLIC_API_URL`: `https://outre-couture-staging.onrender.com/api`
- `NEXT_PUBLIC_ENV`: `staging`
- `NEXT_PUBLIC_DEBUG`: `false`

### **Production Environment:**
- `NEXT_PUBLIC_API_URL`: `https://outre-couture-production.onrender.com/api`
- `NEXT_PUBLIC_ENV`: `production`
- `NEXT_PUBLIC_DEBUG`: `false`

---

## 🌐 **Domain Configuration**

### **Main Domain:** `https://www.outrecouture.com`
- **Production Frontend:** `https://www.outrecouture.com`
- **Production Backend:** `https://outre-couture-production.onrender.com`

### **Staging Domain:** `https://outre-couture-staging.vercel.app`
- **Staging Frontend:** `https://outre-couture-staging.vercel.app`
- **Staging Backend:** `https://outre-couture-staging.onrender.com`

---

## ⚠️ **Important Notes**

1. **Never commit `.env.*` files** (they're in .gitignore)
2. **Only commit `.env.*.example` files** (templates)
3. **Update backend URLs** when you deploy to Render
4. **Set environment variables** in Vercel dashboard for production
5. **Use port 5000** for local backend development

---

## 🔍 **Testing Your Setup**

### **Local Development:**
```bash
# Backend should be running on port 5000
curl http://localhost:5000/api/health

# Frontend should connect to localhost:5000
npm run dev
```

### **Staging/Production:**
- Check that frontend connects to correct backend
- Verify API calls work in browser console
- Test all functionality in each environment
