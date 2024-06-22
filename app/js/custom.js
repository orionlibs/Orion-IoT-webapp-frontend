'use strict';

$(document).ready(function ()
{
    const dataToSend =
    {
        field1: 'Dimi'
    };


    fetch('http://localhost:8080/api/v1/test-url',
    {
        method: 'GET',
        mode: "cors",//cors, no-cors, same-origin
        cache: "no-cache",
        credentials: "include",//include, same-origin, omit
        headers:
        {
            'Content-Type': 'application/json',
            'X-Xsrf-Token': getCookie('XSRF-TOKEN')
        }
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
    });


    fetch('http://localhost:8080/api/v1/test-url',
    {
        method: 'POST',
        mode: "cors",//cors, no-cors, same-origin
        cache: "no-cache",
        credentials: "include",//include, same-origin, omit
        headers:
        {
            'Content-Type': 'application/json',
            'X-Xsrf-Token': getCookie('XSRF-TOKEN')
            //'Authorization': 'Basic ' + encodeCredentials("user", "pass")
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


function encodeCredentials(username, password)
{
      const combined = `${username}:${password}`;
      const base64Encoded = btoa(combined);
      return base64Encoded;
    }