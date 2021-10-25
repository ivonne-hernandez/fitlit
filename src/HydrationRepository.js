class HydrationRepository {
  constructor(data) {
    this.hydrateData = data;
  }
  renderUserData(userId) {
    const userHydrationOccurances = this.hydrateData.filter((hydrationOccurance) => {
      return hydrationOccurance.userID === userId;
    });
    return userHydrationOccurances;
  }
}

export default HydrationRepository;
