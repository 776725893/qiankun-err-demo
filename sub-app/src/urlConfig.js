const _ALL_URL_CONF = {
  dev: {
    authBase: "",
    SSOLogin: "",
  },
  test: {
    authBase: "",
    SSOLogin: "",
  },
  prod: {
    authBase: "",
    SSOLogin: "",
  },
};

let env = "prod";
const hostname = location.hostname;
if (hostname) {
  if (hostname.indexOf("-test") > 0) {
    env = "test";
  } else if (
    hostname.indexOf("-dev") > 0 ||
    hostname.indexOf("localhost") >= 0
  ) {
    env = "dev";
  }
}

export function isProd() {
  return env === "prod";
}

export default _ALL_URL_CONF[env];
