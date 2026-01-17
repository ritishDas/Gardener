export default `
      CREATE TABLE IF NOT EXISTS teams (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        profile_image TEXT,
        team_lead_user_id UUID NOT NULL REFERENCES users(id)
      );
`
