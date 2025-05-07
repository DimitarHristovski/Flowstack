/*
  # Restrict user registration
  
  1. Changes
    - Modify profiles table policies to only allow specific email
    - Remove existing policies
    - Add strict policy for profile creation
  
  2. Security
    - Only allows specified email to create profiles
    - Maintains RLS enabled
*/

-- Remove existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create restrictive policies
CREATE POLICY "Only admin can create profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.email() = 'admin@agenthub.ai');

CREATE POLICY "Only admin can read profiles"
ON profiles
FOR SELECT
TO authenticated
USING (auth.email() = 'admin@agenthub.ai');

CREATE POLICY "Only admin can update profiles"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.email() = 'admin@agenthub.ai')
WITH CHECK (auth.email() = 'admin@agenthub.ai');