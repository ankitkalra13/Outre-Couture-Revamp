# 🌍 Environment Variables Alignment

## 📋 **Frontend ↔ Backend Environment Mapping**

This document shows how environment variables are aligned between frontend and backend for consistent deployment.

---

## 🔄 **Environment Variable Mapping**

### **Development Environment**

| Frontend (.env.development) | Backend (env.development) | Purpose |
|------------------------------|---------------------------|---------|
| `NEXT_PUBLIC_API_URL=http://localhost:5000/api` | `BASE_URL=http://localhost:5000/api` | API endpoint |
| `NEXT_PUBLIC_SITE_URL=http://localhost:3000` | `FRONTEND_URL=http://localhost:3000` | Frontend URL |
| `NEXT_PUBLIC_ENV=development` | `FLASK_ENV=development` | Environment identifier |
| `NEXT_PUBLIC_DEBUG=true` | `FLASK_DEBUG=True` | Debug mode |

### **Staging Environment**

| Frontend (.env.staging) | Backend (env.staging) | Purpose |
|-------------------------|------------------------|---------|
| `NEXT_PUBLIC_API_URL=https://outre-couture-staging.onrender.com/api` | `BASE_URL=https://outre-couture-staging.onrender.com/api` | API endpoint |
| `NEXT_PUBLIC_SITE_URL=https://outre-couture-staging.vercel.app` | `FRONTEND_URL=https://outre-couture-staging.vercel.app` | Frontend URL |
| `NEXT_PUBLIC_ENV=staging` | `FLASK_ENV=staging` | Environment identifier |
| `NEXT_PUBLIC_DEBUG=false` | `FLASK_DEBUG=False` | Debug mode |

### **Production Environment**

| Frontend (.env.production) | Backend (env.production) | Purpose |
|----------------------------|---------------------------|---------|
| `NEXT_PUBLIC_API_URL=https://outre-couture-production.onrender.com/api` | `BASE_URL=https://outre-couture-production.onrender.com/api` | API endpoint |
| `NEXT_PUBLIC_SITE_URL=https://www.outrecouture.com` | `FRONTEND_URL=https://www.outrecouture.com` | Frontend URL |
| `NEXT_PUBLIC_ENV=production` | `FLASK_ENV=production` | Environment identifier |
| `NEXT_PUBLIC_DEBUG=false` | `FLASK_DEBUG=False` | Debug mode |

---

## 🚀 **Deployment Flow**

### **1. Development**
- **Frontend:** `npm run dev` → Uses `.env.development`
- **Backend:** `python app.py` → Uses `env.development`
- **Result:** Both use `localhost` URLs

### **2. Staging**
- **Frontend:** `vercel --env-file .env.staging`
- **Backend:** Deploy to Render with `env.staging`
- **Result:** Both use staging Render URLs

### **3. Production**
- **Frontend:** `vercel --env-file .env.production --prod`
- **Backend:** Deploy to Render with `env.production`
- **Result:** Both use production Render URLs

---

## 🔧 **Key Benefits**

### **✅ Consistency:**
- **Same API endpoints** across frontend and backend
- **Same domain structure** for each environment
- **Synchronized deployment** process

### **✅ Maintainability:**
- **Single source of truth** for URLs
- **Easy environment switching** with one command
- **Reduced configuration errors**

### **✅ Security:**
- **Environment-specific** configurations
- **No hardcoded URLs** in code
- **Proper CORS** configuration per environment

---

## 📝 **Notes**

1. **Frontend variables** must start with `NEXT_PUBLIC_` to be accessible in browser
2. **Backend variables** are server-side only and more secure
3. **CORS configuration** automatically adapts to environment
4. **All environments** use the same MongoDB and email settings
5. **JWT secrets** are unique per environment for security
