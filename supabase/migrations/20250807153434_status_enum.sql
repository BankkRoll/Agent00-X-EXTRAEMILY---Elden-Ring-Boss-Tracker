-- Create the boss_status enum
CREATE TYPE boss_status AS ENUM ('Not Started', 'In Progress', 'Completed');

-- Add a temporary column with the new enum type
ALTER TABLE bosses ADD COLUMN status_enum boss_status;

-- Update the temporary column with converted values
UPDATE bosses SET status_enum = status::boss_status;

-- Drop the old text column
ALTER TABLE bosses DROP COLUMN status;

-- Rename the new enum column to status
ALTER TABLE bosses RENAME COLUMN status_enum TO status;

-- Set the default value for the status column
ALTER TABLE bosses ALTER COLUMN status SET DEFAULT 'Not Started';

-- Add a check constraint to ensure only valid enum values
ALTER TABLE bosses ADD CONSTRAINT bosses_status_check 
  CHECK (status IN ('Not Started', 'In Progress', 'Completed'));
