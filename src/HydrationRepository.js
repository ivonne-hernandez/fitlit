class HydrationRepository {
  constructor(data) {
    this.hydrateData = data;
  }
  getUserData(userId) {
    const allUserData = this.hydrateData.filter((user) => user.userID === userId);
    return allUserData;
  }
}

export default HydrationRepository;
