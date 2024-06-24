$(document).ready(function ()
{
    $('body').on('click', '#update-iot-device-details-button', function(e)
    {
        const dataToSend =
        {
            deviceID: $("#input-iot-device-id").val(),
            deviceName: $("#input-device-name").val(),
            connectionURL: $("#input-connection-url").val()
        };

        orionCommon.makePutAJAXCall('http://localhost:8080/api/v1/iot-devices', dataToSend, IoTDevices.processSuccessfulIoTDeviceDetailsUpdate);
    });


    fetch('http://localhost:8080/api/v1/iot-devices/summaries')
    .then(response =>
    {
        if(!response.ok){throw new Error('Network response was not ok ' + response.statusText);}
        return response.json();
    })
    .then(data =>
    {
        let tableBodyHTML = "";

        data.devices.forEach(item =>
        {
            tableBodyHTML += '<tr>';
            tableBodyHTML += '<td>' + item.deviceID + '</td>';
            tableBodyHTML += '<td>' + item.deviceName + '</td>';
            tableBodyHTML += '<td>' + item.connectionURL + '</td>';
            tableBodyHTML += '<td><button id="edit-iot-device-' + item.deviceID + '" class="btn btn-info btn--icon-text"><i class="zmdi zmdi-edit"></i> Edit</button></td>';
            tableBodyHTML += '</tr>';
        });

        $('#iot-device-details').html(tableBodyHTML);

        $('body').on('click', '[id^="edit-iot-device-"]', function(e)
        {
            e.preventDefault();
            let deviceIDToUse = $(this).prop("id").substring("edit-iot-device-".length);
            $("#input-iot-device-id").val(deviceIDToUse);
            $("#input-device-name").val();
            $("#input-connection-url").val();
            $('#iot-device-editor-modal').modal('show');
        });
    })
    .catch(error =>{document.getElementById("iot-device-details").innerHTML = 'Failed to load data:' + error;});
});


var IoTDevices =
{
    processSuccessfulIoTDeviceDetailsUpdate : function(jsonResponse)
    {
        $("#cancel-update-iot-device-details-button").click();
    }
}