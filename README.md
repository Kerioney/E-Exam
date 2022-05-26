# E-Exam 
E-Exam is a System for students to get their exams online. The admin is responsible for adding and editing (subjects, professors and Students) and making approval for the professors. Professors prepare for their subjects' exams by adding and editing questions and identifying the correct answer. Students take the exam and the results are stored to be shown to the student and professor.

# Types of Users
1. Admin: is a professor with Administrating Authentications.
2. Professor: is responsible for The Structure of the Exam and its content.
3. Student: takes the Exam and is then directly notified with his result.

# Admin
1. Adding and Editing the Student and professors' Data.
2. Adding and Editing the Subjects of each level and department.
3. View The List of Professors, and Approve the Signup Requests.
4. Specifies the subjects for each professor.
5. All Privileges of the Professor.

# Professor
1. Organize the structure of the exam.
2. Show The Results of the Students for their Subjects.

# Considerations
1. The Authentication of each page, ex… students cannot add questions, users cannot get into login or Sign up pages.
2. Data Validation for every input in the System, prevent SQL Injection and Consider Basic Security Concepts.
3. The Professor can add or edit questions for only his Subjects.
4. The student can see only the exams at his level
5. The Student can see only his Result.
