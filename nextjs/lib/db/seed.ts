import db from './client';

export function seedDatabase(force = false) {
  // Check if already seeded
  const existing = db.prepare('SELECT COUNT(*) as count FROM Student').get() as { count: number };
  if (existing.count > 0 && !force) {
    return { message: 'Database already seeded', skipped: true };
  }

  db.transaction(() => {
    // Wipe existing data in dependency order
    db.prepare('DELETE FROM Application').run();
    db.prepare('DELETE FROM Job').run();
    db.prepare('DELETE FROM Student').run();
    db.prepare('DELETE FROM Company').run();
    db.prepare('DELETE FROM University').run();
    // Reset autoincrement counters
    db.prepare("DELETE FROM sqlite_sequence WHERE name IN ('Application','Job','Student','Company','University')").run();
    // Universities
    const gsu = db.prepare(`
      INSERT INTO University (Uni_Name, Uni_Email)
      VALUES ('Georgia Southern University', 'info@georgiasouthern.edu')
    `).run();

    const gt = db.prepare(`
      INSERT INTO University (Uni_Name, Uni_Email)
      VALUES ('Georgia Tech', 'info@gatech.edu')
    `).run();

    const uga = db.prepare(`
      INSERT INTO University (Uni_Name, Uni_Email)
      VALUES ('University of Georgia', 'info@uga.edu')
    `).run();

    const emory = db.prepare(`
      INSERT INTO University (Uni_Name, Uni_Email)
      VALUES ('Emory University', 'info@emory.edu')
    `).run();

    // Companies
    const technova = db.prepare(`
      INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_Email)
      VALUES ('TechNova Inc.', 'Computer Science', 'careers@technova.com')
    `).run();

    const brightwave = db.prepare(`
      INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_Email)
      VALUES ('BrightWave Media', 'Marketing', 'jobs@brightwavemedia.com')
    `).run();

    const dsl = db.prepare(`
      INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_Email)
      VALUES ('Data Science Lab', 'Data Science', 'research@datasciencelab.org')
    `).run();

    const pixelcraft = db.prepare(`
      INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_Email)
      VALUES ('PixelCraft Studio', 'Design', 'hiring@pixelcraft.io')
    `).run();

    const alphaventures = db.prepare(`
      INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_Email)
      VALUES ('Alpha Ventures', 'Business', 'talent@alphaventures.com')
    `).run();

    // Jobs
    const job1 = db.prepare(`
      INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
      VALUES (
        'Software Engineering Intern',
        'TechNova is seeking a motivated Software Engineering Intern to join our development team. You will work on backend APIs, automation tools, and real-world engineering challenges.',
        'Atlanta, GA', 'Internship', 'Software Engineering', ?
      )
    `).run(technova.lastInsertRowid);

    const job2 = db.prepare(`
      INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
      VALUES (
        'Marketing Assistant',
        'Assist with campaigns, social media strategy, and brand development at a fast-growing media company.',
        'Savannah, GA', 'Part-time', 'Marketing', ?
      )
    `).run(brightwave.lastInsertRowid);

    const job3 = db.prepare(`
      INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
      VALUES (
        'Research Assistant',
        'Support machine learning experiments, data preparation, and model evaluation in an academic lab setting.',
        'Remote', 'Internship', 'Data Science', ?
      )
    `).run(dsl.lastInsertRowid);

    db.prepare(`
      INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
      VALUES (
        'UI/UX Design Intern',
        'Join our creative team to design intuitive user interfaces and engaging digital experiences for clients across industries.',
        'Athens, GA', 'Internship', 'Design', ?
      )
    `).run(pixelcraft.lastInsertRowid);

    db.prepare(`
      INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
      VALUES (
        'Business Development Associate',
        'Support deal sourcing, market research, and client outreach at a fast-paced venture firm.',
        'Atlanta, GA', 'Full-time', 'Business', ?
      )
    `).run(alphaventures.lastInsertRowid);

    // Students
    const insertStudent = db.prepare(`
      INSERT INTO Student (Stu_Name, Stu_Age, Stu_GPA, Stu_Major, Stu_Courses, Stu_GradYr, Stu_Email, Stu_JobExp, Uni_id)
      VALUES (@Stu_Name, @Stu_Age, @Stu_GPA, @Stu_Major, @Stu_Courses, @Stu_GradYr, @Stu_Email, @Stu_JobExp, @Uni_id)
    `);

    // 1. George Harris – CS @ Georgia Southern
    insertStudent.run({
      Stu_Name: 'George Harris', Stu_Age: 21, Stu_GPA: 3.5,
      Stu_Major: 'Computer Science',
      Stu_Courses: 'Java,SQL,HTML & CSS,Python,React,Git & GitHub',
      Stu_GradYr: 2025, Stu_Email: 'gh89004@georgiasouthern.edu',
      Stu_JobExp: 'Software Engineering Intern at TechNova Inc. (2024-Present). Research Assistant at Data Science Lab (2023-2024).',
      Uni_id: gsu.lastInsertRowid,
    });

    // 2. Priya Patel – Data Science @ Georgia Tech
    insertStudent.run({
      Stu_Name: 'Priya Patel', Stu_Age: 22, Stu_GPA: 3.9,
      Stu_Major: 'Data Science',
      Stu_Courses: 'Python,R,TensorFlow,SQL,Tableau,Statistics',
      Stu_GradYr: 2025, Stu_Email: 'ppatel@gatech.edu',
      Stu_JobExp: 'Data Science Intern at Delta Analytics (2023). Teaching Assistant for ML course (2024).',
      Uni_id: gt.lastInsertRowid,
    });

    // 3. Marcus Williams – Computer Science @ Georgia Tech
    insertStudent.run({
      Stu_Name: 'Marcus Williams', Stu_Age: 20, Stu_GPA: 3.7,
      Stu_Major: 'Computer Science',
      Stu_Courses: 'C++,Python,Algorithms,Operating Systems,Networking,Docker',
      Stu_GradYr: 2026, Stu_Email: 'mwilliams@gatech.edu',
      Stu_JobExp: 'Software Development Intern at IBM (Summer 2024).',
      Uni_id: gt.lastInsertRowid,
    });

    // 4. Sofia Reyes – Marketing @ University of Georgia
    insertStudent.run({
      Stu_Name: 'Sofia Reyes', Stu_Age: 21, Stu_GPA: 3.6,
      Stu_Major: 'Marketing',
      Stu_Courses: 'Digital Marketing,SEO,Content Strategy,Adobe Creative Suite,Google Analytics',
      Stu_GradYr: 2025, Stu_Email: 'sreyes@uga.edu',
      Stu_JobExp: 'Marketing Intern at BrightWave Media (2024). Social Media Coordinator at UGA Athletics (2023).',
      Uni_id: uga.lastInsertRowid,
    });

    // 5. James Okafor – Business @ University of Georgia
    insertStudent.run({
      Stu_Name: 'James Okafor', Stu_Age: 23, Stu_GPA: 3.3,
      Stu_Major: 'Business',
      Stu_Courses: 'Finance,Accounting,Business Strategy,Excel,PowerPoint,Project Management',
      Stu_GradYr: 2025, Stu_Email: 'jokafor@uga.edu',
      Stu_JobExp: 'Business Analyst Intern at Alpha Ventures (Summer 2023). Campus Entrepreneur — founded a campus tutoring service.',
      Uni_id: uga.lastInsertRowid,
    });

    // 6. Aisha Thompson – Design @ Emory University
    insertStudent.run({
      Stu_Name: 'Aisha Thompson', Stu_Age: 20, Stu_GPA: 3.8,
      Stu_Major: 'Design',
      Stu_Courses: 'Figma,Illustrator,Photoshop,UX Research,Prototyping,Typography',
      Stu_GradYr: 2026, Stu_Email: 'athompson@emory.edu',
      Stu_JobExp: 'UI/UX Design Intern at PixelCraft Studio (2024). Freelance graphic designer (2022-Present).',
      Uni_id: emory.lastInsertRowid,
    });

    // 7. Liam Chen – Computer Science @ Emory University
    insertStudent.run({
      Stu_Name: 'Liam Chen', Stu_Age: 22, Stu_GPA: 3.2,
      Stu_Major: 'Computer Science',
      Stu_Courses: 'JavaScript,TypeScript,React,Node.js,PostgreSQL,AWS',
      Stu_GradYr: 2025, Stu_Email: 'lchen@emory.edu',
      Stu_JobExp: 'Full Stack Intern at Startup ATL (Summer 2024).',
      Uni_id: emory.lastInsertRowid,
    });

    // 8. Destiny Brown – Data Science @ Georgia Southern
    insertStudent.run({
      Stu_Name: 'Destiny Brown', Stu_Age: 21, Stu_GPA: 3.4,
      Stu_Major: 'Data Science',
      Stu_Courses: 'Python,Pandas,Matplotlib,SQL,Machine Learning,Jupyter',
      Stu_GradYr: 2026, Stu_Email: 'dbrown@georgiasouthern.edu',
      Stu_JobExp: 'Research Assistant at GSU Data Lab (2023-2024).',
      Uni_id: gsu.lastInsertRowid,
    });

    // 9. Ryan Nguyen – Business @ Georgia Tech
    insertStudent.run({
      Stu_Name: 'Ryan Nguyen', Stu_Age: 24, Stu_GPA: 3.1,
      Stu_Major: 'Business',
      Stu_Courses: 'Economics,Marketing Strategy,Sales,CRM Tools,Leadership',
      Stu_GradYr: 2025, Stu_Email: 'rnguyen@gatech.edu',
      Stu_JobExp: 'Sales Intern at TechNova Inc. (Summer 2023). Operations Lead at GT startup incubator (2024).',
      Uni_id: gt.lastInsertRowid,
    });

    // 10. Hannah Kim – Marketing @ Emory University
    insertStudent.run({
      Stu_Name: 'Hannah Kim', Stu_Age: 20, Stu_GPA: 3.7,
      Stu_Major: 'Marketing',
      Stu_Courses: 'Brand Management,Consumer Behavior,Public Relations,Copywriting,HubSpot',
      Stu_GradYr: 2026, Stu_Email: 'hkim@emory.edu',
      Stu_JobExp: 'Marketing Coordinator at Emory Health (Part-time, 2024).',
      Uni_id: emory.lastInsertRowid,
    });

    // Applications
    const insertApp = db.prepare(`
      INSERT INTO Application (Stu_id, Cmp_id, App_Status) VALUES (?, ?, ?)
    `);

    const technovaId = Number(technova.lastInsertRowid);
    const brightwaveId = Number(brightwave.lastInsertRowid);
    const dslId = Number(dsl.lastInsertRowid);
    const pixelcraftId = Number(pixelcraft.lastInsertRowid);
    const alphaventuresId = Number(alphaventures.lastInsertRowid);

    // Stu_id 1 = George, 2 = Priya, 3 = Marcus, 4 = Sofia, 5 = James,
    // 6 = Aisha, 7 = Liam, 8 = Destiny, 9 = Ryan, 10 = Hannah
    insertApp.run(1, technovaId, 'reviewing');
    insertApp.run(1, dslId, 'applied');
    insertApp.run(2, dslId, 'accepted');
    insertApp.run(2, technovaId, 'applied');
    insertApp.run(3, technovaId, 'accepted');
    insertApp.run(3, alphaventuresId, 'rejected');
    insertApp.run(4, brightwaveId, 'reviewing');
    insertApp.run(4, pixelcraftId, 'applied');
    insertApp.run(5, alphaventuresId, 'reviewing');
    insertApp.run(5, brightwaveId, 'applied');
    insertApp.run(6, pixelcraftId, 'accepted');
    insertApp.run(7, technovaId, 'applied');
    insertApp.run(7, dslId, 'rejected');
    insertApp.run(8, dslId, 'reviewing');
    insertApp.run(9, alphaventuresId, 'applied');
    insertApp.run(10, brightwaveId, 'accepted');
  })();

  return { message: 'Database seeded successfully', skipped: false };
}
