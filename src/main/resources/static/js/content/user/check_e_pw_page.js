


//비번 확인  
function checkPwd(){
	
	const checkPassword = document.querySelector('#password').value;
	
	if(!checkPassword || checkPassword.trim() === ""){
            alert("비밀번호를 입력하세요.");
    } else{
	
	
	$.ajax({
		url: '/user/checkPwdAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'checkPassword':checkPassword}, //필요한 데이터
		success: function(result) {		
                if(result){                   
                    window.location.href="/user/changeEPW";
                } else{                  
                    // 비밀번호가 일치하지 않으면
                    alert("비밀번호가 맞지 않습니다.");
                    window.location.reload();
                }
		},
		error: function() {
			alert('실패');
		}
	});

	}
}