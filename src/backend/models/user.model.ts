export default `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        profile_image TEXT,
        bio TEXT
      );
`
