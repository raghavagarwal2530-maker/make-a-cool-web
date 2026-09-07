CREATE TABLE public.gigs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  gig_type TEXT NOT NULL DEFAULT 'one_time',
  poster_name TEXT,
  location_label TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  timing TEXT,
  pay TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gigs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gigs TO authenticated;
GRANT ALL ON public.gigs TO service_role;

ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gigs" ON public.gigs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users can create their own gigs" ON public.gigs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own gigs" ON public.gigs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own gigs" ON public.gigs FOR DELETE TO authenticated USING (auth.uid() = user_id);

INSERT INTO public.gigs (title, description, gig_type, poster_name, location_label, latitude, longitude, timing, pay) VALUES
('Help moving furniture', 'Need two people to help move a sofa and boxes into a new flat.', 'one_time', 'Sara M.', 'Dubai Marina, Dubai', 25.0805, 55.1403, 'Sat 9am - 1pm', 'AED 250'),
('Weekend cafe barista', 'Busy speciality cafe needs a weekend barista, training given.', 'recurring', 'Bloom Coffee', 'JLT, Dubai', 25.0693, 55.1413, 'Sat & Sun, 7am - 3pm', 'AED 90/hr'),
('Event photographer for birthday', 'Three hours of photos at a family birthday party.', 'one_time', 'Imran K.', 'Al Barsha, Dubai', 25.1120, 55.1960, 'Fri 6pm - 9pm', 'AED 600'),
('Part-time sales assistant', 'Retail brand hiring a part-time assistant for the mall store.', 'part_time', 'Nova Retail', 'Mall of the Emirates, Dubai', 25.1181, 55.2003, 'Mon/Wed/Fri, 4pm - 10pm', 'AED 4,000/month'),
('Dog walking, twice a week', 'Friendly labrador needs walks on Tuesdays and Thursdays.', 'recurring', 'Leila H.', 'Jumeirah 1, Dubai', 25.2210, 55.2560, 'Tue & Thu, 6pm', 'AED 60 per walk'),
('Deep clean a 2-bed apartment', 'One-off deep clean including kitchen and bathrooms.', 'one_time', 'Ahmed R.', 'Business Bay, Dubai', 25.1857, 55.2620, 'Sun 10am - 4pm', 'AED 400'),
('Maths tutor for grade 9', 'Twice weekly tutoring, in person, at the family home.', 'recurring', 'Priya S.', 'Mirdif, Dubai', 25.2170, 55.4200, 'Mon & Wed, 5pm - 6:30pm', 'AED 120/hr'),
('Warehouse stock count', 'One-day stock count, lifting involved, lunch provided.', 'one_time', 'SwiftLog', 'Al Quoz, Dubai', 25.1400, 55.2300, 'Thu 8am - 6pm', 'AED 350'),
('Part-time social media assistant', 'Small agency hiring part-time to schedule posts and reply to DMs.', 'part_time', 'Pixel & Co', 'Deira, Dubai', 25.2710, 55.3120, '20 hrs/week, flexible', 'AED 3,500/month'),
('Waiting staff for a wedding', 'Serving guests at an evening wedding, uniform provided.', 'one_time', 'Grand Events', 'Palm Jumeirah, Dubai', 25.1124, 55.1390, 'Sat 5pm - midnight', 'AED 450'),
('Weekly grocery run for elderly neighbour', 'Shopping and delivery once a week, list provided.', 'recurring', 'Fatima A.', 'Al Nahda, Sharjah', 25.3060, 55.3730, 'Every Monday morning', 'AED 80 per run'),
('Part-time gym receptionist', 'Front desk shifts at a boutique gym, evenings only.', 'part_time', 'Iron Yard Gym', 'Al Wasl, Dubai', 25.1900, 55.2450, 'Evenings, 5 days/week', 'AED 3,200/month'),
('Flat-pack furniture assembly', 'Two wardrobes and a desk to assemble, tools needed.', 'one_time', 'Daniel O.', 'Dubai Silicon Oasis', 25.1220, 55.3780, 'Any weekday evening', 'AED 300'),
('Delivery rider, weekends', 'Weekend deliveries around the neighbourhood, bike provided.', 'recurring', 'FreshBox', 'Abu Dhabi Corniche, Abu Dhabi', 24.4750, 54.3300, 'Sat & Sun, 11am - 8pm', 'AED 75/hr');