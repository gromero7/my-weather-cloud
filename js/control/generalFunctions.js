function generalAJAXCall(url, type, async, data, dataType, callback) {
    $.ajax({
        url: url,
        type: type,
        async: async,
        data: data,
        dataType: dataType,
        success: function(response) {
            callback.call(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status + "\n" + thrownError);
        }
    });
}

function showErrors(errors) {
    var errorString = "";

    $.each(errors, function(index, error) {
        errorString += error + "\n";
    });
    /*
    for (var i = 0; i < errors.length; i++)
    {
    	error+=errors[i]+"\n";
    }
    */
    alert(errorString);
}

function createDOMElement(tagEle, attrArray, eventsArray, optionsArray) {
    var elem = $("<" + tagEle + "></" + tagEle + ">");

    //~ elem.attr({
    //~ "type":typeElem,
    //~ "id":id
    //~ });

    for (var attr in attrArray) {
        elem.attr(attr, attrArray[attr]);
    }

    for (var event in eventsArray) {
        elem.bind(event, function() {
            eval(eventsArray[event])
        });
    }

    for (var i = 0; i < optionsArray.length; i++) {
        var option = $("<option></option>").html(optionsArray[i][1]);

        for (var attr in optionsArray[i][0]) {
            option.attr(attr, optionsArray[i][0][attr]);
        }

        elem.append(option);
    }

    return elem;
}
