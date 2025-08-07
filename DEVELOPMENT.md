# Development Guide

Complete setup guide for the Elden Ring Boss Tracker project.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm**, **yarn**, or **pnpm** (pnpm recommended)
- **Git**
- **Code editor** (VS Code recommended)
- **Supabase account** (free tier works)

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/BankkRoll/Agent00-X-EXTRAEMILY---Elden-Ring-Boss-Tracker.git

# Navigate to the project directory
cd Agent00-X-EXTRAEMILY---Elden-Ring-Boss-Tracker
```

## Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

## Step 3: Set Up Supabase

### 3.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `elden-ring-boss-tracker`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to you
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

### 3.2 Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### 3.3 Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL commands:

```sql
-- Create the boss_status enum
CREATE TYPE boss_status AS ENUM ('Not Started', 'In Progress', 'Completed');

-- Create bosses table
CREATE TABLE IF NOT EXISTS bosses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status boss_status DEFAULT 'Not Started',
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

-- Enable Row Level Security
ALTER TABLE bosses ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Anyone can read bosses"
  ON bosses FOR SELECT TO public USING (true);

-- Create authenticated user management policy
CREATE POLICY "Authenticated users can manage bosses"
  ON bosses FOR ALL TO authenticated USING (true);
```

### 3.4 Insert Initial Data

Run this SQL to populate the database with initial boss data:

```sql
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
```

## Step 4: Environment Variables

### 4.1 Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Create the environment file
touch .env.local
```

### 4.2 Add Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON=your_supabase_anon_key_here
```

Replace the placeholder values with your actual Supabase credentials from Step 3.2.

## Step 5: Run the Development Server

```bash
# Start the development server
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 6: Verify Setup

1. **Check the main page** - Should show the boss tracker with live data
2. **Check admin page** - Navigate to `/admin` (will show login screen)
3. **Check real-time updates** - Data should update automatically

## Step 7: Admin Access Setup

### 7.1 Create Admin User

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Enter admin email and password
5. The user will receive an email to confirm their account

### 7.2 Test Admin Login

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with your admin credentials
3. You should see the admin dashboard with boss management tools

## Step 8: Development Workflow

### 8.1 Code Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── landing/          # Landing page components
│   ├── layout/           # Layout components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility libraries
│   ├── database.types.ts # Database types
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
├── supabase/             # Database migrations
└── hooks/                # Custom React hooks
```

### 8.2 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
```

### 8.3 Making Changes

1. **Create a new branch** for your feature
2. **Make your changes** in the appropriate directories
3. **Test locally** using `pnpm dev`
4. **Commit your changes** with descriptive messages
5. **Push to your branch** and create a pull request

## Step 9: Testing

### 9.1 Manual Testing

1. **Test public features**:

   - Boss cards display correctly
   - Progress indicators work
   - Twitch clips open properly
   - Real-time updates function

2. **Test admin features**:
   - Login works
   - Boss updates save correctly
   - Form validation works
   - Real-time updates in admin

### 9.2 Browser Testing

Test in multiple browsers:

- Chrome
- Firefox
- Safari
- Edge

### 1.3 Mobile Testing

Test responsive design:

- iPhone (Safari)
- Android (Chrome)
- Tablet devices

## Step 10: Deployment

### 10.1 Vercel Deployment (Recommended)

1. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

2. **Environment Variables in Vercel**:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON=your_supabase_anon_key
   ```

3. **Deploy**:
   - Vercel will automatically deploy on push to main branch
   - Preview deployments for pull requests

### 10.2 Other Deployment Options

**Netlify**:

- Similar to Vercel setup
- Add environment variables in Netlify dashboard

**Railway**:

- Good for full-stack applications
- Automatic deployments from GitHub

**Self-hosted**:

- Build with `pnpm build`
- Serve with `pnpm start`
- Use reverse proxy (nginx) for production

## Step 11: Troubleshooting

### 11.1 Common Issues

**Environment Variables Not Working**:

- Ensure `.env.local` is in root directory
- Restart development server after changes
- Check variable names match exactly

**Supabase Connection Issues**:

- Verify project URL and anon key
- Check if Supabase project is active
- Ensure RLS policies are correct

**Build Errors**:

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check TypeScript errors: `pnpm lint`

**Real-time Not Working**:

- Verify Supabase Realtime is enabled
- Check network connectivity
- Ensure proper subscription setup

### 11.2 Debug Commands

```bash
# Check Node.js version
node --version

# Check package manager version
pnpm --version

# Check if all dependencies are installed
pnpm list

# Run TypeScript check
pnpm tsc --noEmit

# Check for linting errors
pnpm lint

# Build project to check for errors
pnpm build
```

## Step 12: Performance Optimization

### 12.1 Code Splitting

- Use dynamic imports for heavy components
- Implement lazy loading for images
- Optimize bundle size

### 12.2 Database Optimization

- Add indexes for frequently queried columns
- Use pagination for large datasets
- Implement caching strategies

### 12.3 Image Optimization

- Use Next.js Image component
- Optimize image formats (WebP)
- Implement lazy loading

## Step 13: Security Considerations

### 13.1 Environment Variables

- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys regularly

### 13.2 Database Security

- Use Row Level Security (RLS) policies
- Limit admin access to necessary users
- Regular security audits

### 13.3 API Security

- Validate all inputs
- Implement rate limiting
- Use HTTPS in production

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Support

For development support:

- Check the troubleshooting section above
- Review the documentation links
- Create an issue on GitHub
- Contact the maintainer for admin access
