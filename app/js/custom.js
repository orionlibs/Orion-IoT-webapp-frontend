'use strict';

$(document).ready(function ()
{
    const dataToSend =
    {
        field1: 'Dimi'
    };


    fetch('http://localhost:8080/api/v1/test-url',
    {
        method: 'POST',
        mode: "cors",//cors, no-cors, same-origin
        cache: "no-cache",
        credentials: "omit",//include, same-origin, omit
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
        alert(jsonResponse.field1);
    })
    .catch(error =>
    {
        alert('There has been a problem with your fetch operation:' + error);
    });
});


function getCookie(name)
{
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith(name + '='))
        ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}