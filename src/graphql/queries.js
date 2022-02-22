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
      participants {
        id
        firstName
        lastName
        email
        points
      }
      photos {
        items {
          id
          s3key
          description
          submittedBy
          createdAt
          updatedAt
        }
        nextToken
      }
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
        participants {
          id
          firstName
          lastName
          email
          points
        }
        photos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEventPhoto = /* GraphQL */ `
  query GetEventPhoto($id: ID!) {
    getEventPhoto(id: $id) {
      id
      s3key
      event {
        id
        hostName
        hostEmail
        title
        description
        type
        date
        startTime
        endTime
        participants {
          id
          firstName
          lastName
          email
          points
        }
        photos {
          nextToken
        }
        createdAt
        updatedAt
      }
      description
      submittedBy
      createdAt
      updatedAt
    }
  }
`;
export const listEventPhotos = /* GraphQL */ `
  query ListEventPhotos(
    $filter: ModelEventPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        s3key
        event {
          id
          hostName
          hostEmail
          title
          description
          type
          date
          startTime
          endTime
          createdAt
          updatedAt
        }
        description
        submittedBy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const articlesByCategory = /* GraphQL */ `
  query ArticlesByCategory(
    $category: Category
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
    $category: Category
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
