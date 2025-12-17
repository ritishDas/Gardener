export default `
      DO $$ BEGIN
        CREATE TYPE fee_type AS ENUM ('perperson', 'perteam');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        poster TEXT,
        other_images TEXT[],
        event_date TIMESTAMPTZ NOT NULL,
        venue TEXT,
        details_md TEXT,
        fee NUMERIC(10,2) NOT NULL CHECK (fee >= 0),
        fee_type fee_type NOT NULL,
        min_team_size INT CHECK (min_team_size > 0),
        max_team_size INT CHECK (max_team_size >= min_team_size),
        owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS event_tags (
        event_id UUID REFERENCES events(id) ON DELETE CASCADE,
        tag TEXT NOT NULL
      );
`
