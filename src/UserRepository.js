class UserRepository {
  constructor(data) {
    this.data = data
  }

  renderUserData(userId) {
    const userData = this.data.find((user) => user.id === userId);
    return userData;
  }
}

export default UserRepository;