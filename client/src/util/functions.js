export const formatDate = (dateString) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date(dateString)
    .toLocaleDateString(undefined, options)
    .replace(',', '');
};

export const formatDay = (dateString) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
  };
  return new Date(dateString)
    .toLocaleDateString(undefined, options)
    .replace(',', '');
};

export const calcEngagement = (followers, likes, comments) => {
  const engagement = Math.round(((likes + comments) / followers) * 1000) / 10;
  return engagement;
};

export const calcEngagementForList = (userData, _list) => {
  const likes = _list.reduce((acc, item) => acc + item.likes, 0) / _list.length;
  const comments =
    _list.reduce((acc, item) => acc + item.comments.length, 0) / _list.length;

  const engagement =
    Math.round(
      ((likes + comments) / Object.values(userData.followers)[0]) * 1000
    ) / 10;

  return engagement;
};

export const calcCommentsPerPost = (_list) => {
  const comments = _list.reduce((acc, item) => acc + item.comments.length, 0);
  const commentsPerPost = Math.round(comments / _list.length);

  return commentsPerPost;
};

export const calcLikesPerPost = (_list) => {
  const likes = _list.reduce((acc, item) => acc + item.likes, 0);

  const likesPerPost = Math.round(likes / _list.length);

  return likesPerPost;
};

export const calcSentStats = (postDict) => {
  // Calculate the total number of comments
  const totalComments = postDict.reduce(
    (acc, dict) => acc + dict.comments.length,
    0
  );

  const posComments = postDict.reduce(
    (acc, dict) => acc + dict.sentiment.positive,
    0
  );
  const negComments = postDict.reduce(
    (acc, dict) => acc + dict.sentiment.negative,
    0
  );
  const neuComments = postDict.reduce(
    (acc, dict) => acc + dict.sentiment.neutral,
    0
  );

  const posPercentage = Math.round((posComments / totalComments) * 100);
  const negPercentage = Math.round((negComments / totalComments) * 100);
  const neuPercentage = Math.round((neuComments / totalComments) * 100);
  // const unkPercentage = unkComments / totalComments;

  return {
    totalComments,
    posComments,
    negComments,
    neuComments,
    posPercentage,
    negPercentage,
    neuPercentage,
  };
};

export const calculateSentimentPercentages = (post) => {
  const commentsCount =
    post.sentiment.positive + post.sentiment.negative + post.sentiment.neutral;

  const posPercent = post.sentiment.positive / commentsCount;
  const negPercent = post.sentiment.negative / commentsCount;
  const neuPercent = post.sentiment.neutral / commentsCount;

  return {
    posPercent,
    negPercent,
    neuPercent,
  };
};

export const calcSentForLineChart = (post) => {
  const { positive, negative, neutral } = post.sentiment;
  const commentsCount = positive + negative + neutral;

  const posPercent = (positive / commentsCount) * 100;
  const negPercent = (negative / commentsCount) * 100;
  const neuPercent = (neutral / commentsCount) * 100;

  return {
    ...post,
    sentimentPercentage: {
      posPercent,
      negPercent,
      neuPercent,
    },
  };
};

export const createSentimentDataStructure = (posts) => {
  const positiveSentiment = {
    id: 'positive',
    color: '#219653', // Green color for positive sentiment
    data: [],
  };

  const neutralSentiment = {
    id: 'neutral',
    color: '#365cf5', // Yellow color for neutral sentiment
    data: [],
  };

  const negativeSentiment = {
    id: 'negative',
    color: '#d50100', // Red color for negative sentiment
    data: [],
  };

  posts.forEach((post) => {
    const { igTimestamp, sentiment } = post;
    const { positive, negative, neutral } = sentiment;

    const commentsCount = positive + negative + neutral;

    positiveSentiment.data.push({
      x: new Date(igTimestamp), // Convert to Date object
      y: (positive / commentsCount) * 100,
    });

    neutralSentiment.data.push({
      x: new Date(igTimestamp), // Convert to Date object
      y: (neutral / commentsCount) * 100,
    });

    negativeSentiment.data.push({
      x: new Date(igTimestamp), // Convert to Date object
      y: (negative / commentsCount) * 100,
    });
  });

  positiveSentiment.data.reverse();
  neutralSentiment.data.reverse();
  negativeSentiment.data.reverse();

  return [positiveSentiment, neutralSentiment, negativeSentiment];
};
