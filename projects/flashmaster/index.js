// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
var MemStorage = class {
  flashcards;
  currentId;
  constructor() {
    this.flashcards = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.loadDataFromFile();
  }
  loadDataFromFile() {
    try {
      const dataDir = join(process.cwd(), "data");
      const files = readdirSync(dataDir).filter((file) => file.endsWith(".json"));
      files.forEach((file) => {
        const filePath = join(dataDir, file);
        const fileContent = readFileSync(filePath, "utf-8");
        const questions = JSON.parse(fileContent);
        const technology = this.formatTechnologyName(file.replace(".json", ""));
        Object.entries(questions).forEach(([question, answers]) => {
          const flashcard = {
            id: this.currentId++,
            technology,
            question,
            answers
          };
          this.flashcards.set(flashcard.id, flashcard);
        });
      });
    } catch (error) {
      console.error("Error loading flashcard data from files:", error);
      throw new Error("Failed to load flashcard data");
    }
  }
  formatTechnologyName(filename) {
    const nameMap = {
      "python": "Python",
      "javascript": "JavaScript",
      "react": "React",
      "nodejs": "Node.js",
      "html-css": "HTML/CSS"
    };
    return nameMap[filename] || filename.charAt(0).toUpperCase() + filename.slice(1);
  }
  async getAllFlashcards() {
    return Array.from(this.flashcards.values());
  }
  async getFlashcardsByTechnology(technology) {
    return Array.from(this.flashcards.values()).filter(
      (flashcard) => flashcard.technology === technology
    );
  }
  async createFlashcard(insertFlashcard) {
    const id = this.currentId++;
    const flashcard = {
      ...insertFlashcard,
      id,
      answers: insertFlashcard.answers
    };
    this.flashcards.set(id, flashcard);
    return flashcard;
  }
  async getTechnologies() {
    const technologies = /* @__PURE__ */ new Set();
    this.flashcards.forEach((flashcard) => {
      technologies.add(flashcard.technology);
    });
    return Array.from(technologies);
  }
  async getFlashcardData() {
    const data = {};
    this.flashcards.forEach((flashcard) => {
      if (!data[flashcard.technology]) {
        data[flashcard.technology] = {};
      }
      data[flashcard.technology][flashcard.question] = flashcard.answers;
    });
    return data;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  technology: text("technology").notNull(),
  question: text("question").notNull(),
  answers: json("answers").notNull().$type()
});
var insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true
});
var flashcardDataSchema = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.enum(["right", "wrong"])))
);

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/technologies", async (req, res) => {
    try {
      const technologies = await storage.getTechnologies();
      res.json(technologies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technologies" });
    }
  });
  app2.get("/api/flashcards", async (req, res) => {
    try {
      const data = await storage.getFlashcardData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flashcard data" });
    }
  });
  app2.get("/api/flashcards/:technology", async (req, res) => {
    try {
      const { technology } = req.params;
      const flashcards2 = await storage.getFlashcardsByTechnology(technology);
      res.json(flashcards2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flashcards" });
    }
  });
  app2.post("/api/flashcards", async (req, res) => {
    try {
      const result = insertFlashcardSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid flashcard data" });
      }
      const flashcard = await storage.createFlashcard(result.data);
      res.status(201).json(flashcard);
    } catch (error) {
      res.status(500).json({ message: "Failed to create flashcard" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  base: "/projects/flashmaster/",
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
