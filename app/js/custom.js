'use strict';

$(document).ready(function ()
{
    const dataToSend =
    {
        field1: 'Dimi'
    };


    fetch('http://localhost:8080/home/test-url',
    {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers:
        {
            'Content-Type': 'application/json'
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
        alert(jsonResponse.field2 + "--" + jsonResponse.field1);
    })
    .catch(error =>
    {
        alert('There has been a problem with your fetch operation:', error);
    });
});