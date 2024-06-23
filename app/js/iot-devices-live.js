$(function () {
    let stompClient;

    const stompConfig =
    {
      // Typically, login, passcode and vhost
      // Adjust these for your broker
      /*connectHeaders: {
        login: "guest",
        passcode: "guest"
      },*/

      // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
      brokerURL: "ws://localhost:8080/websocket",
      reconnectDelay: 500,

      // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
      onConnect: function(frame)
      {
        // The return object has a method called unsubscribe
        const subscription = stompClient.subscribe('/app/chat/topic/iot-devices-live/summaries', function(message)
        {
          const payload = JSON.parse(message.body);
          displayIncomingMessage(payload.devices);
        });
      }
    };

    stompClient = new StompJs.Client(stompConfig);
    stompClient.activate();

    setTimeout(function()
    {
       publishMessage("hello", "world");
    }, 1000);

    function publishMessage(from, message)
    {
      if(!stompClient.connected)
      {
        alert("Broker disconnected, can't send message.");
        return false;
      }

      if(message.length > 0)
      {
        const payLoad = {from: from, message: message};
        stompClient.publish({destination: '/app/chat/topic/iot-devices-live/summaries', body: JSON.stringify(payLoad)});
      }
      return true;
    }

    function displayIncomingMessage(from, message)
    {
      alert(from + " -------- " + message);
    }
  })