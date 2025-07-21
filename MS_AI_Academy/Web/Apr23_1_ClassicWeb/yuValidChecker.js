// JavaScript 유효성 검사에 쓰는 라이브러리
// - 다양한 상황에 대응가능하게 최대한 일반적으로 제작
// - 부정적인 컨셉

// 안썼으면 false, 썼으면 true - 긍정적인 컨셉
// 안썼으면 true, 썼으면 false - 부정적인 컨셉

// <input> 넣었을때
// 안썼으면 true, 썼으면 false
function insEmpty(field) {
    return !field.value;
}

// <input>, 최소글자수 넣었을때
// 짧으면 true, 안짧으면 false
function minLength(field, len) {
    return field.value.length < len;
}

// id에 한글, 특수문자, 한자, 일본어, ...못쓰게

function containsWord(field) {
    var set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_@.!"
    for (var i = 0; i < field.value.length; i++) {
        if(set.indexOf(field.value[i]) == -1) {
            return true;
        }
    }
    return false;
}

// pw, pw확인 같은지
function passwordCheck(field1, field2) {
    if (field1.value != field2.value)
        return true;
    return false;
}



// pw조합
//      a : 소문자, 숫자
//      b : 대문자
//      c : 특수문자, 숫자
//      d : abc, 123
//      e : !@#, iop
// => 모두 대응되게
// <input>, 문자열세트를 넣었을때
// 그게 안들어있으면 true
function notInclude(field, set) {
    for (var i = 0; i < set.length; i++) {
        if(field.value.indexOf(set[i]) != -1) {
            return false;
        }
    }
    return true;
}
// <input> 넣었을때
// 숫자가 아니면 true
function isNotNum(field){
    return isNaN(field.value) || (field.value.indexOf(" ") != -1);
}
// isNaN이 띄어쓰기에 약점이 있음

// field.value
//      다른거 : 거기다 쓴 글자
//      파일타입 : 선택한 파일명이 글자로
// 파일명만 체크?
//      1) JavaScript에서 전문적으로 파일체크 불가
//      2) 유효성검사는 사용자 좋으라고 하는건데,
//          굳이 파일 확장가까지 바꿔가며 할거면...

// <input>, 확장자 넣었을때
// 그 파일이 아니면 true
function isNotType(field, type) {
    // 선택한 파일명에 .png들어있나 체크
    type = "." + type;
    return field.value.toLowerCase().indexOf(type) == -1;
}
