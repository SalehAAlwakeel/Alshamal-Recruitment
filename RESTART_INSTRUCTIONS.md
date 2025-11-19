# How to Restart the Server

The server needs to be restarted after creating or modifying `.env.local` files so that Next.js can load the environment variables.

## Steps to Restart:

1. **Stop the current server:**
   - Go to the terminal where `npm run dev` is running
   - Press `Ctrl + C` to stop the server

2. **Start the server again:**
   ```bash
   npm run dev
   ```

3. **Verify it's working:**
   - The terminal should show: `- Environments: .env.local`
   - Try logging in at http://localhost:3002/admin
   - Use password: `ahmed121212`

## Alternative: Kill Process and Restart

If you can't stop it with Ctrl+C:

1. Find the process ID (PID) using port 3002:
   ```powershell
   netstat -ano | findstr :3002
   ```

2. Kill the process:
   ```powershell
   taskkill /PID <process_id> /F
   ```

3. Restart:
   ```bash
   npm run dev
   ```

## Why This Happens:

Next.js reads environment variables from `.env.local` only when the server starts. If you create or modify the file while the server is running, you must restart it for the changes to take effect.

