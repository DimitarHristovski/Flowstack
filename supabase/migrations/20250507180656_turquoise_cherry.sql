/*
  # Add category column to agents table

  1. Changes
    - Add category column to agents table with default value
    - Add NOT NULL constraint after setting default
    - Add check constraint for valid categories

  2. Notes
    - Uses a two-step process to handle existing rows
    - Ensures data consistency with check constraint
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