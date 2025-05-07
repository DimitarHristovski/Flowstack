/*
  # Delete agents table and data

  1. Changes
    - Drop the agents table and all associated data
    - Remove all policies related to the agents table
    - Clean up any triggers related to the agents table

  Note: This is a destructive operation that will permanently delete all agent data
*/

-- Drop the agents table (this will automatically drop associated policies and triggers)
DROP TABLE IF EXISTS agents CASCADE;