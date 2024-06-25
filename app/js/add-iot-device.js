$(document).ready(function ()
{
    $('body').on('click', '#save-iot-device-button', function(e)
    {
        const dataToSend =
        {
            deviceName: $("#input-device-name").val(),
            connectionURL: $("#input-connection-url").val()
        };

        orionCommon.makePostAJAXCall('http://localhost:8080/wapi/v1/iot-devices', dataToSend, addIoTDevices.processSuccessfulIoTDeviceAddition);
    });
});


var addIoTDevices =
{
    processSuccessfulIoTDeviceAddition : function(jsonResponse)
    {
        $("#input-device-name").val("");
        $("#input-connection-url").val("");
        alert("Added!");
    }
}