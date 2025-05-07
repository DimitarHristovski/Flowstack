/*
  # Add category column to agents table

  1. Changes
    - Add category column to agents table
    - Make category column required
    - Add check constraint to ensure valid categories

  2. Security
    - No changes to RLS policies needed
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'category'
  ) THEN
    ALTER TABLE agents 
    ADD COLUMN category text NOT NULL;

    -- Add check constraint for valid categories
    ALTER TABLE agents
    ADD CONSTRAINT agents_category_check
    CHECK (category IN ('productivity', 'creativity', 'research', 'communication', 'finance', 'coding'));
  END IF;
END $$;