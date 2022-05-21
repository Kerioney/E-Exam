# E-Exam 
E-Exam is a System for students to get their exams online.
The admin is responsible for adding and editing (subjects , professors and Students) and make an approval for the professors 
Professors prepare for their subjects' exams with adding and editing questions and identifying the correct answer.
Students take the exam and the results are stored to be shown for the student and professor.

# Types of Users
1. Admin: is basically a professor with Administrating Authentications.
2. Professor: is responsible for The Structure of the Exam and its content.
3. Student: takes the Exam and then directly notified with his own result.

#Admin
1. Adding and Editing the Students and professors Data.
2. Adding and Editing the Subjects of each level and department.
3. View The List of The Professors, and Approve the Sign up Requests.
4. Specifies the subjects for each professor.
5. All Privileges of the Professor.

#Professor
1. Organizing the structure of the exam.
2. Show The Results of the Students for his Subjects.

#Considerations
1. The Authentication of each page, ex… student cannot add questions, users cannot get into Log in or Sign up pages.
2. Data Validation for every input in the System, prevent SQL Injection and Consider Basic Security Concepts.
3. The Professor can add or edit questions for only his Subjects.
4. The student can see only the exams in his level
5. The Student can see only his Result.
