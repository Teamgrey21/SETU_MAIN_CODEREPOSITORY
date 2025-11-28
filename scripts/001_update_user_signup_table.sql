-- Update User_Signup table to include email and password fields
ALTER TABLE "User_Signup" 
ADD COLUMN IF NOT EXISTS email character varying,
ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_signup_auth_user_id ON "User_Signup"(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_user_signup_email ON "User_Signup"(email);
