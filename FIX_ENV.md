# Fix: Admin Password Not Loading

## The Problem
Next.js server actions don't always hot-reload environment variables from `.env.local`. You need to do a **full server restart**.

## Solution: Complete Restart

### Step 1: Stop ALL Running Servers
1. Go to **each terminal window** where `npm run dev` is running
2. Press `Ctrl + C` in each one to stop them
3. Or close all terminal windows

### Step 2: Kill Any Remaining Node Processes (Optional)
If servers won't stop, run this in PowerShell:
```powershell
Get-Process node | Stop-Process -Force
```

### Step 3: Verify .env.local File
Make sure `.env.local` in the root directory contains:
```
ADMIN_PASSWORD=ahmed121212
```
(No spaces around the `=`, no quotes)

### Step 4: Start Fresh
```bash
cd C:\Shamal_Recruitment
npm run dev
```

### Step 5: Verify It Loaded
Look for this line in the terminal output:
```
- Environments: .env.local
```

### Step 6: Test Login
1. Go to: http://localhost:3000 (or the port shown)
2. Click "Admin Login" or go to `/admin`
3. Enter password: `ahmed121212`
4. Click "Login"

## If It Still Doesn't Work

### Check the .env.local file format:
- ✅ Correct: `ADMIN_PASSWORD=ahmed121212`
- ❌ Wrong: `ADMIN_PASSWORD = ahmed121212` (spaces)
- ❌ Wrong: `ADMIN_PASSWORD="ahmed121212"` (quotes)
- ❌ Wrong: `ADMIN_PASSWORD=ahmed121212 ` (trailing space)

### Alternative: Add to next.config.js (Temporary Test)
If environment variables still don't load, you can temporarily test by adding to `next.config.js`:
```js
module.exports = {
  env: {
    ADMIN_PASSWORD: 'ahmed121212',
  },
}
```
⚠️ **Don't commit this!** Remove it after testing and use `.env.local` instead.

## Why This Happens
Next.js reads `.env.local` at server startup. Server actions run in a separate process that doesn't always pick up hot-reloaded environment variables. A full restart ensures everything loads correctly.

