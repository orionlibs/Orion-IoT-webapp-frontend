$(document).ready(function ()
{
    $('body').on('click', '#save-iot-device-button', function(e)
    {
        const dataToSend =
        {
            deviceName: $("#input-device-name").val(),
            connectionURL: $("#input-connection-url").val()
        };

        fetch('http://localhost:8080/api/v1/iot-devices',
        {
            method: 'POST',
            cache: "no-cache",
            mode: "cors",//cors, no-cors, same-origin
            credentials: "include",//include, same-origin, omit
            headers:
            {
                'Content-Type': 'application/json',
                'X-Xsrf-Token': orionCommon.getCookie('XSRF-TOKEN')
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response =>
        {
            if(!response.ok)
            {
                throw new Error('Error ' + response.statusText);
            }

            return response.json();
        })
        .then(jsonResponse =>
        {
            $("#input-device-name").val("");
            $("#input-connection-url").val("");
            alert("Added!");
        })
        .catch(error =>
        {
            alert('There has been a problem with your fetch operation:' + error);
        });
    });
});