$(function () {
    let socket = new SockJS('http://localhost:8080/websocket');
    let stompClient = Stomp.over(socket);
    stompClient.heartbeat.outgoing = 0;
    stompClient.heartbeat.incoming = 0;
    stompClient.reconnect_delay = 5000;

    stompClient.connect({}, function(frame)
    {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/iot-devices-live/summaries', function(message)
        {
            if(message.body)
            {
                let messageBody = JSON.parse(message.body);
                let tableBodyHTML = "";

                messageBody.devices.forEach(item =>
                {
                  tableBodyHTML += '<tr>';
                  tableBodyHTML += '<td>' + item.deviceID + '</td>';
                  tableBodyHTML += '<td>' + item.deviceName + '</td>';
                  tableBodyHTML += '</tr>';
                });

                $('#iot-device-live-details').html(tableBodyHTML);
            }
        });
    });

    window.onbeforeunload = function()
    {
        if(stompClient)
        {
            stompClient.disconnect();
        }
    };
  })