const getOneByEmail = (client, email) => {
  return client
    .table("user_account")
    .first("user_account.*")
    .where({ email });
};

const getOneById = (client, id) => {
  return client
    .table("user_account")
    .first("user_account.*")
    .where({ id });
};

module.exports = {
    getOneByEmail,
    getOneById,
};
