class HydrationRepository {
  constructor(data) {
    this.hydrateData = data;
  }
  getUserData(userId) {
    const singleUserData = this.hydrateData.filter((user) => user.userID === userId);
    return singleUserData;
  }
};

export default HydrationRepository;
