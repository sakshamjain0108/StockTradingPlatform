// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\backend\Controllers\TicketController.js

import Ticket from "../Models/TicketModel.js";

export const CreateTicket = async (req, res) => {
  try {
    // 1. Get email, subject, and description from the request body
    const { subject, description, email } = req.body;
    
    // 2. Add email to the validation
    if (!subject || !description || !email) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newTicket = await Ticket.create({
      // 3. We no longer save userId, just the email
      email: email,
      subject,
      description,
      status: 'Pending',
    });

    res.status(201).json({ success: true, message: "Ticket created successfully.", ticket: newTicket });

  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};