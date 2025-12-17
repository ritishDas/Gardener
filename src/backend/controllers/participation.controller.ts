import type { Request, Response } from "express";
import { pool } from "../db.js";

interface RegisterEventBody {
    user_id: string;
    team_id?: string;
}

// Register for event
export async function registerForEvent(req: Request<{ id: string }, {}, RegisterEventBody>, res: Response) {
    try {
        const { id: event_id } = req.params;
        const { user_id, team_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ success: false, error: 'user_id is required' });
        }

        // Check if event exists
        const eventCheck = await pool.query('SELECT id FROM events WHERE id = $1', [event_id]);
        if (eventCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        // Check if user exists
        const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const query = `
      INSERT INTO participation (user_id, event_id, team_id, confirmed)
      VALUES ($1, $2, $3, true)
      ON CONFLICT (user_id, event_id) 
      DO UPDATE SET confirmed = true, team_id = EXCLUDED.team_id
      RETURNING *
    `;

        const result = await pool.query(query, [user_id, event_id, team_id || null]);
        res.status(201).json({ success: true, participation: result.rows[0] });
    } catch (err) {
        console.error('Error registering for event:', err);
        res.status(500).json({ success: false, error: 'Failed to register for event' });
    }
}

// Unregister from event
export async function unregisterFromEvent(req: Request<{ id: string }>, res: Response) {
    try {
        const { id: event_id } = req.params;
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ success: false, error: 'user_id is required' });
        }

        const result = await pool.query(
            'DELETE FROM participation WHERE user_id = $1 AND event_id = $2 RETURNING *',
            [user_id, event_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Participation not found' });
        }

        res.json({ success: true, message: 'Unregistered successfully' });
    } catch (err) {
        console.error('Error unregistering from event:', err);
        res.status(500).json({ success: false, error: 'Failed to unregister from event' });
    }
}

// Get event participants
export async function getEventParticipants(req: Request, res: Response) {
    try {
        const { id: event_id } = req.params;

        const query = `
      SELECT 
        u.id, u.email, u.name, u.profile_image,
        p.team_id, p.confirmed,
        t.name as team_name
      FROM participation p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN teams t ON p.team_id = t.id
      WHERE p.event_id = $1 AND p.confirmed = true
      ORDER BY u.name
    `;

        const result = await pool.query(query, [event_id]);
        res.json({ success: true, participants: result.rows });
    } catch (err) {
        console.error('Error fetching participants:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch participants' });
    }
}

// Get user's registered events
export async function getUserEvents(req: Request, res: Response) {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ success: false, error: 'user_id is required' });
        }

        const query = `
      SELECT 
        e.*,
        p.confirmed,
        p.team_id,
        t.name as team_name,
        ARRAY_AGG(DISTINCT et.tag) FILTER (WHERE et.tag IS NOT NULL) as tags
      FROM participation p
      JOIN events e ON p.event_id = e.id
      LEFT JOIN teams t ON p.team_id = t.id
      LEFT JOIN event_tags et ON e.id = et.event_id
      WHERE p.user_id = $1
      GROUP BY e.id, p.confirmed, p.team_id, t.name
      ORDER BY e.event_date DESC
    `;

        const result = await pool.query(query, [user_id]);
        res.json({ success: true, events: result.rows });
    } catch (err) {
        console.error('Error fetching user events:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch user events' });
    }
}
