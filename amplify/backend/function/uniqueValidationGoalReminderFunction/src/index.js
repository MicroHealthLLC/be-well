/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const AWS = require("aws-sdk");
 const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
 exports.handler = async (event) => {
 
     console.log("Processing event: %j", JSON.stringify(event));
     const GoalReminderObjectTableName = "GoalReminders-vumo7bou3fbg3fulexi2s26k7i-sandboxtwo";
     const IndexName = 'byGoal'
     let goalIDs = []
     let reminderID = '';
     if (event.queryStringParameters && event.queryStringParameters.goalReminder) {
         console.log("Received name: " + event.queryStringParameters.goalReminder);
         goalIDs = event.queryStringParameters.goalReminder.goalIDs;
         reminderID = event.queryStringParameters.goalReminder.reminderID;
     }else{
       goalIDs = event.goalReminder.goalIDs
       reminderID = event.goalReminder.reminderID;
     }
 
     console.log("event params: ", goalIDs, reminderID);
 
     // Not working
     // var queryParams = {
     //   TableName: GoalReminderObjectTableName,
     //   IndexName: IndexName,
     //   KeyConditionExpression: '#goalID = :vGoalID and #reminderID = :vReminderID',
     //   ExpressionAttributeValues: { ':vGoalID': goalID, ":vReminderID": reminderID },
     //   ExpressionAttributeNames: { '#goalID': 'goalID', "#reminderID": 'reminderID' }
     // };
     
     // Not working
     // var queryParams = {
     //   TableName: GoalReminderObjectTableName,
     //   KeyConditionExpression: 'goalID = :vGoalID and reminderID = :vReminderID',
     //   ExpressionAttributeValues: { ':vGoalID': {"S": goalID}, ":vReminderID": {"S": reminderID} }
     // };
     let goalReminders = []
     goalIDs.forEach(async(gid) => {
       
       var queryParams = {
         TableName: GoalReminderObjectTableName,
         IndexName: IndexName,
         KeyConditionExpression: 'goalID = :vGoalID',
         ExpressionAttributeValues: { ':vGoalID': gid,':vReminderID': reminderID },
         FilterExpression: "reminderID = :vReminderID"
       };
       const res = await dynamo.query(queryParams).promise();
       if (res.Items.length == 0) {
         goalReminders.push({goalID: gid, reminderID: reminderID});
       }
     });
     
     
     // const res = await dynamo.query(queryParams).promise();
     if (goalReminders.length > 0) {
       return {statusCode: 200, message: "Success", goalReminders: goalReminders}
     }else{
       return {statusCode: 400, message: "Already associated with same goal!", goalReminders: []}
     }
 
 };
 