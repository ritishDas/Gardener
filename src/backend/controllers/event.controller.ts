import type { Request, Response } from "express";
import { pool } from "../db.js";

interface CreateEventBody {
    name: string;
    poster?: string;
    event_date: string;
    venue?: string;
    details_md?: string;
    fee: number;
    fee_type: 'perperson' | 'perteam';
    min_team_size?: number;
    max_team_size?: number;
    owner_id: string;
    tags?: string[];
}

// Get all events
export async function getAllEvents(req: Request, res: Response) {
    try {
        const { tag } = req.query;

        let query = `
      SELECT e.*, 
        ARRAY_AGG(DISTINCT et.tag) FILTER (WHERE et.tag IS NOT NULL) as tags,
        COUNT(DISTINCT p.user_id) as participant_count
      FROM events e
      LEFT JOIN event_tags et ON e.id = et.event_id
      LEFT JOIN participation p ON e.id = p.event_id AND p.confirmed = true
    `;

        const params: any[] = [];

        if (tag) {
            query += ` WHERE e.id IN (
        SELECT event_id FROM event_tags WHERE tag = $1
      )`;
            params.push(tag);
        }

        query += ` GROUP BY e.id ORDER BY e.event_date DESC`;

        const result = await pool.query(query, params);
        res.json({ success: true, events: result.rows });
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch events' });
    }
}

// Get single event
export async function getEventById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const eventQuery = `
      SELECT e.*, 
        ARRAY_AGG(DISTINCT et.tag) FILTER (WHERE et.tag IS NOT NULL) as tags,
        COUNT(DISTINCT p.user_id) as participant_count
      FROM events e
      LEFT JOIN event_tags et ON e.id = et.event_id
      LEFT JOIN participation p ON e.id = p.event_id AND p.confirmed = true
      WHERE e.id = $1
      GROUP BY e.id
    `;

        const result = await pool.query(eventQuery, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        res.json({ success: true, event: result.rows[0] });
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch event' });
    }
}

// Create event
export async function createEvent(req: Request<{}, {}, CreateEventBody>, res: Response) {
    try {
        const {
            name,
            poster,
            event_date,
            venue,
            details_md,
            fee,
            fee_type,
            min_team_size,
            max_team_size,
            owner_id,
            tags
        } = req.body;

        // Validate required fields
        if (!name || !event_date || fee === undefined || !fee_type || !owner_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, event_date, fee, fee_type, owner_id'
            });
        }

        // Start transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert event
            const eventQuery = `
        INSERT INTO events (name, poster, event_date, venue, details_md, fee, fee_type, min_team_size, max_team_size, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;

            const eventResult = await client.query(eventQuery, [
                name, poster, event_date, venue, details_md, fee, fee_type, min_team_size, max_team_size, owner_id
            ]);

            const eventId = eventResult.rows[0].id;

            // Insert tags if provided
            if (tags && tags.length > 0) {
                const tagQuery = 'INSERT INTO event_tags (event_id, tag) VALUES ($1, $2)';
                for (const tag of tags) {
                    await client.query(tagQuery, [eventId, tag]);
                }
            }

            await client.query('COMMIT');
            res.status(201).json({ success: true, event: eventResult.rows[0] });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ success: false, error: 'Failed to create event' });
    }
}

// Update event
export async function updateEvent(req: Request<{ id: string }, {}, Partial<CreateEventBody>>, res: Response) {
    try {
        const { id } = req.params;
        const {
            name,
            poster,
            event_date,
            venue,
            details_md,
            fee,
            fee_type,
            min_team_size,
            max_team_size,
            tags
        } = req.body;

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Build update query dynamically
            const updates: string[] = [];
            const values: any[] = [];
            let paramCount = 1;

            if (name !== undefined) {
                updates.push(`name = $${paramCount++}`);
                values.push(name);
            }
            if (poster !== undefined) {
                updates.push(`poster = $${paramCount++}`);
                values.push(poster);
            }
            if (event_date !== undefined) {
                updates.push(`event_date = $${paramCount++}`);
                values.push(event_date);
            }
            if (venue !== undefined) {
                updates.push(`venue = $${paramCount++}`);
                values.push(venue);
            }
            if (details_md !== undefined) {
                updates.push(`details_md = $${paramCount++}`);
                values.push(details_md);
            }
            if (fee !== undefined) {
                updates.push(`fee = $${paramCount++}`);
                values.push(fee);
            }
            if (fee_type !== undefined) {
                updates.push(`fee_type = $${paramCount++}`);
                values.push(fee_type);
            }
            if (min_team_size !== undefined) {
                updates.push(`min_team_size = $${paramCount++}`);
                values.push(min_team_size);
            }
            if (max_team_size !== undefined) {
                updates.push(`max_team_size = $${paramCount++}`);
                values.push(max_team_size);
            }

            if (updates.length > 0) {
                values.push(id);
                const updateQuery = `UPDATE events SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
                await client.query(updateQuery, values);
            }

            // Update tags if provided
            if (tags !== undefined) {
                await client.query('DELETE FROM event_tags WHERE event_id = $1', [id]);
                if (tags.length > 0) {
                    const tagQuery = 'INSERT INTO event_tags (event_id, tag) VALUES ($1, $2)';
                    for (const tag of tags) {
                        await client.query(tagQuery, [id, tag]);
                    }
                }
            }

            await client.query('COMMIT');
            res.json({ success: true, message: 'Event updated successfully' });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ success: false, error: 'Failed to update event' });
    }
}

// Delete event
export async function deleteEvent(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        res.json({ success: true, message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ success: false, error: 'Failed to delete event' });
    }
}
