const getOneByEmail = (client, email) => {
  return client
    .table("user_account")
    .first("user_account.*")
    .where("email", email);
};

const getOneById = (client, id) => {
  return client
    .table("user_account")
    .first("user_account.*")
    .where({ id });
};

const getAll = (client, email) => {
  return client.table("user_account").select("user_account.*");
};

const countAll = (client, email) => {
  return client.table("user_account").count("id");
};

const updateOne = (client, id, changes) => {
  return client
    .table("user_account")
    .where({ id })
    .update(changes, ["user_account.*"]);
};

const insertOne = (client, data) => {
  return client
    .table("user_account")
    .insert(data, ["user_account.*"]);
};

module.exports = {
  getOneByEmail,
  getOneById,
  getAll,
  countAll,
  updateOne,
  insertOne,
};
