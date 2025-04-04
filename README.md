# CodeBrew.edu

## Ideation

Education, to me, is a powerful tool to impart practical skills, ignite curiosity, and shape how someone sees and interacts with the world. Feedback plays a crucial role in that process. It helps students know where they stand and gives teachers insights into how they can better connect with each learner. It is a tool to foster connection, documentation and accountability for both the student and the tutor.

This project was inspired by my experience working at a tuition center, where after every session, we had to manually input reviews and feedback for each student. While the intent was great—helping teachers reflect on their lessons and students grow from consistent feedback. I was inspired by the structure, the sense of accountability, and how feedback was integrated into the learning journey. That experience helped form the vision for this platform—a space where feedback is not just a task, but a meaningful part of the learning loop.

Coupled with my experience attending a coding bootcamp, the idea for the theme of a coding tuition center came about.

The user of the app is currently restricted to the tutors.

## Description

Frontend:
- Review stats about the number of students one has written entries for, number of entries written.
- See the number of entries written for each student.
- Create, update, delete entries written.
- Filter the entries written by name(s) of the student.
- Deletion of entry confirmation upon clicking the Delete button.
- Send an email of the feedback to a specific email the user can enter.

Backend:
- Accepts a student review (title + text) and recipient email.
- Sends an email to the recipient with the provided feedback content.

## Github Repo Deliverables

- Front-end GitHub repo link : https://github.com/cangelic001/project-4-fe
- Back-end GitHub repo link : https://github.com/cangelic001/project-4-be

## Deployed App Link Deliverable

- Deployed front-end project link : https://project-4-fe-xi.vercel.app/
- Deployed back-end project link : https://project-4-be-7xce.onrender.com 

## Attributions

- Mailersend - email sending provider to send review emails
- React Bootstrap - components library

## Technologies Used

- Express.js  
- MongoDB + Mongoose  
- Mailersend API  
- dotenv  
- Postman  
- Morgan  
- CORS  

## Challenges Encountered

Backend Issues:
- Third-Party Email Service Confusion: Explored multiple services (Nodemailer, Resend, SendGrid) and faced roadblocks like domain verification. Finally chose Mailsender as I do not need my own domain to send neither do I need to verify it (I can use their test domain) and I can send it to a Gmail account (which is not allowed for other services as Gmail is a free domain). 

## Reflections

Frontend
- Ensuring consistent UI and UX across pages buttons was trickier than expected
- Proper alignment of 

Backend
- Working with external APIs: Learned to troubleshoot and debug real-world third-party service errors, and adapt quickly by switching providers.
- Safe JSON Parsing: Improved handling of external API responses with proper JSON parsing fallbacks using response.text() and conditionally calling JSON.parse().

### Stretch Goals
- Features: 
  - Rating system with multiple criteria (punctuality, preparedness for lesson, grasp of course material). 
  - Add parents access to the platform as another possible user type so they can access their child's data on top of getting the email for review.
  - Analytics tool for the teacher to review the student's progress over time. Student testimonials section.
  - Scheduling tool for teacher.
- Email related: Style the email, confirmation and logging about email delivery status to the users.
- Use different component library.

### References
- Mailersend Developer Docs
- Stack Overflow
- OpenAI's ChatGPT

