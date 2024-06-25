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

        orionCommon.makePutAJAXCall('http://localhost:8080/wapi/v1/iot-devices', dataToSend, IoTDevices.processSuccessfulIoTDeviceDetailsUpdate);
    });


    fetch('http://localhost:8080/wapi/v1/iot-devices/summaries')
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
            tableBodyHTML += '<td>' + item.deviceName + '</td>';
            tableBodyHTML += '<td>' + item.connectionURL + '</td>';
            tableBodyHTML += '<td>' + item.payloads + '</td>';
            tableBodyHTML += '<td><button id="edit-iot-device-' + item.deviceID + '" class="btn btn-info btn--icon-text"><i class="zmdi zmdi-edit"></i> Edit</button></td>';
            tableBodyHTML += '<td><button id="open-latest-payloads-of-iot-device-' + item.deviceID + '" class="btn btn-info btn--icon-text"><i class="zmdi zmdi-file"></i> Payloads</button></td>';
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


        $('body').on('click', '[id^="open-latest-payloads-of-iot-device-"]', function(e)
        {
            e.preventDefault();
            let deviceIDToUse = $(this).prop("id").substring("open-latest-payloads-of-iot-device-".length);
            orionCommon.makeGetAJAXCall('http://localhost:8080/wapi/v1/iot-devices/payloads/' + deviceIDToUse + '?latest=true', IoTDevices.processLatestDevicePayloads);
        });
    })
    .catch(error =>{document.getElementById("iot-device-details").innerHTML = 'Failed to load data:' + error;});
});


let IoTDevices =
{
    processSuccessfulIoTDeviceDetailsUpdate : function(jsonResponse)
    {
        $("#cancel-update-iot-device-details-button").click();
    },


    processLatestDevicePayloads : function(jsonResponse)
    {
        let tableBodyHTML = "";

        jsonResponse.payloads.forEach(item =>
        {
            tableBodyHTML += '<tr>';
            tableBodyHTML += '<td>' + item.topic + '</td>';
            tableBodyHTML += '<td>' + item.payload + '</td>';
            tableBodyHTML += '<td>' + item.timestampOfRecord + '</td>';
            tableBodyHTML += '</tr>';
        });

        $('#latest-iot-device-payloads').html(tableBodyHTML);
        $('#iot-device-latest-payloads-modal').modal('show');
    }
}