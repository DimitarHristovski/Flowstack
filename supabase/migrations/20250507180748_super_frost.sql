/*
  # Add category column to agents table

  1. Changes
    - Add category column with default value
    - Update existing rows
    - Make column NOT NULL
    - Add check constraint for valid categories

  2. Security
    - No changes to RLS policies needed
*/

-- First add the column with a default value
ALTER TABLE agents 
ADD COLUMN category text DEFAULT 'productivity';

-- Update any existing rows that might have NULL values
UPDATE agents SET category = 'productivity' WHERE category IS NULL;

-- Now make it NOT NULL
ALTER TABLE agents 
ALTER COLUMN category SET NOT NULL;

-- Add check constraint for valid categories
ALTER TABLE agents
ADD CONSTRAINT agents_category_check
CHECK (category IN ('productivity', 'creativity', 'research', 'communication', 'finance', 'coding'));