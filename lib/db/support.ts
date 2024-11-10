import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import db from './mysql'

interface SupportTicketData {
  id?: number
  name: string
  email: string
  subject: string
  department: string
  priority: string
  message: string,
  userid: string,
  last_updated: Date,
  created_at?: Date
}
interface MessageData {
  id?: number;
  ticket_id: number;
  sender_id: number;
  message_text: string;
  created_at?: Date;
  last_updated?: Date;
}

interface MessageRow extends MessageData, RowDataPacket { }
interface SupportTicketRow extends SupportTicketData, RowDataPacket { }

const Support = {
  sendMessage: async (data: MessageData): Promise<number | null> => {
    try {
      const sql = `
        INSERT INTO support_messages (ticket_id, sender_id, message_text, created_at, last_updated)
        VALUES (?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query<ResultSetHeader>(sql, [
        data.ticket_id,
        data.sender_id,
        data.message_text,
      ]);

      console.log(`[DB] Successfully inserted message with ID: ${result.insertId}`);
      return result.insertId;
    } catch (err) {
      console.error(`[DB] Error while sending message: ${err}`);
      return null;
    }
  },

  // Function to retrieve messages by ticket ID
  getMessagesByTicketId: async (ticketId: number): Promise<MessageData[] | null> => {
    try {
      console.log("this is not hitting", ticketId);
      const sql = `
        SELECT * FROM support_messages
        WHERE ticket_id = ?
        ORDER BY created_at ASC
      `;

      const [rows] = await db.query<MessageRow[]>(sql, [ticketId]);
      console.log(rows, "got the data");
      console.log(`[DB] Retrieved ${rows.length} messages for ticket ID: ${ticketId}`);
      return rows;
    } catch (err) {
      console.log(err, "got the data");

      console.error(`[DB] Error while retrieving messages by ticket ID: ${err}`);
      return null;
    }
  },

  // Function to retrieve messages between a sender and a ticket (specific chat for user/admin within a ticket)
  getMessagesBetweenSenderAndTicket: async (ticketId: number, senderId: number): Promise<MessageData[] | null> => {
    try {
      const sql = `
        SELECT * FROM support_messages
        WHERE ticket_id = ? AND sender_id = ?
        ORDER BY created_at ASC
      `;

      const [rows] = await db.query<MessageRow[]>(sql, [ticketId, senderId]);

      console.log(`[DB] Retrieved ${rows.length} messages for ticket ID: ${ticketId} and sender ID: ${senderId}`);
      return rows;
    } catch (err) {
      console.error(`[DB] Error while retrieving messages for ticket and sender: ${err}`);
      return null;
    }
  },
  // Function to create a new support ticket
  createSupportTicket: async (data: SupportTicketData): Promise<number | null> => {
    try {
      const sql = `
          INSERT INTO support_tickets (name, email, subject, department, priority, message, userid, created_at, last_updated)
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `

      const [result] = await db.query<ResultSetHeader>(sql, [
        data.name,
        data.email,
        data.subject,
        data.department,
        data.priority,
        data.message,
        data.userid,
      ])

      console.log(`[DB] Successfully inserted support ticket with ID: ${result.insertId}`)
      return result.insertId
    } catch (err) {
      console.error(`[DB] Error while creating support ticket: ${err}`)
      return null
    }
  },

  updateTicketLastUpdated: async (ticket_id: number): Promise<boolean> => {
    try {
      const sql = `UPDATE support_tickets SET last_updated = NOW() WHERE id = ?`;

      const [result] = await db.query<ResultSetHeader>(sql, [ticket_id]);

      if (result.affectedRows > 0) {
        console.log(`[DB] Successfully updated last_updated for ticket with ID: ${ticket_id}`);
        return true;
      } else {
        console.log(`[DB] No ticket found with ID: ${ticket_id}`);
        return false;
      }
    } catch (err) {
      console.error(`[DB] Error while updating last_updated for ticket ID ${ticket_id}: ${err}`);
      return false;
    }
  },
  
  updateTicketStatus: async (ticketId: number, status: string): Promise<boolean> => {
    try {
      const sql = `
          UPDATE support_tickets
          SET status = ?, last_updated = NOW()
          WHERE id = ?
        `;
  
      const [result] = await db.query<ResultSetHeader>(sql, [status, ticketId]);
  
      if (result.affectedRows > 0) {
        console.log(`[DB] Successfully updated ticket ID ${ticketId} with status: ${status}`);
        return true;
      } else {
        console.error(`[DB] No ticket found with ID: ${ticketId}`);
        return false;
      }
    } catch (err) {
      console.error(`[DB] Error while updating ticket status: ${err}`);
      return false;
    }
  },

  // Function to check if a support ticket exists by ID
  supportTicketExists: async (id: number): Promise<boolean> => {
    try {
      const sql = `SELECT COUNT(*) AS count FROM support_tickets WHERE id = ?`
      const [rows] = await db.query<{ count: number }[]>(sql, [id])

      return rows[0].count > 0
    } catch (err) {
      console.error(`[DB] Error while checking if support ticket exists: ${err}`)
      return false
    }
  },

  getSupportTicketById: async (id: number): Promise<SupportTicketData | null> => {
    try {
      const sql = `SELECT * FROM support_tickets WHERE id = ?`
      const [rows] = await db.query<SupportTicketRow[]>(sql, [id])

      if (rows.length > 0) {
        return rows[0]
      } else {
        return null
      }
    } catch (err) {
      console.error(`[DB] Error while getting support ticket: ${err}`)
      return null
    }
  },

  getSupportTicketsByEmail: async (email: string): Promise<SupportTicketData[] | null> => {
    try {
      const sql = `SELECT * FROM support_tickets WHERE email = ? ORDER BY created_at DESC`
      const [rows] = await db.query<SupportTicketRow[]>(sql, [email])
      console.log(rows, "got the tickets")
      return rows
    } catch (err) {
      console.error(`[DB] Error while getting support tickets: ${err}`)
      return null
    }
  },
  // Function to get all support tickets
  getAllSupportTickets: async (): Promise<SupportTicketData[]> => {
    try {
      const sql = `SELECT * FROM support_tickets ORDER BY created_at DESC`;
      const [rows] = await db.query<SupportTicketRow[]>(sql);

      return rows;
    } catch (err) {
      console.error(`[DB] Error while getting all support tickets: ${err}`);
      return [];
    }
  },

}

export default Support