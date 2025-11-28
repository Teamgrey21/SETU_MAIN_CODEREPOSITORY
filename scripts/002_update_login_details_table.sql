-- Update login_details table to work with auth
ALTER TABLE login_details 
ALTER COLUMN user_id TYPE uuid USING user_id::uuid,
ADD COLUMN IF NOT EXISTS email character varying;

-- Add foreign key constraint
ALTER TABLE login_details
DROP CONSTRAINT IF EXISTS login_details_user_id_fkey,
ADD CONSTRAINT login_details_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Create index
CREATE INDEX IF NOT EXISTS idx_login_details_user_id ON login_details(user_id);
