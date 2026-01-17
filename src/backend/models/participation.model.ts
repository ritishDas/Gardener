
export default `
      CREATE TABLE IF NOT EXISTS participation (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        event_id UUID REFERENCES events(id) ON DELETE CASCADE,
        team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (user_id, event_id)
      );
`
