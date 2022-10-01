const CheckEditAccess = (authUserId, postId ) => {
  return authUserId === postId;
};

export default CheckEditAccess;