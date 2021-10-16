class UserRepository {
  constructor(data) {
    this.data = data
  }

  renderUserData(userId) {
    return this.data.find((user) => user.id === userId);
  }
}

export default UserRepository;