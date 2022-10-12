export const extendedListGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        category
        reminders {
          items {
            goalReminderId: id
            reminder {
              id
              category
              level
              activity
              frequency
              contentType
              time
              createdAt
              updatedAt
              owner
            }
          }
          nextToken
        }
        progress
        stepCount
        dueDate
        isComplete
        completedCount
        checklist {
          title
          isComplete
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const extendedListReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        goals {
          items {
            goalReminderId: id
            goal {
              id
              title
              category
              progress
              stepCount
              dueDate
              isComplete
              completedCount
              checklist {
                title
                isComplete
              }
              createdAt
              updatedAt
              owner
            }
          }
          nextToken
        }
        level
        frequency
        contentType
        time
        activity
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;