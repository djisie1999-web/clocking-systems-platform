import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

// ─── Seed Credentials ────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "admin123";
const USER_PASSWORD = "demo1234";

// ─── Demo Users ───────────────────────────────────────────────────────────────
//
// These represent a realistic cross-section of Clocking Systems customers:
//  - Platform admins who manage the service
//  - Business customers from various industries (manufacturing, retail, health,
//    hospitality, construction, logistics, tech startups)
//  - One inactive account to demonstrate the isActive flag in the dashboard

interface SeedUser {
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  password: string;
}

const SEED_USERS: SeedUser[] = [
  // ── Platform Admins ───────────────────────────────────────────────────────
  {
    email: "admin@clockingsystems.com",
    name: "Alex Carter",
    role: "ADMIN",
    isActive: true,
    password: ADMIN_PASSWORD,
  },
  {
    email: "support@clockingsystems.com",
    name: "Sarah Mitchell",
    role: "ADMIN",
    isActive: true,
    password: ADMIN_PASSWORD,
  },

  // ── Business Customers ────────────────────────────────────────────────────

  // Manufacturing — 200-person steel fabrication plant
  {
    email: "carlos.mendez@steelworks.com",
    name: "Carlos Mendez",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Retail — regional supermarket chain HR director
  {
    email: "james.taylor@acmecorp.com",
    name: "James Taylor",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Food & Beverage — bakery operations manager
  {
    email: "emma.johnson@freshbake.co.uk",
    name: "Emma Johnson",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Healthcare — NHS trust HR manager
  {
    email: "priya.patel@healthplus.nhs",
    name: "Priya Patel",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Construction — site administrator tracking sub-contractors
  {
    email: "sophie.williams@constructco.com",
    name: "Sophie Williams",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Tech — SaaS start-up founder managing remote + office staff
  {
    email: "david.nguyen@techstart.io",
    name: "David Nguyen",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Hospitality — venue and events manager
  {
    email: "linda.chen@hospitality.com",
    name: "Linda Chen",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Retail — multi-site store manager
  {
    email: "oliver.brown@retailchain.com",
    name: "Oliver Brown",
    role: "USER",
    isActive: true,
    password: USER_PASSWORD,
  },

  // Logistics — account suspended / inactive (demonstrates isActive=false UI state)
  {
    email: "michael.harris@logistics.co",
    name: "Michael Harris",
    role: "USER",
    isActive: false,
    password: USER_PASSWORD,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Legacy test admin (preserved for backwards compatibility) ──────────────
  const legacyHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.user.upsert({
    where: { email: "test@admin.com" },
    update: {},
    create: {
      email: "test@admin.com",
      passwordHash: legacyHash,
      name: "Test Admin",
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("  ✅ Legacy admin preserved  <test@admin.com>");

  // ── Demo users ─────────────────────────────────────────────────────────────
  let created = 0;
  let skipped = 0;

  for (const u of SEED_USERS) {
    // Check existence first so we can log create vs skip accurately
    const existing = await db.user.findUnique({ where: { email: u.email } });

    if (!existing) {
      const passwordHash = await bcrypt.hash(u.password, 12);
      await db.user.create({
        data: {
          email: u.email,
          passwordHash,
          name: u.name,
          role: u.role,
          isActive: u.isActive,
        },
      });
      const status = u.isActive ? "active  " : "inactive";
      console.log(
        `  ✅ Created   ${u.role.padEnd(5)}  [${status}]  ${u.name} <${u.email}>`
      );
      created++;
    } else {
      const status = u.isActive ? "active  " : "inactive";
      console.log(
        `  ⏭  Skipped   ${u.role.padEnd(5)}  [${status}]  ${u.name} <${u.email}>`
      );
      skipped++;
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  const total = await db.user.count();

  console.log(`\n✨ Seed complete`);
  console.log(`   Created : ${created}`);
  console.log(`   Skipped : ${skipped} (already existed)`);
  console.log(`   Total   : ${total} users in database`);

  console.log("\n📋 Demo login credentials");
  console.log("   ┌────────────────────────────────────────────────────────┐");
  console.log(`   │  Admin   admin@clockingsystems.com  / ${ADMIN_PASSWORD}    │`);
  console.log(`   │  Admin   support@clockingsystems.com / ${ADMIN_PASSWORD}   │`);
  console.log(`   │  Admin   test@admin.com              / ${ADMIN_PASSWORD}   │`);
  console.log(`   │  User    james.taylor@acmecorp.com  / ${USER_PASSWORD}     │`);
  console.log(`   │  User    (any other user)            / ${USER_PASSWORD}     │`);
  console.log("   └────────────────────────────────────────────────────────┘");
}

main()
  .catch((e) => {
    console.error("\n❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
