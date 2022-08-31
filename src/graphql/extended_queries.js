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