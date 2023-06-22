

function login(){

	const empno = document.querySelector('#loginForm #empno').value;
	const epw = document.querySelector('#loginForm #epw').value;
	
	console.log(empno)
	console.log(epw)
	
	$.ajax({
		url: '/user/login', //요청경로
		type: 'post',
		data: {'empno' : empno, 'epw' : epw}, //필요한 데이터
		success: function(result) {
						
			//로그인 성공
			if(result == 'success'){
				location.href = '/'; //첫페이지로 이동_>indexController로 이동됨
				
			}
			//로그인 실패
			else{
				//로그인 실패시 안내 멘트 => 모달창 닫으면 없애기
				const error_div = document.querySelector('#errorDiv');

				if (error_div != null) {
					error_div.remove();
				}
					
				//로그인 버튼과 비밀번호 input태그 사이에 실패 멘트를 넣어준다.
				let str='';
				
				str += '<div id="errorDiv" style="color: red; font-size: 0.9rem; width:500px; margin-left:20px; margin-top:3px; font-wight:bold;">';
				str += '로그인 정보를 확인하세요';					
				str += '</div>';				
				
				const login_error_div = document.querySelector('#loginErrorDiv');
				login_error_div.insertAdjacentHTML('beforeend',str); // div 끝나기 전에 str 추가
				
						
						
				//id, 비밀번호 input 태그 초기화
				//input태그의 type이 button인 경우 제외
				// 바로 함수를 넣어서 만든다
				document.querySelectorAll('#loginForm input:not([type="button"])').forEach(function(t){
					t.value = '';		
				});
			}
		}
		
	});
}
