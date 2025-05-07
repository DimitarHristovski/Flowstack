/*
  # Add price column to agents table

  1. Changes
    - Add `price` column to `agents` table with type numeric and default value of 0
    - Make the column nullable to maintain compatibility with existing records

  2. Notes
    - Uses IF NOT EXISTS to prevent errors if column already exists
    - Sets default value to 0 for consistency
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'price'
  ) THEN
    ALTER TABLE agents ADD COLUMN price numeric DEFAULT 0;
  END IF;
END $$;