const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
    constructor(repository) {
        this.repository = repository;
    }

    async register(name, email, password) {
        const userExists = await this.repository.findByEmail(email);
        if (userExists) throw new Error("This email was already used by another user.");

        const newUser = new User({ name, email, password });
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        await this.repository.save(newUser);
        return newUser;
    }

    async login(email, password) {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new Error("User not found.");

        const isSamePassword = bcrypt.compareSync(password, user.password);
        if (!isSamePassword) throw new Error("Wrong password.");

        const token = jwt.sign({ id: user.id, email: user.email }, "segredo-do-jwt", { expiresIn: "1d" });
        user.password = undefined;
        return { token, user };
    }

    async verifyToken(token) {
        const decodedToken = jwt.verify(token, "segredo-do-jwt");
        const user = await this.repository.findByEmail(decodedToken.email);
        return user;
    }
}

module.exports = AuthService;