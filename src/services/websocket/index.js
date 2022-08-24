connectToSocket = () => {
  let socket;

  if (!socket) {
    socket = new WebSocket(
      `wss://metaverse-analytics-api.herokuapp.com'/api/connect`
    );
  }
};
