Xrm.Page = {};

attribute = {value = 'a value'};
control = {notification = 'a notification'};

Xrm.Page.getAttribute = function getAttribute(attributeName) {
    return attribute;
}
Xrm.Page.getControl = function getControl(controlName) {
    return control;
}

//Method called on year field change
function checkfield() {
    var year = Xrm.Page.getAttribute("yearofpassing").getValue(); //get current value of field
    var check = IsYear(year);
    if (!check) {
        Xrm.Page.getControl("yearofpassing").setNotification("Year should be in format XXXX");
    }
}

//Regex to check year validity
function IsYear(year) {
    // alert("entered IsYear method");
    return /^\d{4}$/.test(year);
}