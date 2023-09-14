class UserMemoryRepository {
    constructor() {
        this.users = [];
    }

    findByEmail(email) {
        return this.users.find((user) => email === user.email);
    }

    save(user) {
        this.users.push(user);
    }
}

module.exports = UserMemoryRepository;