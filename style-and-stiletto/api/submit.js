import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body;

    if (!body.first_name || !body.email) {
      return res.status(400).json({ error: 'First name and email are required.' });
    }

    const { data, error } = await supabase
      .from('style_profiles')
      .insert([{
        // About You
        first_name:            body.first_name,
        last_name:             body.last_name,
        email:                 body.email,
        age_range:             body.age_range,
        location:              body.location,

        // Budget
        budget_everyday:       body.budget_everyday,
        investment_pieces:     body.investment_pieces,
        budget_investment:     body.budget_investment,
        shopping_preference:   body.shopping_preference,

        // Wardrobe Needs
        shopping_for:          body.shopping_for,
        office_dress_code:     body.office_dress_code,
        work_environment_notes:body.work_environment_notes,
        current_wardrobe:      body.current_wardrobe,
        shoe_interest:         body.shoe_interest,
        accessory_interest:    body.accessory_interest,

        // Aesthetic
        color_preference:      body.color_preference,
        colors_loved:          body.colors_loved,
        colors_avoided:        body.colors_avoided,
        pattern_preference:    body.pattern_preference,
        aesthetic_words:       body.aesthetic_words,
        style_inspiration:     body.style_inspiration,

        // Body & Fit
        body_shape:            body.body_shape,
        size_tops:             body.size_tops,
        size_bottoms:          body.size_bottoms,
        shoe_size:             body.shoe_size,
        height:                body.height,
        areas_highlight:       body.areas_highlight,
        areas_minimize:        body.areas_minimize,
        fit_preference:        body.fit_preference,

        // Lifestyle
        daily_activity:        body.daily_activity,
        comfort_importance:    body.comfort_importance,
        fabrics_loved:         body.fabrics_loved,
        fabrics_avoided:       body.fabrics_avoided,
        sustainability:        body.sustainability,
        special_considerations:body.special_considerations,

        // Service Preferences
        delivery_preference:   body.delivery_preference,
        brands_loved:          body.brands_loved,
        brands_avoided:        body.brands_avoided,
        involvement_level:     body.involvement_level,
        timeline:              body.timeline,

        // Final Notes
        styling_frustration:   body.styling_frustration,
        success_looks_like:    body.success_looks_like,
        anything_else:         body.anything_else,

        submitted_at:          new Date().toISOString(),
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save your profile. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data[0].id });

  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
