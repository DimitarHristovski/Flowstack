/*
  # Create agents table

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text)
      - `image` (text)
      - `status` (text) - active, idle, stopped, error
      - `current_task` (text)
      - `last_active` (timestamptz)
      - `type` (text)
      - `performance` (integer)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for CRUD operations
      - Users can only access their own agents
*/

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image text,
  status text DEFAULT 'idle',
  current_task text,
  last_active timestamptz,
  type text,
  performance integer DEFAULT 0,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Users can read their own agents
CREATE POLICY "Users can read own agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own agents
CREATE POLICY "Users can create own agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own agents
CREATE POLICY "Users can update own agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own agents
CREATE POLICY "Users can delete own agents"
  ON agents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add trigger for updating the updated_at timestamp
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();