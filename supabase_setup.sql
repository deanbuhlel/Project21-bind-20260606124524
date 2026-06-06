-- Create the 'knowledge_items' table
CREATE TABLE knowledge_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  image_url TEXT,
  content_type TEXT, -- e.g., 'video', 'article', 'unknown'
  status TEXT DEFAULT 'pending' -- e.g., 'pending', 'processed', 'failed'
);

-- Enable Row Level Security (RLS) for the 'knowledge_items' table
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view their own knowledge items
CREATE POLICY "Users can view their own knowledge items." ON knowledge_items
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for authenticated users to insert their own knowledge items
CREATE POLICY "Users can insert their own knowledge items." ON knowledge_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to update their own knowledge items
CREATE POLICY "Users can update their own knowledge items." ON knowledge_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for authenticated users to delete their own knowledge items
CREATE POLICY "Users can delete their own knowledge items." ON knowledge_items
  FOR DELETE USING (auth.uid() = user_id);
