import User from '../models/user.js';
import bcrypt from 'bcrypt';

export async function seedAdmin() {
  const adminEmail = 'admin@authmaster.com';

  const existingAdmin = await User.findOne({ mail: adminEmail });
  if (existingAdmin) return;

  const passwordHash = await bcrypt.hash('Hunger123^', 10);

  const admin = new User({
    name: 'System',
    surname: 'Admin',
    mail: adminEmail,
    passwordHash,
    role: 'Admin'
  });

  await admin.save();
  console.log('✅ Admin user seeded');
}
