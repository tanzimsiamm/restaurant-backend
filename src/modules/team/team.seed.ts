import Team from './team.model';

const teamSeedData = [
  {
    name: 'Mark Henry',
    position: 'Owner',
    image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&h=500&fit=crop',
    bio: 'Passionate about creating exceptional dining experiences.',
    order: 1,
    isActive: true,
  },
  {
    name: 'Lucky Helen',
    position: 'Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop',
    bio: 'Award-winning chef with 15 years of culinary expertise.',
    order: 2,
    isActive: true,
  },
  {
    name: 'Moon Henry',
    position: 'Founder',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop',
    bio: 'Visionary founder dedicated to quality and innovation.',
    order: 3,
    isActive: true,
  },
  {
    name: 'Tom Monrow',
    position: 'Specialist',
    image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=400&fit=crop',
    bio: 'Food specialist with expertise in nutrition and presentation.',
    order: 4,
    isActive: true,
  },
];

export const seedTeamMembers = async () => {
  try {
    // Clear existing team members
    await Team.deleteMany({});
    console.log('🗑️  Cleared existing team members');

    // Insert new team members
    const result = await Team.insertMany(teamSeedData);
    console.log(`✅ Successfully seeded ${result.length} team members`);
    
    return result;
  } catch (error) {
    console.error('❌ Error seeding team members:', error);
    throw error;
  }
};