# How to Start the Server Correctly

## ✅ Step-by-Step Instructions

### 1. Stop ALL Running Servers
- Press `Ctrl + C` in any terminal running `npm run dev`
- Or close all terminal windows
- Make sure no servers are running on ports 3000, 3001, 3002, or 3003

### 2. Verify .env.local File
The file `C:\Shamal_Recruitment\.env.local` should contain:
```
ADMIN_PASSWORD=ahmed121212
```
✅ **Verified:** File exists and is correct (31 bytes)

### 3. Clear Cache (Already Done)
✅ Cache has been cleared

### 4. Start the Server
Open a **new terminal** and run:
```bash
cd C:\Shamal_Recruitment
npm run dev
```

### 5. Wait for Server to Start
You should see:
```
✓ Ready in XXXXms
- Environments: .env.local
```
The `- Environments: .env.local` line confirms it loaded your env file.

### 6. Note the Port
The server will tell you which port it's using:
```
- Local:        http://localhost:3000
```
(Or 3001, 3002, etc. if 3000 is busy)

### 7. Test Login
1. Open your browser
2. Go to: `http://localhost:3000/admin` (use the port shown in terminal)
3. Enter password: `ahmed121212`
4. Click "Login"

## 🔧 Troubleshooting

### If you still get "Admin password not configured":

1. **Check the terminal output** - Does it show `- Environments: .env.local`?
   - If NO: The file isn't being loaded. Check file location and name.
   - If YES: The file is loaded, but server actions might need a restart.

2. **Verify file location**: The `.env.local` file must be in the root directory:
   ```
   C:\Shamal_Recruitment\.env.local
   ```
   Same folder as `package.json`

3. **Check file format**: Open `.env.local` in a text editor. It should be exactly:
   ```
   ADMIN_PASSWORD=ahmed121212
   ```
   - No spaces around `=`
   - No quotes
   - No extra lines (except one blank line at end is OK)

4. **Restart completely**: 
   - Stop server (`Ctrl + C`)
   - Wait 2 seconds
   - Start again (`npm run dev`)

## 📝 Current Status

- ✅ `.env.local` file exists and is correct
- ✅ Cache has been cleared
- ⏳ **Next step:** Stop all servers and start fresh

## 🚀 Quick Start Command

```bash
# Stop any running servers first (Ctrl + C)
# Then run:
cd C:\Shamal_Recruitment && npm run dev
```

