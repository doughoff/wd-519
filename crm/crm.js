// create a stub object
Xrm = {};
Xrm.Page = {};

// add objects for return types
attribute = {
    value: '2017',
    getValue : function() { return this.value; }
};
control = {notification : 'a notification'};


// add functions to Xrm.Page stub object
Xrm.Page.getAttribute = function (attributeName) {
    return attribute;
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
function isDateEightDigit(date){
    // valid date format DDMMYYYY
    return /^((((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|(1[0-9])|(2[0-8]))))[\s\.\-\/\\]?(((([2468][^048])|([13579][^26]))00)|(\d\d\d[13579])|(\d\d[02468][^048])|(\d\d[13579][^26])))|(((((0[13578])|(1[02]))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|(11))[\s\.\-\/\\]?((0[1-9])|([12][0-9])|(30)))|((02)[\s\.\-\/\\]?((0[1-9])|([12][0-9]))))[\s\.\-\/\\]?(((([2468][048])|([13579][26]))00)|(\d\d[2468][048])|(\d\d[13579][26])|(\d\d0[48]))))$/.test(date);
}

//Method called on year field change
function checkfield() {
    var year = Xrm.Page.getAttribute("yearofpassing").getValue();
    var check = IsYear(year);
    if (!check) {
        Xrm.Page.getControl("yearofpassing").setNotification("Year should be in format XXXX");
    }
}

