-- Performance Optimization: Add Database Indexes
-- Run this SQL file in phpMyAdmin to speed up property queries

-- Add index on created_at for faster sorting
ALTER TABLE properties ADD INDEX idx_created_at (created_at);

-- Add index on status for filtering
ALTER TABLE properties ADD INDEX idx_status (status);

-- Add index on category for filtering
ALTER TABLE properties ADD INDEX idx_category (category);

-- Add index on isBestChoice for filtering
ALTER TABLE properties ADD INDEX idx_isBestChoice (isBestChoice);

-- Add composite index for common query patterns
ALTER TABLE properties ADD INDEX idx_status_category (status, category);

-- Add index on location for location-based searches
ALTER TABLE properties ADD INDEX idx_location (location(100));

-- If sort_order column exists, add index on it
-- ALTER TABLE properties ADD INDEX idx_sort_order (sort_order);
