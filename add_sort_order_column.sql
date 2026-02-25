-- Add sort_order column to properties table
ALTER TABLE properties ADD COLUMN sort_order INT DEFAULT 0;

-- Set initial sort_order based on existing properties (optional - if you want to reset order)
-- UPDATE properties SET sort_order = id;

-- Create index for faster sorting
CREATE INDEX idx_sort_order ON properties(sort_order);
