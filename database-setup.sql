-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'website',
  user_agent TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Restrict public reads" ON waitlist;

-- Create policy to allow inserts from anyone (for public signups)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to prevent public reads (only authenticated users can read)
CREATE POLICY "Restrict public reads" ON waitlist
  FOR SELECT 
  USING (false);

-- Grant necessary permissions
GRANT INSERT ON waitlist TO anon;
GRANT USAGE ON SEQUENCE waitlist_id_seq TO anon;
