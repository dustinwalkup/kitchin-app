
-- Create messages table
CREATE TABLE IF NOT EXISTS message (
    id TEXT PRIMARY KEY,
    body TEXT NOT NULL
);
 

INSERT INTO message (id, body) VALUES 
('msg1', 'Hello from Alice!'),
('msg2', 'Hi there from Bob!')
ON CONFLICT (id) DO NOTHING;