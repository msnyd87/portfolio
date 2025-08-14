import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { sendEmail, formatContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store message in memory storage
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification
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

  const httpServer = createServer(app);
  return httpServer;
}