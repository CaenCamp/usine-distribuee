const getOneByEmail = async (client, email) => {
  return client
    .table("user_accounts")
    .first("user_accounts.*")
    .where({ email });
};

const getOneById = async (client, id) => {
  return client
    .table("user_accounts")
    .first("user_accounts.*")
    .where({ id });
};

module.exports = {
    getOneByEmail,
    getOneById,
};
