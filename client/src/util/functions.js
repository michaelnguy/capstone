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
