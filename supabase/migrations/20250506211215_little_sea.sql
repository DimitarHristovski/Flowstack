/*
  # Fix profiles table RLS policies

  1. Changes
    - Add INSERT policy for profiles table to allow authenticated users to create their own profile
    
  2. Security
    - New policy allows authenticated users to insert their own profile where auth.uid() matches the profile id
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);