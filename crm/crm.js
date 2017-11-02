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
function IsDateEightDigits(date) {
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
            date = attribute.value;
            // console.log('year is ', year);
            var isDateEightDigit = IsDateEightDigits(date);
            if (isDateEightDigit) {
                // clear notifications 
                Xrm.Page.getControl(attributeName).setNotification("");
                console.info("isDateEightDigit validation passed");

                // format date with slashes/dashes
                var insertCharacter = '/';
                attribute.value = attribute.value.substring(0,2) + insertCharacter + 
                attribute.value.substring(2,4) + insertCharacter + 
                attribute.value.substring(4);

            } else {
                Xrm.Page.getControl(attributeName).setNotification("Date should be in format MMDDYYYY");
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

    tb_first.onblur = function (event) {
        // debugger;
        console.info('Editing done. Validation starting.');
        console.log(event.target.value);
        // fill in missing two-digit sequences - month and day
        //m/dd/yyyy - 12/1/2017
        if( event.target.value.match(/^[0-9]{1}[-\/\.].*/g) ){
            event.target.value = '0' + event.target.value;
            console.log('added zero for month');
        }
        //mm/d/yyyy
        if( event.target.value.match(/[0-9]{2}[-\/\.][0-9]{1}[-\/\.]/g) ){
            event.target.value = event.target.value.substring(0,3) + '0'
                + event.target.value.substring(3);
            console.log('added zero for day');
        }
        // clean - strip non-numeric characters (\D or [^0-9] = not numeric)
        event.target.value = event.target.value.replace(/[^0-9]/g,'');
        // add zeros for one digit month and days


        // validate the field's value
        // validateDateInput(event.target.id, 'yearIsFourDigits');
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