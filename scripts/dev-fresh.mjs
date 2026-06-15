import fs from "node:fs";
import path from "node:path";
import { spawn, execSync } from "node:child_process";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const DEFAULT_PORT = Number(process.env.PORT || 3000);
const PORT_RANGE = 10;

function killPort(port) {
  if (process.platform === "win32") {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
      const pids = new Set(
        out
          .split(/\r?\n/)
          .map((line) => line.trim().split(/\s+/).pop())
          .filter((pid) => pid && /^\d+$/.test(pid)),
      );
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
          console.log(`Stopped process ${pid} on port ${port}.`);
        } catch {
          // Process may have already exited.
        }
      }
    } catch {
      // No listener on this port.
    }
    return;
  }

  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore", shell: true });
    console.log(`Stopped listeners on port ${port}.`);
  } catch {
    // No listener on this port.
  }
}

console.log("Clearing stale Next.js dev listeners…");
for (let port = DEFAULT_PORT; port < DEFAULT_PORT + PORT_RANGE; port += 1) {
  killPort(port);
}

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

console.log("Removed .next cache.");
console.log(`Starting dev server on port ${DEFAULT_PORT}. Use only one instance at a time.`);

const child = spawn("npm", ["run", "dev", "--", "-p", String(DEFAULT_PORT)], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
