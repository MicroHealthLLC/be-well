/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder($owner: String) {
    onCreateReminder(owner: $owner) {
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
        goalEnd
        completedCount
        checklist {
          title
          isComplete
        }
        nextToken
      }
      level
      frequency
      contentType
      time
      activity
      isComplete
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder($owner: String) {
    onUpdateReminder(owner: $owner) {
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
        goalEnd
        completedCount
        checklist {
          title
          isComplete
        }
        nextToken
      }
      level
      frequency
      contentType
      time
      activity
      isComplete
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteReminder = /* GraphQL */ `
  subscription OnDeleteReminder($owner: String) {
    onDeleteReminder(owner: $owner) {
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
        goalEnd
        completedCount
        checklist {
          title
          isComplete
        }
        nextToken
      }
      level
      frequency
      contentType
      time
      activity
      isComplete
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal($owner: String) {
    onCreateGoal(owner: $owner) {
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
          activity
          isComplete
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
      goalEnd
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
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal($owner: String) {
    onUpdateGoal(owner: $owner) {
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
          activity
          isComplete
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
      goalEnd
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
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal($owner: String) {
    onDeleteGoal(owner: $owner) {
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
          activity
          isComplete
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
      goalEnd
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
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle {
    onCreateArticle {
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
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle {
    onUpdateArticle {
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
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle {
    onDeleteArticle {
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
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo {
    onCreateVideo {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo {
    onUpdateVideo {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo {
    onDeleteVideo {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWatchedVideo = /* GraphQL */ `
  subscription OnCreateWatchedVideo($owner: String) {
    onCreateWatchedVideo(owner: $owner) {
      id
      title
      videoId
      category
      level
      nextVideo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateWatchedVideo = /* GraphQL */ `
  subscription OnUpdateWatchedVideo($owner: String) {
    onUpdateWatchedVideo(owner: $owner) {
      id
      title
      videoId
      category
      level
      nextVideo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteWatchedVideo = /* GraphQL */ `
  subscription OnDeleteWatchedVideo($owner: String) {
    onDeleteWatchedVideo(owner: $owner) {
      id
      title
      videoId
      category
      level
      nextVideo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFavoriteArticle = /* GraphQL */ `
  subscription OnCreateFavoriteArticle($owner: String) {
    onCreateFavoriteArticle(owner: $owner) {
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
export const onUpdateFavoriteArticle = /* GraphQL */ `
  subscription OnUpdateFavoriteArticle($owner: String) {
    onUpdateFavoriteArticle(owner: $owner) {
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
export const onDeleteFavoriteArticle = /* GraphQL */ `
  subscription OnDeleteFavoriteArticle($owner: String) {
    onDeleteFavoriteArticle(owner: $owner) {
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
export const onCreateFavoriteVideo = /* GraphQL */ `
  subscription OnCreateFavoriteVideo($owner: String) {
    onCreateFavoriteVideo(owner: $owner) {
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
export const onUpdateFavoriteVideo = /* GraphQL */ `
  subscription OnUpdateFavoriteVideo($owner: String) {
    onUpdateFavoriteVideo(owner: $owner) {
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
export const onDeleteFavoriteVideo = /* GraphQL */ `
  subscription OnDeleteFavoriteVideo($owner: String) {
    onDeleteFavoriteVideo(owner: $owner) {
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
export const onCreatePreferences = /* GraphQL */ `
  subscription OnCreatePreferences($owner: String) {
    onCreatePreferences(owner: $owner) {
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
export const onUpdatePreferences = /* GraphQL */ `
  subscription OnUpdatePreferences($owner: String) {
    onUpdatePreferences(owner: $owner) {
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
export const onDeletePreferences = /* GraphQL */ `
  subscription OnDeletePreferences($owner: String) {
    onDeletePreferences(owner: $owner) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateCompetition = /* GraphQL */ `
  subscription OnCreateCompetition {
    onCreateCompetition {
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
export const onUpdateCompetition = /* GraphQL */ `
  subscription OnUpdateCompetition {
    onUpdateCompetition {
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
export const onDeleteCompetition = /* GraphQL */ `
  subscription OnDeleteCompetition {
    onDeleteCompetition {
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
export const onCreateCompetitor = /* GraphQL */ `
  subscription OnCreateCompetitor {
    onCreateCompetitor {
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
export const onUpdateCompetitor = /* GraphQL */ `
  subscription OnUpdateCompetitor {
    onUpdateCompetitor {
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
export const onDeleteCompetitor = /* GraphQL */ `
  subscription OnDeleteCompetitor {
    onDeleteCompetitor {
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
export const onCreateCompetitionSubmission = /* GraphQL */ `
  subscription OnCreateCompetitionSubmission {
    onCreateCompetitionSubmission {
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
export const onUpdateCompetitionSubmission = /* GraphQL */ `
  subscription OnUpdateCompetitionSubmission {
    onUpdateCompetitionSubmission {
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
export const onDeleteCompetitionSubmission = /* GraphQL */ `
  subscription OnDeleteCompetitionSubmission {
    onDeleteCompetitionSubmission {
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
export const onCreateGoalReminders = /* GraphQL */ `
  subscription OnCreateGoalReminders($owner: String) {
    onCreateGoalReminders(owner: $owner) {
      id
      reminderID
      goalID
      reminder {
        id
        category
        goals {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateGoalReminders = /* GraphQL */ `
  subscription OnUpdateGoalReminders($owner: String) {
    onUpdateGoalReminders(owner: $owner) {
      id
      reminderID
      goalID
      reminder {
        id
        category
        goals {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteGoalReminders = /* GraphQL */ `
  subscription OnDeleteGoalReminders($owner: String) {
    onDeleteGoalReminders(owner: $owner) {
      id
      reminderID
      goalID
      reminder {
        id
        category
        goals {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
