'use strict';


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

    fetchComponentData('http://localhost:8080/api/v1/data1', 'number-of-IoT-devices');
});


function getCookie(name)
{
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith(name + '='))
        ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}


function fetchComponentData(url, elementId)
{
    fetch(url)
        .then(response => {
            if(!response.ok)
            {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            return response.json();
        })
        .then(data => {
            updateComponent(elementId, data);
        })
        .catch(error => {
            document.getElementById(elementId).innerHTML = 'Failed to load data:' + error;
        });
}

function updateComponent(elementId, data)
{
    const element = document.getElementById(elementId);
    element.innerHTML = data.field1;
}