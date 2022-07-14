const db = require("./model/User");

const resolvers = {
  Query: {
    getAllUsers: () => {
      return db;
    },
    getAllUser: (_, { name }, __, ___) => {
      const users = db.filter((each) => {
        if (!name) {
          throw new Error("Name is required.");
        }
        if (
          each.first_name.toLowerCase().includes(name) ||
          each.last_name.toLowerCase().includes(name)
        ) {
          return each;
        }
      });
      return users;
    },
    getFilterResults: (_, { status, gender }, __, ___) => {
      if (!status && !gender) {
        throw new Error("Status or Gender are required.");
      } else {
        const user = db.filter((each) => {
          if (each.gender === gender || each.status === status) {
            return each;
          }
        });
        return user;
      }
    },
  },
};

module.exports = { resolvers };
