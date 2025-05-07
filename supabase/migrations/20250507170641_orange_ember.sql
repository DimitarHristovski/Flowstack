-- Disable public sign ups
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;

-- Remove existing sign up policies
DROP POLICY IF EXISTS "Users can sign up" ON auth.users;

-- Create policy to prevent new sign ups except for specific emails
CREATE POLICY "Only admin can sign up"
ON auth.users
FOR INSERT
TO authenticated
WITH CHECK (auth.email() = 'your-email@example.com');

-- Note: Replace 'your-email@example.com' with your actual email