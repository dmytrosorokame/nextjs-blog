const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "dmytro",
        mongodb_password: "oOl8Bk0CiSzR7Uwf",
        mongodb_cluster: "dmytrosorokadatabase",
        mongodb_db: "my-site-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "dmytro",
      mongodb_password: "oOl8Bk0CiSzR7Uwf",
      mongodb_cluster: "dmytrosorokadatabase",
      mongodb_db: "my-site",
    },
  };
};
