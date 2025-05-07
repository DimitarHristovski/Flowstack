/*
  # Add price column to agents table

  1. Changes
    - Add price column to agents table with default value of 0
    - Add check constraint to ensure price is non-negative

  2. Notes
    - Uses safe migration pattern with existence check
    - Preserves existing data
*/

DO $$
BEGIN
  -- Add price column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'price'
  ) THEN
    ALTER TABLE agents ADD COLUMN price numeric DEFAULT 0;
    
    -- Add check constraint for non-negative prices
    ALTER TABLE agents ADD CONSTRAINT agents_price_check CHECK (price >= 0);
  END IF;
END $$;