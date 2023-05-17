//문서양식에 따라 바뀌어야 함.

//기안일 경우
//if(){
	
//??일 경우
//}else if(){
	
//?일 경우
//}else{
	
//}

//연차/반차 여부에 따라 시간 선택 select 활성화
function setDateTimeActivate(annualTypeTag){
	if(annualTypeTag.value=='반차'){
		document.querySelector('.start-time').disabled = false;
		document.querySelector('.end-time').disabled = false;
	}else{
		document.querySelector('.start-time').disabled = true;
		document.querySelector('.end-time').disabled = true;
	}
}