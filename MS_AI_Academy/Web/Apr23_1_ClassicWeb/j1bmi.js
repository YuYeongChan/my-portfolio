function check(){
    var nameField = document.joinForm.name;
    var heiField = document.joinForm.hei;
    var weiField = document.joinForm.wei;
    var psaField = document.joinForm.psa;

    if (insEmpty(nameField)) {
        alert("이름 다시");
        nameField.value = "";
        nameField.focus();
        return false;
    }
    if (insEmpty(heiField) || isNotNum(heiField)) {
        alert("키 다시");
        heiField.value = "";
        heiField.focus();
        return false;
    }
    if (insEmpty(weiField) || isNotNum(weiField)) {
        alert("몸무게 다시");
        weiField.value = "";
        weiField.focus();
        return false;
    }
    if (insEmpty(psaField) || 
        (isNotType(psaField, "jpg") &&
         isNotType(psaField, "png") &&
         isNotType(psaField, "jepg")
        )
    ) {
        alert("사진 다시");
        return false;
    }
    return true;
}