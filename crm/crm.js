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
crmSchemaAttributes = {
    attributeName: 'attributeValue',
    firstTextBoxID: document.getElementById('firstTextBoxID')
}

// add functions to Xrm.Page stub object
Xrm.Page.getAttribute = function (attributeName) {
    // console.log('getAttribute() of ', attributeName);
    return crmSchemaAttributes[attributeName];  // returns value from object above
}
Xrm.Page.getControl = function (controlName) {
    // console.log('getControl() of ', controlName);
    // returns value from object above
    var control = crmSchemaAttributes[controlName];
    control.setNotification = function (message) {
        if (message) {
            console.error(message);
        } else {
            console.info('Cleared notifications.');
        }
    }
    return control;
}

// global validating function
function IsYearFourDigits(year) {
    // valid year format YYYY
    console.info("IsYear method begins...");
    return /^[0-9]{4}$/.test(year);
}
// global validating function
function isDateEightDigit(date) {
    // valid date format DDMMYYYY
    return /^((((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|(1[0-9])|(2[0-8]))))[\s\.\-\/\\]?(((([2468][^048])|([13579][^26]))00)|(\d\d\d[13579])|(\d\d[02468][^048])|(\d\d[13579][^26])))|(((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|([12][0-9]))))[\s\.\-\/\\]?(((([2468][048])|([13579][26]))00)|(\d\d[2468][048])|(\d\d[13579][26])|(\d\d0[48]))))$/.test(date);
}

//Method called on year field change
function validateDateInput(attributeName, test) {
    console.info('checkfield() ', attributeName, test);
    // console.log('attributeName is ', attributeName);
    var attribute = Xrm.Page.getAttribute(attributeName);
    // console.log('attribute is ', attribute);
    switch (test) {
        case 'yearIsFourDigits':
            console.info('Validating 4 digit year');
            year = attribute.value;
            // console.log('year is ', year);
            var isYearFourDigits = IsYearFourDigits(year);
            if (isYearFourDigits) {
                // clear notifications 
                Xrm.Page.getControl(attributeName).setNotification("");
                console.info("yearIsFourDigits validation passed");
            } else {
                Xrm.Page.getControl(attributeName).setNotification("Year should be in format XXXX");
            }
            break;
        case 'dateIsEightDigits':
            console.info('Validating 8 digit date');
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

    tb_first.onblur = function (event) {
        // debugger;
        console.info('Editing done. Validation starting.');
        // validate the field's value
        validateDateInput(event.target.id, 'yearIsFourDigits');
        validateDateInput(event.target.id, 'dateIsEightDigits');
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