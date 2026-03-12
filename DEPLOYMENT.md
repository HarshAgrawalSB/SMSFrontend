# Frontend Deployment Guide

## Vercel Deployment

### Prerequisites
- Git repository connected to Vercel
- Backend API deployed and accessible

### Environment Variables
Set these in your Vercel dashboard for the frontend project:

1. **VITE_API_URL**
   - Your deployed backend URL (e.g., `https://your-backend.vercel.app`)
   - This replaces the local development URL

### Deployment Steps

1. **Connect to Vercel**
   ```bash
   # If not already connected
   vercel link
   ```

2. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL when prompted
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Configuration Files Created

#### `vercel.json`
- Configures static build deployment
- Sets up proper routing for SPA
- Optimizes asset caching

#### Updated `vite.config.js`
- Added build optimizations
- Code splitting for better performance
- Production environment handling

#### Updated `package.json`
- Added `vercel-build` script for Vercel compatibility

### Important Notes

1. **API Proxy**: The development proxy (`/api` -> backend) only works locally
2. **Production**: Frontend will make direct API calls to `VITE_API_URL`
3. **CORS**: Ensure backend allows requests from your frontend domain
4. **Build**: Vercel automatically runs `npm run vercel-build`

### Troubleshooting

#### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings
- Ensure backend is deployed and accessible

#### Build Issues
- Check all dependencies are in `package.json`
- Verify build works locally: `npm run build`
- Check Vercel build logs

#### Routing Issues
- All routes should work (SPA routing handled by `vercel.json`)
- Refresh on any page should load correctly

### Performance Optimizations

- **Code Splitting**: React, MUI, and router are split into separate chunks
- **Asset Caching**: Static assets cached for 1 year
- **Sourcemaps**: Enabled for debugging in production

### Next Steps

1. Deploy backend first (if not done)
2. Get the backend URL
3. Set `VITE_API_URL` in Vercel
4. Deploy frontend
5. Test the complete application
