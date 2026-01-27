-- Execute this command in your Supabase SQL Editor to add support for multiple images
ALTER TABLE products ADD COLUMN images TEXT[];
