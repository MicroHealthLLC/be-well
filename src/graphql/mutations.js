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
