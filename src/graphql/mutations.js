/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReminder = /* GraphQL */ `
  mutation CreateReminder(
    $input: CreateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    createReminder(input: $input, condition: $condition) {
      id
      category
      goal {
        id
        title
        category
        reminders {
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
      goalId
      level
      frequency
      contentType
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateReminder = /* GraphQL */ `
  mutation UpdateReminder(
    $input: UpdateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    updateReminder(input: $input, condition: $condition) {
      id
      category
      goal {
        id
        title
        category
        reminders {
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
      goalId
      level
      frequency
      contentType
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteReminder = /* GraphQL */ `
  mutation DeleteReminder(
    $input: DeleteReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    deleteReminder(input: $input, condition: $condition) {
      id
      category
      goal {
        id
        title
        category
        reminders {
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
      goalId
      level
      frequency
      contentType
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
      id
      title
      category
      reminders {
        items {
          id
          category
          goalId
          level
          frequency
          contentType
          time
          createdAt
          updatedAt
          owner
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
  }
`;
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
      id
      title
      category
      reminders {
        items {
          id
          category
          goalId
          level
          frequency
          contentType
          time
          createdAt
          updatedAt
          owner
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
  }
`;
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
      id
      title
      category
      reminders {
        items {
          id
          category
          goalId
          level
          frequency
          contentType
          time
          createdAt
          updatedAt
          owner
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
  }
`;
export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
      id
      author
      lastEditedBy
      title
      body
      category
      level
      createdAt
      image
      imageCredit
      updatedAt
    }
  }
`;
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
      id
      author
      lastEditedBy
      title
      body
      category
      level
      createdAt
      image
      imageCredit
      updatedAt
    }
  }
`;
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
      id
      author
      lastEditedBy
      title
      body
      category
      level
      createdAt
      image
      imageCredit
      updatedAt
    }
  }
`;
export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const createFavoriteArticle = /* GraphQL */ `
  mutation CreateFavoriteArticle(
    $input: CreateFavoriteArticleInput!
    $condition: ModelFavoriteArticleConditionInput
  ) {
    createFavoriteArticle(input: $input, condition: $condition) {
      id
      articleId
      category
      level
      article {
        id
        author
        lastEditedBy
        title
        body
        category
        level
        createdAt
        image
        imageCredit
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFavoriteArticle = /* GraphQL */ `
  mutation UpdateFavoriteArticle(
    $input: UpdateFavoriteArticleInput!
    $condition: ModelFavoriteArticleConditionInput
  ) {
    updateFavoriteArticle(input: $input, condition: $condition) {
      id
      articleId
      category
      level
      article {
        id
        author
        lastEditedBy
        title
        body
        category
        level
        createdAt
        image
        imageCredit
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFavoriteArticle = /* GraphQL */ `
  mutation DeleteFavoriteArticle(
    $input: DeleteFavoriteArticleInput!
    $condition: ModelFavoriteArticleConditionInput
  ) {
    deleteFavoriteArticle(input: $input, condition: $condition) {
      id
      articleId
      category
      level
      article {
        id
        author
        lastEditedBy
        title
        body
        category
        level
        createdAt
        image
        imageCredit
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFavoriteVideo = /* GraphQL */ `
  mutation CreateFavoriteVideo(
    $input: CreateFavoriteVideoInput!
    $condition: ModelFavoriteVideoConditionInput
  ) {
    createFavoriteVideo(input: $input, condition: $condition) {
      id
      videoId
      category
      level
      video {
        id
        resourceId
        level
        category
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFavoriteVideo = /* GraphQL */ `
  mutation UpdateFavoriteVideo(
    $input: UpdateFavoriteVideoInput!
    $condition: ModelFavoriteVideoConditionInput
  ) {
    updateFavoriteVideo(input: $input, condition: $condition) {
      id
      videoId
      category
      level
      video {
        id
        resourceId
        level
        category
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFavoriteVideo = /* GraphQL */ `
  mutation DeleteFavoriteVideo(
    $input: DeleteFavoriteVideoInput!
    $condition: ModelFavoriteVideoConditionInput
  ) {
    deleteFavoriteVideo(input: $input, condition: $condition) {
      id
      videoId
      category
      level
      video {
        id
        resourceId
        level
        category
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPreferences = /* GraphQL */ `
  mutation CreatePreferences(
    $input: CreatePreferencesInput!
    $condition: ModelPreferencesConditionInput
  ) {
    createPreferences(input: $input, condition: $condition) {
      id
      preference_items {
        category
        l1
        l2
        l3
        l4
        l5
        not_interested
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePreferences = /* GraphQL */ `
  mutation UpdatePreferences(
    $input: UpdatePreferencesInput!
    $condition: ModelPreferencesConditionInput
  ) {
    updatePreferences(input: $input, condition: $condition) {
      id
      preference_items {
        category
        l1
        l2
        l3
        l4
        l5
        not_interested
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePreferences = /* GraphQL */ `
  mutation DeletePreferences(
    $input: DeletePreferencesInput!
    $condition: ModelPreferencesConditionInput
  ) {
    deletePreferences(input: $input, condition: $condition) {
      id
      preference_items {
        category
        l1
        l2
        l3
        l4
        l5
        not_interested
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      type
      date
      startTime
      endTime
      timeZone
      participants {
        id
        firstName
        lastName
        email
      }
      link
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      type
      date
      startTime
      endTime
      timeZone
      participants {
        id
        firstName
        lastName
        email
      }
      link
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      type
      date
      startTime
      endTime
      timeZone
      participants {
        id
        firstName
        lastName
        email
      }
      link
      image
      createdAt
      updatedAt
    }
  }
`;
export const createCompetition = /* GraphQL */ `
  mutation CreateCompetition(
    $input: CreateCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    createCompetition(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          score
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      submissions {
        items {
          id
          competitionId
          competitorId
          userId
          s3Key
          description
          submittedBy
          createdAt
          isApproved
          type
          updatedAt
          owner
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCompetition = /* GraphQL */ `
  mutation UpdateCompetition(
    $input: UpdateCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    updateCompetition(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          score
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      submissions {
        items {
          id
          competitionId
          competitorId
          userId
          s3Key
          description
          submittedBy
          createdAt
          isApproved
          type
          updatedAt
          owner
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompetition = /* GraphQL */ `
  mutation DeleteCompetition(
    $input: DeleteCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    deleteCompetition(input: $input, condition: $condition) {
      id
      hostName
      hostEmail
      title
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          score
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      submissions {
        items {
          id
          competitionId
          competitorId
          userId
          s3Key
          description
          submittedBy
          createdAt
          isApproved
          type
          updatedAt
          owner
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const createCompetitor = /* GraphQL */ `
  mutation CreateCompetitor(
    $input: CreateCompetitorInput!
    $condition: ModelCompetitorConditionInput
  ) {
    createCompetitor(input: $input, condition: $condition) {
      id
      competitionId
      userId
      firstName
      lastName
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCompetitor = /* GraphQL */ `
  mutation UpdateCompetitor(
    $input: UpdateCompetitorInput!
    $condition: ModelCompetitorConditionInput
  ) {
    updateCompetitor(input: $input, condition: $condition) {
      id
      competitionId
      userId
      firstName
      lastName
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCompetitor = /* GraphQL */ `
  mutation DeleteCompetitor(
    $input: DeleteCompetitorInput!
    $condition: ModelCompetitorConditionInput
  ) {
    deleteCompetitor(input: $input, condition: $condition) {
      id
      competitionId
      userId
      firstName
      lastName
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCompetitionSubmission = /* GraphQL */ `
  mutation CreateCompetitionSubmission(
    $input: CreateCompetitionSubmissionInput!
    $condition: ModelCompetitionSubmissionConditionInput
  ) {
    createCompetitionSubmission(input: $input, condition: $condition) {
      id
      competitionId
      competitorId
      userId
      s3Key
      description
      submittedBy
      createdAt
      isApproved
      type
      updatedAt
      owner
    }
  }
`;
export const updateCompetitionSubmission = /* GraphQL */ `
  mutation UpdateCompetitionSubmission(
    $input: UpdateCompetitionSubmissionInput!
    $condition: ModelCompetitionSubmissionConditionInput
  ) {
    updateCompetitionSubmission(input: $input, condition: $condition) {
      id
      competitionId
      competitorId
      userId
      s3Key
      description
      submittedBy
      createdAt
      isApproved
      type
      updatedAt
      owner
    }
  }
`;
export const deleteCompetitionSubmission = /* GraphQL */ `
  mutation DeleteCompetitionSubmission(
    $input: DeleteCompetitionSubmissionInput!
    $condition: ModelCompetitionSubmissionConditionInput
  ) {
    deleteCompetitionSubmission(input: $input, condition: $condition) {
      id
      competitionId
      competitorId
      userId
      s3Key
      description
      submittedBy
      createdAt
      isApproved
      type
      updatedAt
      owner
    }
  }
`;
