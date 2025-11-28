-- Create user_onboarding_information table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_onboarding_information (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email character varying NOT NULL,
  
  -- Personal Information
  name character varying,
  age integer,
  occupation character varying,
  
  -- Financial Information
  income_per_month numeric,
  expenses_per_month numeric,
  savings_per_month numeric,
  
  -- Assets
  major_assets text,
  assets_value numeric,
  
  -- Goals
  short_term_goals text,
  short_term_goals_value numeric,
  long_term_goals text,
  long_term_goals_value numeric,
  
  -- Investment
  have_done_investing boolean DEFAULT false,
  investment_types text,
  invest_money_in_yourself text,
  
  -- Other
  send_money_to_parents_or_education boolean DEFAULT false,
  approach_to_life_planning text,
  liked_onboarding_process boolean,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_onboarding_user_id ON user_onboarding_information(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_email ON user_onboarding_information(email);

-- Enable RLS
ALTER TABLE user_onboarding_information ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own onboarding data" 
  ON user_onboarding_information 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding data" 
  ON user_onboarding_information 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data" 
  ON user_onboarding_information 
  FOR UPDATE 
  USING (auth.uid() = user_id);
