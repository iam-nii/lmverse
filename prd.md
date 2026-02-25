

















LMVerse – Product Requirements Document (PRD)
 
1. Product Overview
1.1 Product Name
LMVerse 
1.2 Product Description
LMVerse is a subscription-based online Language Management System designed primarily for Russian-speaking learners studying English, as well as international learners studying other languages (future expansion: French, Spanish). The platform provides structured level-based courses, tutor-led sessions, analytics tracking, subscription management, and an intelligent scheduling system.
1.3 Purpose
To deliver structured, scalable, and analytics-driven language education with flexible lesson formats (individual and group) and integrated tutor management.
1.4 Target Audience
•	Russian-speaking learners
•	International learners
•	Professional tutors
2. User Roles & Permissions
LMVerse operates under a Role-Based Access Control (RBAC) model with three primary roles:
•	Admin
•	Student (User)
•	Tutor
2.1 Admin
Description
Platform manager responsible for operational, academic, financial, and analytical oversight.
Core Responsibilities
•	Manage users (students & tutors)
•	Manage courses and levels
•	Configure lesson formats
•	Manage subscriptions & pricing
•	Monitor analytics & performance
•	Track tutor productivity
•	Financial monitoring
Admin Dashboard Must Display
•	Total active students
•	Total active tutors
•	Active subscriptions
•	Expiring subscriptions
•	Revenue analytics
•	Course enrollment statistics
•	Course completion rates
•	Drop-off rates
•	Tutor performance ranking:
o	Sessions conducted
o	Student ratings
o	Retention rate
Admin Capabilities
•	Create/edit/delete courses
•	Enable/disable levels per course
•	Configure lesson types per course-level
•	Assign tutors to course-level combinations
•	Set pricing per:
o	Course
o	Level
o	Lesson type
•	Approve/suspend tutors
•	Suspend students
•	Send global notifications
•	Export reports (CSV/PDF)
•	View system logs
2.2 Student (User)
Description
A learner enrolled in one or more courses via subscription.
2.2.1 Authentication
•	Sign up
•	Login
•	Email verification
•	Password reset
2.2.2 Student Dashboard
•	Enrolled courses
•	Current level
•	Progress analytics
•	Upcoming lessons
•	Subscription status
•	Notifications
2.2.3 Course Access
Academic Structure
Language
→ Course Type
→ Level
→ Lesson Format
→ Modules
→ Lessons
→ Assessments
________________________________________
2.2.4 Student Analytics
Students must be able to view:
•	Course completion %
•	Module progress
•	Quiz performance
•	Time spent learning
•	Skill breakdown:
o	Speaking
o	Listening
o	Reading
o	Writing
•	Assessment trends
•	Learning velocity
2.2.5 Smart Calendar
Students can:
•	View tutor availability
•	Book sessions
•	Reschedule sessions
•	Cancel bookings
•	Receive reminders
•	View session history
2.3 Tutor
Description
Certified instructor conducting lessons and evaluating student performance.
2.3.1 Tutor Dashboard
•	Monthly calendar view
•	Upcoming sessions
•	Assigned course-levels
•	Student list
•	Performance analytics
2.3.2 Tutor Capabilities
•	Input monthly availability
•	Block unavailable dates
•	Accept/reject bookings (configurable)
•	View student progress
•	Grade assignments
•	Provide feedback
•	Recommend level progression
 
3. Academic Structure Model
3.1 Course Types
LMVerse supports four primary course categories:
1.	General English Course
2.	Business English
3.	Technical English
4.	Exam Preparation Courses
________________________________________
3.1.1 Exam Preparation Subcategory
International Exams
•	IELTS
•	TOEFL
•	FCE
Russian National Exams
•	ЕГЭ
________________________________________
3.2 Proficiency Levels
LMVerse defines six standardized levels:
1.	Starter
2.	Elementary
3.	Intermediate
4.	Upper Intermediate
5.	Advanced
6.	Advanced C2
System internally maps these to CEFR equivalents (A1–C2).
________________________________________
3.3 Lesson Formats
Two instructional delivery formats:
1. Individual Lessons
•	1 student : 1 tutor
•	Personalized instruction
•	Premium pricing
2. Group Lessons
•	Minimum 10 students
•	Maximum capacity configurable
•	Fixed schedule
•	Lower per-user cost
________________________________________
4. Relationship Model (System Logic)
________________________________________
4.1 Course ↔ Level Relationship
Rule:
Every Course Type is available at every Level.
Example:
•	General English → Starter–C2
•	Business English → Starter–C2
•	Technical English → Starter–C2
•	Exam Prep → Starter–C2
Implementation:
Many-to-Many relationship (course_levels table)
________________________________________
4.2 Course-Level ↔ Lesson Type Relationship
Each course-level combination may support:
•	Individual Lessons
•	Group Lessons
Admin can configure availability per combination.
Implementation:
Many-to-Many (course_level_lesson_types table)
________________________________________
5. Booking & Capacity Logic
________________________________________
5.1 Individual Lessons
•	1 student per slot
•	Instant booking confirmation
•	No overbooking
________________________________________
5.2 Group Lessons
•	Minimum threshold: 10
•	Max capacity configurable
•	Booking allowed until full
•	If minimum not reached:
o	Auto-cancel
o	Reschedule
o	Convert to individual (admin rule)
________________________________________
6. Subscription System
________________________________________
6.1 Subscription Plans
•	Monthly
•	Quarterly
•	Annual
________________________________________
6.2 Subscription Features
Plans may vary by:
•	Course access
•	Level access
•	Lesson format access
•	Session limits
•	Premium analytics
________________________________________
6.3 Subscription Rules
System must:
•	Notify 7 days before expiration
•	Restrict access upon expiration
•	Allow renewal
•	Log payment history
Admin can:
•	View expiring subscriptions
•	Track churn rate
•	Configure pricing
________________________________________
7. Analytics & Reporting
________________________________________
7.1 Student Analytics
•	Completion rate
•	Skill breakdown
•	Weakness detection
•	Score trends
________________________________________
7.2 Tutor Analytics
•	Sessions per month
•	Student rating average
•	Retention rate
•	Performance ranking
________________________________________
7.3 Admin Analytics
•	Revenue trends
•	Active users
•	Subscription renewal rate
•	Course popularity
•	Drop-off rates
•	LTV & CAC (future financial modeling)
________________________________________
8. Non-Functional Requirements
________________________________________
8.1 Performance
•	Page load < 2 seconds
•	Booking operation < 1 second
•	Concurrent user support (10,000+ scalable)
________________________________________
8.2 Security
•	RBAC enforcement
•	Encrypted passwords (bcrypt)
•	HTTPS mandatory
•	Secure payment gateway
•	Data protection compliance
________________________________________
8.3 Scalability
•	Modular architecture
•	Cloud-ready deployment
•	Horizontal scaling capability
________________________________________
8.4 Reliability
•	99.5% uptime minimum
•	Automated backups
•	Monitoring & logging system
________________________________________
9. Core Database Entities (High-Level)
•	users
•	roles
•	students
•	tutors
•	courses
•	levels
•	course_levels
•	lesson_types
•	course_level_lesson_types
•	modules
•	lessons
•	bookings
•	subscriptions
•	payments
•	analytics_logs
________________________________________
10. Future Enhancements
•	AI-driven personalized learning paths
•	AI speaking evaluation
•	Gamification (badges, streaks, leaderboards)
•	Placement test before enrollment
•	In-app messaging
•	Mobile app (iOS / Android)
•	Calendar integrations
•	Automatic tutor assignment
________________________________________
11. Success Metrics (KPIs)
•	Monthly Active Users (MAU)
•	Course completion rate
•	Subscription renewal rate
•	Average tutor rating
•	Revenue growth
•	Student retention rate
________________________________________
Final System Concept
LMVerse is a structured, subscription-based language education ecosystem built around:
Course Types × Levels × Lesson Formats
with fully integrated:
•	Tutor scheduling
•	Analytics monitoring
•	Subscription logic
•	Administrative control
