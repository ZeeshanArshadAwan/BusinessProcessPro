var AlertimageUrl = "";
if (window.location.origin == window.WebAppUrl) {
    AlertimageUrl = window.location.origin;

} else {
    AlertimageUrl = window.location.origin + window.WebAppUrl;
}

var SweetAlert = {
    alertt1: function (toast, position, msg, btnText, popClass) {
        Swal.fire({
			toast: toast,
            position: position,
            text: msg,
            confirmButtonText: btnText,
            customClass: popClass,
            buttonsStyling: false,
            imageUrl: AlertimageUrl +"/content/Validations/vmpng.png",
            imageWidth: 50,
            imageHeight: 83,
            imageAlt: 'Custom image'
        });
    },
    alert1: function (toast, position, msg, btnText, popClass) {
        Swal.fire({
			toast: toast,
            position: position,
            text: msg,
            confirmButtonText: btnText,
            customClass: popClass,
            buttonsStyling: false,
            imageUrl: AlertimageUrl +"/content/Validations/vmpng.png",
            imageWidth: 50,
            imageHeight: 83,
            imageAlt: 'Custom image'
        });
    },
    alert2: function (toast, position, msg, btnText, cancelBtnText, popClass) {
        Swal.fire({
            toast: toast,
            position: position,
            text: msg,
            confirmButtonText: btnText,
            cancelButtonText: cancelBtnText,
            customClass: popClass,
            buttonsStyling: false,
            showCancelButton: true,
            imageUrl: AlertimageUrl+"/content/Validations/vmpng.png",
            imageWidth: 50,
            imageHeight: 83,
            imageAlt: 'Custom image'
        });
    },
    alert4: function (toast, position, title, msg, btnText, cancelBtnText, popClass) {
        Swal.fire({
            toast: toast,
            position: position,
            title: title,
            text: msg,
            confirmButtonText: btnText,
            cancelButtonText: cancelBtnText,
            customClass: popClass,
            buttonsStyling: false,
            showCancelButton: true,
            imageUrl: AlertimageUrl+"/content/Validations/vmpng.png",
            imageWidth: 50,
            imageHeight: 83,
            imageAlt: 'Custom image'
        }).then((result) => {
            var myConEle = document.querySelector('[ng-controller=myCntrl]');
            var myscope = angular.element(myConEle).scope();
                myscope.checkDialogAlert(result.value);
          
        });
    },
	alert5: function (toast, position, msg, btnText, cancelBtnText, popClass, timer) {
        Swal.fire({
            toast: toast,
            position: position,
            text: msg,
            confirmButtonText: btnText,
            cancelButtonText: cancelBtnText,
            customClass: popClass,
			timer: timer,
            buttonsStyling: false,
            showCancelButton: true,
            imageUrl: AlertimageUrl+"/content/Validations/vmpng.png",
            imageWidth: 50,
            imageHeight: 83,
            imageAlt: 'Custom image'
        });
    }
};



$("#btn1").click(function () {
    SweetAlert.alert1(false, 'top-right', 'Any Fool Can Use Computer Now', 'OK', 'infoDialog');
});
$("#btn2").click(function () {
    SweetAlert.alert1(false, 'top-left', 'Any Fool Can Use Computer Now', 'OK', 'errorDialog');
});
$("#btn3").click(function () {
    SweetAlert.alert1(false, 'bottom-right', 'Any Fool Can Use Computer Now', 'OK', 'dangerDialog');
})
;
$("#btn4").click(function () {
    SweetAlert.alert1(false, 'bottom-left', 'Any Fool Can Use Computer Now', 'OK', 'successDialog');
});


 /* ALERT 2 */
$("#btn11").click(function () {
    SweetAlert.alert2(false, 'top-right', 'Any Fool Can Use Computer Now', 'OK', 'cancel', 'infoDialog');
});


/* Alert 3 */
$("#btna").click(function () {
    SweetAlert.alert3(false, 'top-right', 'info', 'Oopsss ....', 'Any Fool Can Use Computer Now', 'OK', 'cancel', 'dangerDialog');
});



/* Alert 4 */
$("#btnconfirm").click(function () {
    SweetAlert.alert4(false, 'top-right', 'Are you sure?', "You won't be able to revert this!", 'Yes, delete it!', 'cancel', 'infoDialog');
});
