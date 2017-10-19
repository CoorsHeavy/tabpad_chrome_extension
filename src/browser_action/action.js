function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
function saveFunction() {
    chrome.tabs.query({currentWindow: true}, function(tabs){
        var arr = [];
        for (var i = 0; i < tabs.length; i++) {
            arr.push(tabs[i].url);  
            console.log(tabs[i].url);                  
        }
        var name = document.getElementById("info").value;
        console.log(arr);
        $.ajax({
            
            url: 'http://tabpad.me/util/create',    //Your api url
            type: 'GET',   //type is any HTTP method
            data: {
                name: name,
                tabs: JSON.stringify(arr)
            },      //Data as js object
            success: function (data) {
                console.log(data)
                document.getElementById("message").innerHTML = tabs.length + " saved in " + data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.readyState == 0) {
                    document.getElementById("message").innerHTML = "Failed: Unable to connect to the internet."
                }
                else if (XMLHttpRequest.readyState == 4){
                    document.getElementById("message").innerHTML = "Failed: " + XMLHttpRequest.responseText
                }
                console.log(errorThrown)
                console.log(textStatus)
            }
        });
    });
}
function loadFunction() {
    var name = document.getElementById("info").value;
    if(name.trim()){
        //chrome.tabs.create({'url': '45.79.74.180:3000/util/opener?name=' + name}, function(tab) {
        chrome.tabs.create({'url': addhttp('tabpad.me/' + name)}, function(tab) {
            // Tab opened.

        });
    }else{

    }
}

document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('save');
    // onClick's logic below:
    saveButton.addEventListener('click', saveFunction);

    var loadButton = document.getElementById('load');
    // onClick's logic below:
    loadButton.addEventListener('click', loadFunction);
});
