init();

function init() {
	//로그인 모달창
	const privateModal = document.querySelector('#privateModal');
	
	//모달창을 닫으면 input태그 내용 지워짐
	privateModal.addEventListener('hidden.bs.modal', function(e){
		document.querySelector('#boardPw').value = '';
	});
}

//글 삭제
function deleteBoard(boardNum) {
	if(confirm('정말 삭제하시겠습니까?')) {
		location.href = "/community/delete?boardNum=" + boardNum;
	}
}


//댓글 등록
function regReply(boardNum) {
	const replyTextarea = document.querySelector('#replyTextarea');
	const replyContent = replyTextarea.value;
	const regReplyTr = document.querySelector('#regReplyTr');
	const noReplyTr = document.querySelector('#noReplyTr');
	const replyCntSpan = document.querySelector('#replyCntSpan');
	
	if(replyContent == '' || replyContent == null) {
		alert('댓글을 입력해주세요.');
		return false;
	};
	
	const replyContentBr = replyContent.replace(/(?:\r\n|\r|\n)/g, '<br>');
	
	//ajax start
	$.ajax({
		url: '/reply/regReplyAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'replyContent' : replyContentBr, 'boardNum' : boardNum}, //필요한 데이터
		success: function(result) {
			const reply = result;
			
			if(noReplyTr != null) {
				noReplyTr.remove();
			}
			
			let str = '';
			
			str += `<tr class="border-top">                                                         `;
			str += `	<td class="text-center">                                                    `;
			if(reply.attachedFileName == null) {
			str += `		<img src="/upload/empImg/test.jpg" width="100%" class="mx-0 rounded-circle border">`;
			}
			else {
			str += `		<img src="/upload/empImg/${reply.attachedFileName}" width="100%" class="mx-0 rounded-circle border">`;
			}
			str += `	</td>                                                                       `;
			str += `	<td>                                                                        `;
			str += `		<div class="d-flex justify-content-between">                            `;
			str += `			<div class="fw-semibold mb-1">${reply.ename}</div>                    `;
			str += `			<div class="text-secondary fs-6">${reply.replyDate}</div>           `;
			str += `		</div>                                                                  `;
			str += `		<div>${reply.replyContent}</div>                                              `;
			str += `		<div class="d-grid gap-1 d-md-flex justify-content-md-end">             `;
			str += `			<input type="button" class="btn" onclick="updateReplyForm('${reply.replyNum}', this)" value="수정">                      `;
			str += `			<input type="button" class="btn" onclick="deleteReply('${reply.replyNum}', this)" value="삭제">                      `;
			str += `		</div>                                                                  `;
			str += `	</td>                                                                       `;
			str += `</tr>                                                                           `;
			
			
			regReplyTr.insertAdjacentHTML('beforebegin', str);
			
			replyTextarea.value = '';
			
			replyCntSpan.textContent = Number(replyCntSpan.textContent) + 1;
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
}


//댓글 삭제
function deleteReply(replyNum, deleteBtn) {
	const deleteReplyTag = deleteBtn.closest('tr');
	const replyTable = document.querySelector('#replyTable');
	const replyCntSpan = document.querySelector('#replyCntSpan');
	
	if(confirm('댓글을 삭제하시겠습니까?')) {
		//ajax start
		$.ajax({
			url: '/reply/deleteAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'replyNum' : replyNum}, //필요한 데이터
			success: function(result) {
				deleteReplyTag.remove();
				
				const replyTrs = replyTable.querySelectorAll('tr');
				
				//댓글이 없으면
				if(replyTrs.length == 1) {
					let str = '';
					
					str += `<tr class="border-top" id="noReplyTr">                                             `;
					str += `	<td class="text-secondary text-center align-middle" colspan="2" height="120px">`;
					str += `		등록된 댓글이 없습니다.                                                    		`;
					str += `	</td>                                                                          `;
					str += `</tr>                                                                              `;
					
					replyTable.insertAdjacentHTML('afterbegin', str);
				}
				
				replyCntSpan.textContent = Number(replyCntSpan.textContent) - 1;
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}


//댓글 수정 폼
function updateReplyForm(replyNum, updateBtn) {
	const replyContentDiv = updateBtn.parentElement.previousElementSibling;
	const replyContent = replyContentDiv.innerHTML;
	
	const replyContentBr = replyContent.replaceAll("<br>", "\r\n");
	
	const str = `<textarea class="form-control my-1" style="resize: none">${replyContentBr}</textarea>`;
	
	replyContentDiv.replaceChildren();
	replyContentDiv.insertAdjacentHTML('afterbegin', str);
	
	updateBtn.value = '등록';
	updateBtn.setAttribute("onClick", `updateReply("${replyNum}", this)`);
}


//댓글 수정
function updateReply(replyNum, formBtn) {
	const replyContentDiv = formBtn.parentElement.previousElementSibling;
	const replyContent = replyContentDiv.querySelector('textarea').value;
	const replyDateDiv = replyContentDiv.previousElementSibling.lastElementChild;
	
	if(replyContent == '' || replyContent == null) {
		alert('댓글을 입력해주세요.');
		return false;
	};
	
	const replyContentBr = replyContent.replace(/(?:\r\n|\r|\n)/g, '<br>');
	
	//ajax start
	$.ajax({
		url: '/reply/updateAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'replyNum' : replyNum, 'replyContent' : replyContentBr}, //필요한 데이터
		success: function(result) {
			const reply = result;
			
			replyDateDiv.replaceChildren();
			replyDateDiv.textContent = reply.replyDate;
			
			replyContentDiv.replaceChildren();
			replyContentDiv.innerHTML = reply.replyContent;
			
			formBtn.value = '수정';
			formBtn.setAttribute("onClick", `updateReplyForm("${replyNum}", this)`);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
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
			url: '/community/checkBoardPwAjax', //요청경로
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

//좋아요 버튼
function insertBoardLike(boardNum) {
	//ajax start
	$.ajax({
		url: '/community/insertBoardLikeAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'boardNum' : boardNum}, //필요한 데이터
		success: function(result) {
			//아이콘 변경
			const heartIconSpan = document.querySelector('#heartIcon');
			heartIconSpan.replaceChildren();
			
			let iconStr = '';
			iconStr += `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">`;
			iconStr += `  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>`;
			iconStr += `</svg>`;
			
			heartIconSpan.insertAdjacentHTML('afterbegin', iconStr);
			
			//onclick 변경
			const likeBtn = document.querySelector('#likeBtn');
			likeBtn.setAttribute('onClick', `deleteBoardLike("${boardNum}");`);
			
			//likeCnt 변경
			const likeCntSpan = document.querySelector('#likeCnt');
			likeCntSpan.innerHTML = Number(likeCntSpan.innerHTML) + 1;
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//좋아요 취소
function deleteBoardLike(boardNum) {
	//ajax start
	$.ajax({
		url: '/community/deleteBoardLikeAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'boardNum' : boardNum}, //필요한 데이터
		success: function(result) {
			//아이콘 변경
			const heartIconSpan = document.querySelector('#heartIcon');
			heartIconSpan.replaceChildren();
			
			let iconStr = '';
			iconStr += `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">`;
			iconStr += `  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>`;
			iconStr += `</svg>`;
			heartIconSpan.insertAdjacentHTML('afterbegin', iconStr);
			
			//onclick 변경
			const likeBtn = document.querySelector('#likeBtn');
			likeBtn.setAttribute('onClick', `insertBoardLike("${boardNum}");`);
			
			//likeCnt 변경
			const likeCntSpan = document.querySelector('#likeCnt');
			likeCntSpan.innerHTML = Number(likeCntSpan.innerHTML) - 1;
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//게시글 신고
function reportBoard() {
	const checkedRadio = document.querySelector('input[name=reportReason]:checked');
	if(checkedRadio == null) {
		alert('신고사유를 체크해주세요.');
		return;
	}
	else {
		//ajax start
		$.ajax({
			url: '/community/reportBoardAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: $('#reportForm').serialize(), //필요한 데이터
			success: function(result) {
				
				$('#reportModal').modal('hide');
				alert('신고되었습니다.');
				
				//모달 열기 속성 삭제
				const reportBtn = document.querySelector('#reportBtn');
				reportBtn.removeAttribute('data-bs-toggle');
				reportBtn.removeAttribute('data-bs-target');
				
				//알림 onclick 추가
				reportBtn.setAttribute('onClick', 'reportAlert()');
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}


//이미 신고한 게시글 알림
function reportAlert() {
	alert('이미 신고한 게시물입니다.');
}



