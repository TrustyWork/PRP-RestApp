var getMCE = function(){
    var btMCE  = document.querySelector('.btMCE');

    btMCE.addEventListener('click', function() {
        let xhr = new XMLHttpRequest();
        xhr.open('post', "/redact/putEditorText", true);

        var editorText = tinyMCE.get('first').getContent()
        console.log(editorText)
        var formData = new FormData();
        formData.append("text", editorText)

        xhr.onerror = function (err) {
            console.log(`Error: ${err.target.status}`)
        };
        xhr.setRequestHeader('Content-Type', 'text/html');
        xhr.send(editorText); //пустое значение на сервере
    })
}


var getText = function(){
    var bt  = document.querySelector('.bt');
    console.log(bt)
    bt.addEventListener('click', function(){

        let xhr = new XMLHttpRequest();
        xhr.open('post', "/redact/puttext", true);

        var val = document.querySelector('.text').value;
        //var dataobj = {text: val};
        //console.log(dataobj)
        var formData = new FormData();
        formData.append("text", val)

        xhr.onerror = function (err) {
            console.log(`Error: ${err.target.status}`)
        };
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(formData);
    })

}

getText();
getMCE();
