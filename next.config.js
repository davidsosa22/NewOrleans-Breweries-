module.exports = () => {
  const rewrites = () => {
    return [
      {
        // this is the proxy
        // the intermediate server between the front end(client) and backend(server)
        source: "/data",
        destination: "http://127.0.0.1:8080/data",
      },
    ];
  };
  return {
    rewrites,
  };
};
