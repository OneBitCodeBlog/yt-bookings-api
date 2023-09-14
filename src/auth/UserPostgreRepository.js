const db = require("../database");
const User = require("./User");

class UserPostgreRepository {
    constructor() {
        this.db = db;
    }

    async findByEmail(email) {
        const storedUser = await this.db.oneOrNone("SELECT * FROM Users WHERE email = $1", email)
        return storedUser ? new User(storedUser) : null
    }

    async save(user) {
        await this.db.none("INSERT INTO Users (id, name, email, password) VALUES ($1, $2, $3, $4)", [
            user.id,
            user.name,
            user.email,
            user.password
        ])
    }
}

module.exports = UserPostgreRepository;