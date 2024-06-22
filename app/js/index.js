$(document).ready(function ()
{
    /*const dataToSend =
    {
        field1: 'Dimi'
    };


    fetch('http://localhost:8080/api/v1/test-url',
    {
        method: 'POST',
        cache: "no-cache",
        mode: "cors",//cors, no-cors, same-origin
        credentials: "include",//include, same-origin, omit
        headers:
        {
            'Content-Type': 'application/json',
            'X-Xsrf-Token': getCookie('XSRF-TOKEN')
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response =>
    {
        if(!response.ok)
        {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json();
    })
    .then(jsonResponse =>
    {
        alert(jsonResponse.field2);
    })
    .catch(error =>
    {
        alert('There has been a problem with your fetch operation:' + error);
    });*/

    orionCommon.fetchComponentData('http://localhost:8080/api/v1/home/number-of-iot-devices', 'number-of-IoT-devices');
});