const {
  // rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  // rewireTSLint,
} = require("react-app-rewire-typescript-babel-preset");
const rewireTypescript = require("react-app-rewire-awesome-typescript");

module.exports = {
  webpack: function(config, env) {
    // config = rewireTypescript(config);
    config = rewireTypescript(config, env, {
      // useBabel: true,
      useCache: true,
      errorsAsWarnings: true,
    });
    // config = rewireTSLint(config, { typeCheck: true });

    return config;
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  },
};
