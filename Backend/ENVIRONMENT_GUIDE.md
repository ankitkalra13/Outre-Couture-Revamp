# 🌍 Environment Comparison Chart

## Development Environment
- **Name**: outre-couture-backend-dev
- **URL**: https://outre-couture-backend-dev.onrender.com
- **Purpose**: Feature development, testing, debugging
- **Debug**: ✅ Enabled
- **Logs**: Verbose
- **Database**: Same as staging/prod (for data consistency)

## Staging Environment
- **Name**: outre-couture-backend-staging
- **URL**: https://outre-couture-backend-staging.onrender.com
- **Purpose**: Pre-production testing, QA, client demos
- **Debug**: ❌ Disabled
- **Logs**: Standard
- **Database**: Same as staging/prod (for data consistency)

## Production Environment
- **Name**: outre-couture-backend-prod
- **URL**: https://outre-couture-backend-prod.onrender.com
- **Purpose**: Live production, customer-facing
- **Debug**: ❌ Disabled
- **Logs**: Minimal
- **Database**: Same as staging/prod (for data consistency)

## Deployment Workflow
1. **Develop** → Development Environment
2. **Test** → Staging Environment
3. **Deploy** → Production Environment

## Environment Variables to Set
Each environment needs these set manually in Render dashboard:
- MONGO_URI
- MAIL_USERNAME
- MAIL_PASSWORD
- MAIL_DEFAULT_SENDER

