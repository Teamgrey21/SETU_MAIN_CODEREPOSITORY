-- Enable RLS on User_Signup table
ALTER TABLE public."User_Signup" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own signup data
CREATE POLICY "Users can view their own signup data"
ON public."User_Signup"
FOR SELECT
USING (auth.uid() = auth_user_id);

-- Enable RLS on login_details table
ALTER TABLE public."login_details" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own login details
CREATE POLICY "Users can view their own login details"
ON public."login_details"
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own login details
CREATE POLICY "Users can insert their own login details"
ON public."login_details"
FOR INSERT
WITH CHECK (auth.uid() = user_id);
