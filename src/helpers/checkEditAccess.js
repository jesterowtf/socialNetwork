const CheckEditAccess = (authUserId, targetUserId ) => {
  return authUserId === targetUserId;
};

export default CheckEditAccess;