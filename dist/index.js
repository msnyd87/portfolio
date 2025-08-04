// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactMessages;
  currentUserId;
  currentMessageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactMessage(insertMessage) {
    const id = this.currentMessageId++;
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
  async getContactMessages() {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true
});

// server/routes.ts
import { z } from "zod";

// server/email.ts
async function sendEmail(options) {
  try {
    if (process.env.RESEND_API_KEY) {
      return await sendWithResend(options);
    }
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      return await sendWithMailgun(options);
    }
    console.log("Email would be sent to:", options.to);
    console.log("Subject:", options.subject);
    console.log("Message:", options.text);
    console.log("To enable email sending:");
    console.log("  - Set RESEND_API_KEY (get free key at resend.com)");
    console.log("  - Or set MAILGUN_API_KEY and MAILGUN_DOMAIN");
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
async function sendWithResend(options) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        // Resend's default from address
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || options.text
      })
    });
    if (response.ok) {
      console.log("Email sent via Resend to:", options.to);
      return true;
    } else {
      const error = await response.text();
      console.error("Resend API error:", error);
      return false;
    }
  } catch (error) {
    console.error("Resend sending failed:", error);
    return false;
  }
}
async function sendWithMailgun(options) {
  try {
    const formData = new FormData();
    formData.append("from", `Portfolio Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`);
    formData.append("to", options.to);
    formData.append("subject", options.subject);
    formData.append("text", options.text);
    if (options.html) {
      formData.append("html", options.html);
    }
    const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString("base64")}`
      },
      body: formData
    });
    if (response.ok) {
      console.log("Email sent via Mailgun to:", options.to);
      return true;
    } else {
      const error = await response.text();
      console.error("Mailgun API error:", error);
      return false;
    }
  } catch (error) {
    console.error("Mailgun sending failed:", error);
    return false;
  }
}
function formatContactEmail(name, email, message) {
  const subject = `New Contact Form Message from ${name}`;
  const text2 = `
New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Message: ${message}

---
Sent from your portfolio website
  `.trim();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">New Contact Form Message</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>
      <p style="color: #64748b; font-size: 14px;">Sent from your portfolio website</p>
    </div>
  `;
  return {
    to: "msnyd87@gmail.com",
    subject,
    text: text2,
    html
  };
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      const emailOptions = formatContactEmail(
        validatedData.name,
        validatedData.email,
        validatedData.message
      );
      const emailSent = await sendEmail(emailOptions);
      if (emailSent) {
        res.json({ success: true, message: "Message sent successfully!" });
      } else {
        res.json({ success: true, message: "Message received! (Email sending currently disabled)" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message"
        });
      }
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
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay()
    // ...(process.env.NODE_ENV !== "production" &&
    // process.env.REPL_ID !== undefined
    //   ? [
    //       await import("@replit/vite-plugin-cartographer").then((m) =>
    //         m.cartographer(),
    //       ),
    //     ]
    //   : []),
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
    outDir: path.resolve(import.meta.dirname, "dist"),
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
