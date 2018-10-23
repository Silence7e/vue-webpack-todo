const config = require('../../app.config');

const createDb = require('../../server/db/db');

const db = createDb(config.db.appId, config.db.appkey);

export default {
  getAllTodos() {
    return db.getAllTodos();
  },
};
