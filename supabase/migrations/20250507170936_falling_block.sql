/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing RLS policies on profiles table
    - Add new policies to allow authenticated users to manage their own profiles
    
  2. Security
    - Enable RLS on profiles table
    - Add policies for CRUD operations
    - Users can only access their own profile data
*/

-- Remove existing policies
DROP POLICY IF EXISTS "Only admin can create profile" ON profiles;
DROP POLICY IF EXISTS "Only admin can read profiles" ON profiles;
DROP POLICY IF EXISTS "Only admin can update profiles" ON profiles;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Add new policies
CREATE POLICY "Users can create their own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
ON profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);