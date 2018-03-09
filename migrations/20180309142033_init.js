exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("user", table => {
      table.increments("id");
      table.string("email");
      table.string("username");
      table.string("password");
      table.date("date");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("user")]);
};
