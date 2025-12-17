import { pool } from './db.js';

async function seedData() {
    try {
        // Create a test user
        const userResult = await pool.query(`
      INSERT INTO users (email, name, bio)
      VALUES ('test@example.com', 'Test User', 'Event enthusiast')
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `);

        const userId = userResult.rows[0].id;
        console.log('Created/found user with ID:', userId);

        // Create sample events
        const events = [
            {
                name: 'Tech Conference 2025',
                poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
                event_date: new Date('2025-02-15T09:00:00'),
                venue: 'Convention Center, Downtown',
                details_md: 'Join us for an exciting day of technology talks, networking, and innovation. Learn from industry leaders and connect with fellow tech enthusiasts.',
                fee: 1500,
                fee_type: 'perperson',
                tags: ['technology', 'conference', 'networking']
            },
            {
                name: 'Hackathon 2025',
                poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
                event_date: new Date('2025-03-20T10:00:00'),
                venue: 'Tech Hub',
                details_md: '48-hour coding marathon! Build innovative solutions, win prizes, and collaborate with talented developers.',
                fee: 0,
                fee_type: 'perteam',
                min_team_size: 2,
                max_team_size: 5,
                tags: ['hackathon', 'coding', 'competition']
            },
            {
                name: 'Design Workshop',
                poster: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500',
                event_date: new Date('2025-02-28T14:00:00'),
                venue: 'Creative Studio',
                details_md: 'Learn the fundamentals of UX/UI design from experienced designers. Hands-on exercises and portfolio feedback included.',
                fee: 800,
                fee_type: 'perperson',
                tags: ['design', 'workshop', 'ui-ux']
            },
            {
                name: 'Startup Pitch Night',
                poster: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=500',
                event_date: new Date('2025-04-10T18:00:00'),
                venue: 'Innovation Center',
                details_md: 'Pitch your startup idea to investors and get valuable feedback. Network with entrepreneurs and potential co-founders.',
                fee: 500,
                fee_type: 'perteam',
                min_team_size: 1,
                max_team_size: 3,
                tags: ['startup', 'entrepreneurship', 'pitch']
            }
        ];

        for (const event of events) {
            const eventResult = await pool.query(`
        INSERT INTO events (name, poster, event_date, venue, details_md, fee, fee_type, min_team_size, max_team_size, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [
                event.name,
                event.poster,
                event.event_date,
                event.venue,
                event.details_md,
                event.fee,
                event.fee_type,
                event.min_team_size || null,
                event.max_team_size || null,
                userId
            ]);

            const eventId = eventResult.rows[0].id;

            // Add tags
            if (event.tags) {
                for (const tag of event.tags) {
                    await pool.query(
                        'INSERT INTO event_tags (event_id, tag) VALUES ($1, $2)',
                        [eventId, tag]
                    );
                }
            }

            console.log(`Created event: ${event.name}`);
        }

        console.log('Seed data created successfully!');
        console.log('User ID for testing:', userId);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();
