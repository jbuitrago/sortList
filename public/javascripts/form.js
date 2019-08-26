var form = document.getElementById("myForm");
var files_input = document.getElementById("file");

/*Submit Item*/
if ( document.getElementById( "btn_submit" )) {
    form.addEventListener("submit", function (evt) {
        evt.preventDefault();


        var description = document.getElementById("description");
        var _id = document.getElementById("_id");

        var formData = new FormData(form);
        formData.append("description", description.value);
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var responseText = JSON.parse(this.responseText);
                cancel();
                if (_id.value != "") {

                } else {
                    var cont = parseInt(document.getElementById("totalItems").innerText) + 1;
                    var innerHtml = '<li class="list-group-item" draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)" id="li_' + cont + '"><button type="button" class="btn btn-outline-primary"   onclick="editItem(' + cont + ',\'' + responseText._id + '\');">Edit</button><button type="button" class="btn btn-outline-secondary" onclick="deleteItem(' + cont + ',\'' + responseText._id + '\');">Delete</button><input type="hidden" id="_id_' + cont + '" value="' + responseText._id + '"><input type="hidden" id="description_' + cont + '" value="' + responseText.description + '"><input type="hidden" id="file_' + cont + '" value="' + responseText.image + '">' + responseText.description + '</li>';
                    var ul = document.getElementById("items");
                    ul.innerHTML += innerHtml;
                    document.getElementById("totalItems").innerText = cont;
                    document.getElementById('fileInfo').innerHTML = "";
                }

            }
        };


        if (_id.value != "") {
            formData.append("_id", _id.value);
            xhttp.open("POST", "/items/update", true);

        } else {

            xhttp.open("POST", "/items", true);
        }


        xhttp.send(formData);

        return false;

    });

    //addEventListener change
    files_input.addEventListener("change", checkFileDetails, false);
}




//Edit Item

function editItem(id,_id){

    document.getElementById("btn_submit").disabled= false;

    document.getElementById("_id").value = document.getElementById("_id_" + id).value;
    document.getElementById("description").value = document.getElementById("description_" + id).value;
    document.getElementById("thumbnail").src =  document.getElementById("file_" + id).value;



}

//Delete Item
function deleteItem(id,_id){

    var formData = new FormData(form);
    formData.append("item", _id);

    if(confirm("Do you want delete the item :" +  _id + "?" )){
        //uploadFiles(form);
        var xhttp = new XMLHttpRequest();

        var data = {};
        data.item = _id;

        var json = JSON.stringify(data);


        var ul = document.getElementById("items");
        var li = document.getElementById("li_" + id);
        ul.removeChild(li);
        var cont = parseInt(document.getElementById("totalItems").innerText) - 1;
        document.getElementById("totalItems").innerText = cont;
        cancel();


        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/items/delete", true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

            }
        }

        xhttp.send(json);


    }





}


//Cancel

function cancel(){

    document.getElementById("myForm").reset();
    document.getElementById("thumbnail").src="";
    document.getElementById('fileInfo').innerHTML = "";

}


//checkFileDetails
function checkFileDetails() {

    var fi = document.getElementById('file');
    if (fi.files.length > 0) {      // FIRST CHECK IF ANY FILE IS SELECTED.

        for (var i = 0; i <= fi.files.length - 1; i++) {
            var fileName, fileExtension, fileSize, fileType, dateModified;


            fileName = fi.files.item(i).name;
            fileExtension = fileName.replace(/^.*\./, '');


            if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' ) {

                //readImageFile(fi.files.item(i));

                readImageFile(fi.files.item(i));


            }
            else {
                document.getElementById('fileInfo').innerHTML = 'File Extension: <b>' + fileExtension + '</b> <br />' ;

                return false;

            }
        }



    }
}

// readImageFile
function readImageFile(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            var w = this.width;
            var h = this.height;

                if (parseInt(w) === 320 && parseInt(h) === 320) {
                    document.getElementById('fileInfo').innerHTML =
                        'Width: <b>' + w + '</b> <br />' +
                        'Height: <b>' + h + '</b> <br />';

                    document.getElementById("btn_submit").disabled= false;
                } else {
                    document.getElementById('fileInfo').innerHTML =
                        'Width: <b>' + w + '</b> <br />' +
                        'Height: <b>' + h + '</b> <br />';
                    document.getElementById("btn_submit").disabled= true;

                }

        }
    };
    reader.readAsDataURL(file);


}

