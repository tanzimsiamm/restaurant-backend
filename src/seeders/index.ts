import connectDB from '../config/database';
import { seedTeamMembers } from '../modules/team/team.seed';

const runSeeders = async () => {
  try {
    await connectDB();
    await seedTeamMembers();
    console.log('✅ All seeders completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder error:', error);
    process.exit(1);
  }
};

runSeeders();