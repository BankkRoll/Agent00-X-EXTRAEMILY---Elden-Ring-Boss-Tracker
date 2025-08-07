-- Bosses table
CREATE TABLE IF NOT EXISTS bosses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text DEFAULT 'Not Started',
  start_time text,
  end_time text,
  level_emily integer DEFAULT 0,
  level_agent integer DEFAULT 0,
  death_count_emily integer DEFAULT 0,
  death_count_agent integer DEFAULT 0,
  clip_link text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bosses ENABLE ROW LEVEL SECURITY;

-- Public read access to bosses
CREATE POLICY "Anyone can read bosses"
  ON bosses
  FOR SELECT
  TO public
  USING (true);

-- Admin access to bosses
CREATE POLICY "Authenticated users can manage bosses"
  ON bosses
  FOR ALL
  TO authenticated
  USING (true);

-- Insert initial boss data
INSERT INTO bosses (name, status, start_time, end_time, level_emily, level_agent, death_count_emily, death_count_agent, clip_link, order_index) VALUES
('Tree Sentinel', 'Completed', '0:45:20', '2:06:36', 7, 9, 25, 25, 'https://www.twitch.tv/extraemily/clip/AbstruseGlamorousCoyoteWTRuck-MrjbhFP7YcDmOG16', 1),
('Margit, The Fell Omen', 'Completed', '3:13:30', '3:46:30', 15, 16, 5, 5, 'https://www.twitch.tv/extraemily/clip/OpenWrongHamCurseLit-LKbEkT_YLr3HNj00', 2),
('Godrick The Grafted', 'Completed', '5:00:52', '6:14:00', 23, 23, 15, 15, 'https://www.twitch.tv/extraemily/clip/SnappyNaiveHummingbirdFeelsBadMan-_VFHp39Dl-0OaqeB', 3),
('Red Wolf of Radagon', 'Completed', '17:28:10', '17:31:50', 44, 46, 1, 1, 'https://www.twitch.tv/extraemily/clip/CloudyFurryLaptopNomNom-9wqyfNQuxziOXC2q', 4),
('Rennala, Queen Of The Full Moon', 'Completed', '18:07:20', '19:41:20', 46, 48, 5, 5, 'https://www.twitch.tv/extraemily/clip/LittleApatheticPancakeOhMyDog-QZKPIIaNwUyyzI-p', 5),
('Starscourge Radahn', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 6),
('Godfrey, First Elden Lord (Golden Shade)', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 7),
('Morgott The Omen King', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 8),
('Godskin Noble', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 9),
('Rykard, Lord of Blasphemy', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 10),
('Commander Niall', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 11),
('Fire Giant', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 12),
('Godskin Duo', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 13),
('Maliketh, The Black Blade', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 14),
('Dragonlord Placidusax', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 15),
('Loretta, Knight of The Haligtree', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 16),
('Malenia, Blade of Miquella', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 17),
('Mohg, Lord of Blood', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 18),
('Sir Gideon Ofnir, the All-Knowing', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 19),
('Godfrey, First Elden Lord', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 20),
('Radagon of the Golden Order - Elden Beast', 'Not Started', NULL, NULL, 0, 0, 0, 0, NULL, 21);