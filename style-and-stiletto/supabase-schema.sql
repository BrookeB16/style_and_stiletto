-- Run this in Supabase > SQL Editor to create your table

create table style_profiles (
  id                     uuid default gen_random_uuid() primary key,
  submitted_at           timestamptz,

  -- About You
  first_name             text,
  last_name              text,
  email                  text not null,
  age_range              text,
  location               text,

  -- Budget
  budget_everyday        text,
  investment_pieces      text,
  budget_investment      text,
  shopping_preference    text,

  -- Wardrobe
  shopping_for           text,
  office_dress_code      text,
  work_environment_notes text,
  current_wardrobe       text,
  shoe_interest          text,
  accessory_interest     text,

  -- Aesthetic
  color_preference       text,
  colors_loved           text,
  colors_avoided         text,
  pattern_preference     text,
  aesthetic_words        text,
  style_inspiration      text,

  -- Body & Fit
  body_shape             text,
  size_tops              text,
  size_bottoms           text,
  shoe_size              text,
  height                 text,
  areas_highlight        text,
  areas_minimize         text,
  fit_preference         text,

  -- Lifestyle
  daily_activity         text,
  comfort_importance     text,
  fabrics_loved          text,
  fabrics_avoided        text,
  sustainability         text,
  special_considerations text,

  -- Service Preferences
  delivery_preference    text,
  brands_loved           text,
  brands_avoided         text,
  involvement_level      text,
  timeline               text,

  -- Final Notes
  styling_frustration    text,
  success_looks_like     text,
  anything_else          text
);

-- Disable public access (API key handles auth)
alter table style_profiles enable row level security;

-- Allow inserts from your service role key only
create policy "Service role insert" on style_profiles
  for insert with check (true);

create policy "Service role select" on style_profiles
  for select using (true);
