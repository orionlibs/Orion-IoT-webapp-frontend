var orionCommon =
{
    getCookie : function(name)
    {
        const cookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    },


    fetchComponentData : function(url, elementID)
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
            orionCommon.updateComponent(elementID, data);
        })
        .catch(error => {
            document.getElementById(elementID).innerHTML = 'Failed to load data:' + error;
        });
    },


    updateComponent : function(elementID, data)
    {
        const element = document.getElementById(elementID);
        element.innerHTML = data;
    }
};