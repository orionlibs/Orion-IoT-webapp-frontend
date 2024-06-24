$(function ()
{
    $('body').on('click', '#update-iot-device-details-button', function(e)
    {
        const dataToSend =
        {
            deviceID: $("#input-iot-device-id").val(),
            deviceName: $("#input-device-name").val(),
            connectionURL: $("#input-connection-url").val()
        };

        orionCommon.makePutAJAXCall('http://localhost:8080/api/v1/iot-devices', dataToSend, IoTDevicesLive.processSuccessfulIoTDeviceDetailsUpdate);
    });

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
                  tableBodyHTML += '<td>' + item.connectionURL + '</td>';
                  tableBodyHTML += '<td><button id="edit-iot-device-' + item.deviceID + '" class="btn btn-info btn--icon-text"><i class="zmdi zmdi-edit"></i> Edit</button></td>';
                  tableBodyHTML += '</tr>';
                });

                $('#iot-device-live-details').html(tableBodyHTML);

                $('body').on('click', '[id^="edit-iot-device-"]', function(e)
                {
                    e.preventDefault();
                    let deviceIDToUse = $(this).prop("id").substring("edit-iot-device-".length);
                    $("#input-iot-device-id").val(deviceIDToUse);
                    $("#input-device-name").val();
                    $("#input-connection-url").val();
                    $('#iot-device-editor-modal').modal('show');
                });
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


var IoTDevicesLive =
{
    processSuccessfulIoTDeviceDetailsUpdate : function(jsonResponse)
    {
        $("#cancel-update-iot-device-details-button").click();
    }
}