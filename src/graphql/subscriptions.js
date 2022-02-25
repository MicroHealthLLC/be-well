/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder($owner: String!) {
    onCreateReminder(owner: $owner) {
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
export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder($owner: String!) {
    onUpdateReminder(owner: $owner) {
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
export const onDeleteReminder = /* GraphQL */ `
  subscription OnDeleteReminder($owner: String!) {
    onDeleteReminder(owner: $owner) {
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
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal($owner: String!) {
    onCreateGoal(owner: $owner) {
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
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal($owner: String!) {
    onUpdateGoal(owner: $owner) {
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
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal($owner: String!) {
    onDeleteGoal(owner: $owner) {
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
export const onCreateFavoriteArticle = /* GraphQL */ `
  subscription OnCreateFavoriteArticle($owner: String!) {
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
  subscription OnUpdateFavoriteArticle($owner: String!) {
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
  subscription OnDeleteFavoriteArticle($owner: String!) {
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
  subscription OnCreateFavoriteVideo($owner: String!) {
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
  subscription OnUpdateFavoriteVideo($owner: String!) {
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
  subscription OnDeleteFavoriteVideo($owner: String!) {
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
