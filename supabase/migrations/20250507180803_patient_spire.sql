/*
  # Update agents table category column

  1. Changes
    - Ensures category column exists with correct constraints
    - Sets default category to 'productivity'
    - Adds check constraint for valid categories

  2. Notes
    - Handles case where column may already exist
    - Updates any existing NULL values
    - Makes column NOT NULL
*/

DO $$ 
BEGIN
  -- Only add the column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'category'
  ) THEN
    ALTER TABLE agents 
    ADD COLUMN category text DEFAULT 'productivity';
  END IF;

  -- Update any existing NULL values
  UPDATE agents SET category = 'productivity' WHERE category IS NULL;

  -- Make it NOT NULL if it isn't already
  ALTER TABLE agents 
  ALTER COLUMN category SET NOT NULL;

  -- Add check constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'agents' AND constraint_name = 'agents_category_check'
  ) THEN
    ALTER TABLE agents
    ADD CONSTRAINT agents_category_check
    CHECK (category IN ('productivity', 'creativity', 'research', 'communication', 'finance', 'coding'));
  END IF;
END $$;