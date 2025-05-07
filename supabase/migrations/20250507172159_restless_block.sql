/*
  # Create tasks and logs tables

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (text)
      - `agent_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `completed_at` (timestamptz)
      - `priority` (text)
      - `duration` (text)

    - `logs`
      - `id` (uuid, primary key)
      - `type` (text)
      - `source` (text)
      - `message` (text)
      - `details` (text)
      - `agent_id` (uuid, foreign key)
      - `task_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text DEFAULT 'queued',
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  priority text DEFAULT 'medium',
  duration text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create logs table
CREATE TABLE IF NOT EXISTS logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  source text NOT NULL,
  message text NOT NULL,
  details text,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Logs policies
CREATE POLICY "Users can read own logs"
  ON logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own logs"
  ON logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs"
  ON logs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add trigger for updating the updated_at timestamp on tasks
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();