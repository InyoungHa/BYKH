init();

//기본 설정
function init() {
	$('.dept').hide();
	
	//도시명 눌렀을 때
	$(".loc").click(function() {
		//누른 도시 말고 다른 li 태그의 ul 들고와서 닫아주기
		const otherDept = $(".loc").not(this).next(".dept");
		
		$.each(otherDept, function() {
			if($(this).css("display") == "block") {
				$(this).slideUp(500);
			}
		});
		
		//내거는 열기
		$(this).next(".dept").slideToggle(500);
	});
}


function getDeptEmpList(deptno) {
	//ajax start
	$.ajax({
		url: '/user/getDeptEmpList', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'deptno' : deptno}, //필요한 데이터
		success: function(result) {
			const empListDiv = document.querySelector('#empListDiv');
			
			empListDiv.replaceChildren();
			
			let str = '';
			
			for(const emp of result) {
			str += `<div class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill me-2" viewBox="0 0 16 16">`;
			str += `  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>`;
			str += `</svg>${emp.ename} ${emp.e_job}</div>`;
			}
			
			empListDiv.insertAdjacentHTML('afterbegin', str)
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


