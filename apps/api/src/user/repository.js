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
  return client
    .table("user_account")
    .select("user_account.*");
};

const countAll = (client, email) => {
  return client
    .table("user_account")
    .count("id");
};

module.exports = {
  getOneByEmail,
  getOneById,
  getAll,
  countAll,
};
