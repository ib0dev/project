/*
  # Create OCR Results Schema

  1. New Tables
    - `ocr_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `original_filename` (text)
      - `image_url` (text)
      - `extracted_text` (text)
      - `confidence` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ocr_results` table
    - Add policy for users to read their own OCR results
    - Add policy for users to insert their own OCR results
    - Add policy for users to delete their own OCR results
*/

CREATE TABLE IF NOT EXISTS ocr_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  original_filename text NOT NULL,
  image_url text,
  extracted_text text NOT NULL,
  confidence numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ocr_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own OCR results"
  ON ocr_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own OCR results"
  ON ocr_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own OCR results"
  ON ocr_results
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);