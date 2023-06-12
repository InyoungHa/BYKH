
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
		url: '/reply/regReply', //요청경로
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
			str += `		<img src="/upload/empImg/default.png" width="100%" class="mx-0 rounded-circle border">`;
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
			url: '/reply/delete', //요청경로
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
		url: '/reply/update', //요청경로
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










