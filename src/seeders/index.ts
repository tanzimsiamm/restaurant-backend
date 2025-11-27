import connectDB from '../config/database';
import { seedTeamMembers } from '../modules/team/team.seed';
import { seedSliders } from '../modules/slider/slider.seed';

const runSeeders = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting seeders...\n');
    
    await seedSliders();
    await seedTeamMembers();
    
    console.log('\n✅ All seeders completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder error:', error);
    process.exit(1);
  }
};

runSeeders();