## Description
please follow the diagram.drawio.html as the flow for users to do actions and update their scores.

## Scenario:
1. User will register with his basic information.
2. After registing successfully, user will login to our system.
3. User does any action.
4. User submits his action completion.
5. Our system will score the user and update to database.
*Note: Our system will send notifications in realtime to every new user that in top 10 scores and every user has been removed from top 10 scores.

## Services required:
- Need to have a cloud service to authenticate and authorise every user.
- Need to have a clould notification service to send notification to users whenever top 10 scores has changed.

## Architechture
- Backend: NestJs (please refer to the scoreboard-api as example).
- DB: Amazon RDS (postgreSql).
- Services: AWS Cognito (authenticate and authorise), AWS Notification Service (for sending notifications).

## Can take the scoreboard-api as the initial project and start implementing on that.
