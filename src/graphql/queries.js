/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReminder = /* GraphQL */ `
  query GetReminder($id: ID!) {
    getReminder(id: $id) {
      id
      category
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
export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
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
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
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
`;
export const listGoals = /* GraphQL */ `
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
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
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
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      id
      resourceId
      level
      category
      createdAt
      updatedAt
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        resourceId
        level
        category
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavoriteArticle = /* GraphQL */ `
  query GetFavoriteArticle($id: ID!) {
    getFavoriteArticle(id: $id) {
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
export const listFavoriteArticles = /* GraphQL */ `
  query ListFavoriteArticles(
    $filter: ModelFavoriteArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteArticles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getFavoriteVideo = /* GraphQL */ `
  query GetFavoriteVideo($id: ID!) {
    getFavoriteVideo(id: $id) {
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
export const listFavoriteVideos = /* GraphQL */ `
  query ListFavoriteVideos(
    $filter: ModelFavoriteVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCompetition = /* GraphQL */ `
  query GetCompetition($id: ID!) {
    getCompetition(id: $id) {
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
export const listCompetitions = /* GraphQL */ `
  query ListCompetitions(
    $filter: ModelCompetitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompetitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
        }
        submissions {
          nextToken
        }
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCompetitor = /* GraphQL */ `
  query GetCompetitor($id: ID!) {
    getCompetitor(id: $id) {
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
export const listCompetitors = /* GraphQL */ `
  query ListCompetitors(
    $filter: ModelCompetitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompetitors(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getCompetitionSubmission = /* GraphQL */ `
  query GetCompetitionSubmission($id: ID!) {
    getCompetitionSubmission(id: $id) {
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
export const listCompetitionSubmissions = /* GraphQL */ `
  query ListCompetitionSubmissions(
    $filter: ModelCompetitionSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompetitionSubmissions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getUserAgreement = /* GraphQL */ `
  query GetUserAgreement($id: ID!) {
    getUserAgreement(id: $id) {
      id
      text
      createdAt
      updatedAt
    }
  }
`;
export const listUserAgreements = /* GraphQL */ `
  query ListUserAgreements(
    $filter: ModelUserAgreementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAgreements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const articlesByCategory = /* GraphQL */ `
  query ArticlesByCategory(
    $category: Category!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articlesByCategory(
      category: $category
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const videosByCategory = /* GraphQL */ `
  query VideosByCategory(
    $category: Category!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    videosByCategory(
      category: $category
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        resourceId
        level
        category
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
