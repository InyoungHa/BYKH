//페이지 이동 + 검색
function movePage(pageNum) {
	const communityForm = document.querySelector('#communityForm');
	document.querySelector('#nowPage').value = pageNum;	
	communityForm.submit();
}

//모달에 boardNum 추가
function isPrivateModal(privateBoardNum) {
	const boardNum = document.querySelector('#boardNum');
	boardNum.value = privateBoardNum;
}

//boardPw 확인
function checkBoardPw() {
	const boardPw = document.querySelector('#boardPw').value;
	const boardNum = document.querySelector('#boardNum').value;
	
	
	if(boardPw == '' || boardPw == null) {
		alert('비밀번호를 입력해주세요.');
		return false;
	}
	else {
		//ajax start
		$.ajax({
			url: '/community/checkBoardPw', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'boardNum' : boardNum, 'boardPw' : boardPw}, //필요한 데이터
			success: function(result) {
				if(result != '') {
					location.href = `/community/detail?boardNum=${boardNum}`;
				}
				else {
					alert('비밀번호가 틀렸습니다.');
					return false;
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
		
	}
}