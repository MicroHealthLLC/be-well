/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onCreateReminder(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
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
  }
`;
export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onUpdateReminder(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
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
  }
`;
export const onDeleteReminder = /* GraphQL */ `
  subscription OnDeleteReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onDeleteReminder(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
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
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onCreatePhoto(filter: $filter, owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onUpdatePhoto(filter: $filter, owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onDeletePhoto(filter: $filter, owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onCreateGoal(filter: $filter, owner: $owner) {
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
  subscription OnUpdateGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onUpdateGoal(filter: $filter, owner: $owner) {
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
  subscription OnDeleteGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onDeleteGoal(filter: $filter, owner: $owner) {
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
  subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onCreateArticle(filter: $filter) {
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
  subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onUpdateArticle(filter: $filter) {
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
  subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
    onDeleteArticle(filter: $filter) {
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
  subscription OnCreateVideo($filter: ModelSubscriptionVideoFilterInput) {
    onCreateVideo(filter: $filter) {
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
  subscription OnUpdateVideo($filter: ModelSubscriptionVideoFilterInput) {
    onUpdateVideo(filter: $filter) {
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
  subscription OnDeleteVideo($filter: ModelSubscriptionVideoFilterInput) {
    onDeleteVideo(filter: $filter) {
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
  subscription OnCreateWatchedVideo(
    $filter: ModelSubscriptionWatchedVideoFilterInput
    $owner: String
  ) {
    onCreateWatchedVideo(filter: $filter, owner: $owner) {
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
  subscription OnUpdateWatchedVideo(
    $filter: ModelSubscriptionWatchedVideoFilterInput
    $owner: String
  ) {
    onUpdateWatchedVideo(filter: $filter, owner: $owner) {
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
  subscription OnDeleteWatchedVideo(
    $filter: ModelSubscriptionWatchedVideoFilterInput
    $owner: String
  ) {
    onDeleteWatchedVideo(filter: $filter, owner: $owner) {
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
  subscription OnCreateFavoriteArticle(
    $filter: ModelSubscriptionFavoriteArticleFilterInput
    $owner: String
  ) {
    onCreateFavoriteArticle(filter: $filter, owner: $owner) {
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
  subscription OnUpdateFavoriteArticle(
    $filter: ModelSubscriptionFavoriteArticleFilterInput
    $owner: String
  ) {
    onUpdateFavoriteArticle(filter: $filter, owner: $owner) {
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
  subscription OnDeleteFavoriteArticle(
    $filter: ModelSubscriptionFavoriteArticleFilterInput
    $owner: String
  ) {
    onDeleteFavoriteArticle(filter: $filter, owner: $owner) {
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
  subscription OnCreateFavoriteVideo(
    $filter: ModelSubscriptionFavoriteVideoFilterInput
    $owner: String
  ) {
    onCreateFavoriteVideo(filter: $filter, owner: $owner) {
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
  subscription OnUpdateFavoriteVideo(
    $filter: ModelSubscriptionFavoriteVideoFilterInput
    $owner: String
  ) {
    onUpdateFavoriteVideo(filter: $filter, owner: $owner) {
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
  subscription OnDeleteFavoriteVideo(
    $filter: ModelSubscriptionFavoriteVideoFilterInput
    $owner: String
  ) {
    onDeleteFavoriteVideo(filter: $filter, owner: $owner) {
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
  subscription OnCreatePreferences(
    $filter: ModelSubscriptionPreferencesFilterInput
    $owner: String
  ) {
    onCreatePreferences(filter: $filter, owner: $owner) {
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
  subscription OnUpdatePreferences(
    $filter: ModelSubscriptionPreferencesFilterInput
    $owner: String
  ) {
    onUpdatePreferences(filter: $filter, owner: $owner) {
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
  subscription OnDeletePreferences(
    $filter: ModelSubscriptionPreferencesFilterInput
    $owner: String
  ) {
    onDeletePreferences(filter: $filter, owner: $owner) {
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
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateCompetitor = /* GraphQL */ `
  subscription OnCreateCompetitor(
    $filter: ModelSubscriptionCompetitorFilterInput
  ) {
    onCreateCompetitor(filter: $filter) {
      id
      competitionId
      userId
      firstName
      lastName
      groupParticipation
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCompetitor = /* GraphQL */ `
  subscription OnUpdateCompetitor(
    $filter: ModelSubscriptionCompetitorFilterInput
  ) {
    onUpdateCompetitor(filter: $filter) {
      id
      competitionId
      userId
      firstName
      lastName
      groupParticipation
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCompetitor = /* GraphQL */ `
  subscription OnDeleteCompetitor(
    $filter: ModelSubscriptionCompetitorFilterInput
  ) {
    onDeleteCompetitor(filter: $filter) {
      id
      competitionId
      userId
      firstName
      lastName
      groupParticipation
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCompetitionSubmission = /* GraphQL */ `
  subscription OnCreateCompetitionSubmission(
    $filter: ModelSubscriptionCompetitionSubmissionFilterInput
  ) {
    onCreateCompetitionSubmission(filter: $filter) {
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
      url
      manualScoring
      scoringVal
      mAmount
      updatedAt
      owner
    }
  }
`;
export const onUpdateCompetitionSubmission = /* GraphQL */ `
  subscription OnUpdateCompetitionSubmission(
    $filter: ModelSubscriptionCompetitionSubmissionFilterInput
  ) {
    onUpdateCompetitionSubmission(filter: $filter) {
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
      url
      manualScoring
      scoringVal
      mAmount
      updatedAt
      owner
    }
  }
`;
export const onDeleteCompetitionSubmission = /* GraphQL */ `
  subscription OnDeleteCompetitionSubmission(
    $filter: ModelSubscriptionCompetitionSubmissionFilterInput
  ) {
    onDeleteCompetitionSubmission(filter: $filter) {
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
      url
      manualScoring
      scoringVal
      mAmount
      updatedAt
      owner
    }
  }
`;
export const onCreateCompetition = /* GraphQL */ `
  subscription OnCreateCompetition(
    $filter: ModelSubscriptionCompetitionFilterInput
  ) {
    onCreateCompetition(filter: $filter) {
      id
      hostName
      hostEmail
      title
      campaignType
      isPrivate
      groupParticipation
      manualScoring
      unit
      scoringVal
      category
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      deadline
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          groupParticipation
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
          url
          manualScoring
          scoringVal
          mAmount
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
  subscription OnUpdateCompetition(
    $filter: ModelSubscriptionCompetitionFilterInput
  ) {
    onUpdateCompetition(filter: $filter) {
      id
      hostName
      hostEmail
      title
      campaignType
      isPrivate
      groupParticipation
      manualScoring
      unit
      scoringVal
      category
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      deadline
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          groupParticipation
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
          url
          manualScoring
          scoringVal
          mAmount
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
  subscription OnDeleteCompetition(
    $filter: ModelSubscriptionCompetitionFilterInput
  ) {
    onDeleteCompetition(filter: $filter) {
      id
      hostName
      hostEmail
      title
      campaignType
      isPrivate
      groupParticipation
      manualScoring
      unit
      scoringVal
      category
      description
      rules
      startDate
      endDate
      startTime
      endTime
      timeZone
      deadline
      competitors {
        items {
          id
          competitionId
          userId
          firstName
          lastName
          groupParticipation
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
          url
          manualScoring
          scoringVal
          mAmount
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
