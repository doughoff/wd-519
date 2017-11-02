// create a stub object
Xrm = {};
Xrm.Page = {};

// add objects for return types
attribute = {
    value: '2017',
    getValue: function () { return this.value; }
};
control = {
    notification: 'a notification',
    setNotification: function (message) {
        console.error(message);
    }
};
schemaAttributes = {
    attributeName: 'attributeValue',
    firstTextBoxID: document.getElementById('firstTextBoxID')
}

// add functions to Xrm.Page stub object
Xrm.Page.getAttribute = function (attributeName) {
    console.log('getAttribute() of ', attributeName);
    return schemaAttributes[attributeName];  // returns value from object above
}
Xrm.Page.getControl = function (controlName) {
    return control;
}

// global function
function IsYear(year) {
    // valid year format YYYY
    console.info("IsYear method begins...");
    return /^[0-9]{4}$/.test(year);
}
function isDateEightDigit(date) {
    // valid date format DDMMYYYY
    return /^((((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|(1[0-9])|(2[0-8]))))[\s\.\-\/\\]?(((([2468][^048])|([13579][^26]))00)|(\d\d\d[13579])|(\d\d[02468][^048])|(\d\d[13579][^26])))|(((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|([12][0-9]))))[\s\.\-\/\\]?(((([2468][048])|([13579][26]))00)|(\d\d[2468][048])|(\d\d[13579][26])|(\d\d0[48]))))$/.test(date);
}

//Method called on year field change
function checkfield(attributeName, test) {
    console.log('attributeName is ', attributeName);
    var attribute = Xrm.Page.getAttribute(attributeName);
    console.log('attribute is ', attribute);
    switch (test) {
        case 'year':
            year = attribute.value;
            console.log('year is ', year);
            var check = IsYear(year);
            if (!check) {
                Xrm.Page.getControl(attributeName).setNotification("Year should be in format XXXX");
            } else {
                console.info("Year validation passed");
            }
            break;
        default:
            break;
    }
}

window.onload = function (event) {
    var tb_first = document.querySelector('#firstTextBoxID');
    // var tb_first = document.getElementById('firstTextBoxID');
    // var field = document.querySelectorAll('.someClassName');
    // var field = document.getElementsByClassName('.someClassName');
    // var field = document.querySelectorAll('tagname');
    // var field = document.getElementsByTagName('tagname');

    // console.log('first text field', tb_first);

    tb_first.onblur = function (event) {
        console.info('Editing done. Field should be validated now.');
        // check field is correct field
        console.log(event.target.id);
        // validate the field's value
        checkfield(event.target.id, 'year');
    }

    // tb_first.addEventListener('focus', function (event){
    //     console.info('Field is being edited.');
    //     console.log(event);
    // });

    // tb_first.addEventListener('click', function (event){
    //     console.info('Field was clicked.');
    //     console.log(event);
    // });

}