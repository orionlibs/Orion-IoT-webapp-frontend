$(document).ready(function ()
{
    fetch('http://localhost:8080/api/v1/iot-devices/summaries')
    .then(response =>
    {
        if(!response.ok){throw new Error('Network response was not ok ' + response.statusText);}
        return response.json();
    })
    .then(data =>
    {
        var tableBodyHTML = "";

        data.devices.forEach(item =>
        {
          tableBodyHTML += '<tr>';
          tableBodyHTML += '<td>' + item.deviceID + '</td>';
          tableBodyHTML += '<td>' + item.deviceName + '</td>';
          tableBodyHTML += '</tr>';
        });

        $('#iot-device-details').html(tableBodyHTML);
    })
    .catch(error =>{document.getElementById("iot-device-details").innerHTML = 'Failed to load data:' + error;});
});