


//정상 글 등록
function regNotice() {
	if(!noticeFormCheck()) {
		return false;
	}
	else {
		//상태값 설정
		const hiddenDiv = document.querySelector('#hiddenDiv');
		
		const statusStr = `<input type="hidden" name="boardStatus" value="${1}">`;
		hiddenDiv.insertAdjacentHTML('beforeend', statusStr);
		
		document.querySelector('#noticeForm').submit();
	}
}


//임시 저장 글 등록
function tempRegNotice() {
	if(!noticeFormCheck()) {
		return false;
	}
	else {
		//상태값 설정
		const hiddenDiv = document.querySelector('#hiddenDiv');
		
		const hasHidden = hiddenDiv.hasChildNodes();
		
		//hiddenDiv에 자식 노드가 없으면(첫 임시저장일 때)
		if(!hasHidden) {
			const statusStr = `<input type="hidden" name="boardStatus" value="${2}">`;
			hiddenDiv.insertAdjacentHTML('afterbegin', statusStr);
			
			//임시저장함 개수 증가
			const tempModalBtn = document.querySelector('#tempModalBtn');
			tempModalBtn.value = Number(tempModalBtn.value)+ 1;
		}
		
		
		//폼 태그
		const formData = new FormData(document.querySelector('#noticeForm'));
		
		//ajax start
		$.ajax({
			url: '/notice/tempRegNotice', //요청경로
			type: 'post',
			async: true,
			data: formData,
		    processData: false,
		    contentType: false,
			success: function(result) {
				const tempBoard = result;
				
				
				//알림 메시지 추가
				const alertDiv = document.querySelector('#alertDiv');
				alertDiv.replaceChildren();
				
				const tempAlertStr = '<div class="alert alert-danger mb-0 py-1 fs-6" role="alert" id="tempAlert">임시저장이 완료되었습니다.</div>';
				alertDiv.insertAdjacentHTML('afterbegin', tempAlertStr);
				
				$("#tempAlert").delay(4000).fadeOut(1000);
				
				
				//글 번호 추가
				if(!hasHidden) {
					const boardNumStr = `<input type="hidden" name="boardNum" value="${tempBoard.boardNum}">`;
					hiddenDiv.insertAdjacentHTML('afterbegin', boardNumStr);
				}
				
				//첨부파일 번호 + onchange 추가 + name값 삭제
				const fileInputs = document.querySelectorAll('#fileInput');
				
				fileInputs.forEach(function(fileInput, index){
					//이미 임시 저장된 파일은 controller로 넘어가지 않도록 name 속성 없애준다.
					//다시 임시 저장했을 때 불러오지 않도록 id 속성도 삭제해줌
					fileInput.removeAttribute('name');
					fileInput.removeAttribute('id');
					
					//data-file-num 속성 추가 (html에서는 fileNum으로 자동 인식)
					fileInput.dataset.fileNum = tempBoard.boardFileList[index].fileNum;
					
					//파일 태그 삭제 버튼 onclick에 deleteFileNum 추가
					const deleteBtn = fileInput.nextElementSibling;
					deleteBtn.setAttribute('onClick', `tempDeleteFileInputDiv(this, "${fileInput.dataset.fileNum}")`);
					
					//사용자가 기존 파일 태그에서 파일 변경할 시
					fileInput.addEventListener('change',function() {
						//다시 name, id 속성 추가
						fileInput.name = 'files';
						fileInput.id = 'fileInput'
						
						//기존 임시저장 파일 삭제 위해서 deleteFileNum 추가
						const hiddenDiv = document.querySelector('#hiddenDiv');
					
						const deleteFileNumStr = `<input type="hidden" name="deleteFileNum" value="${tempBoard.boardFileList[index].fileNum}">`;
						hiddenDiv.insertAdjacentHTML('beforeend', deleteFileNumStr);
						
						//data-file-num 속성 삭제
						fileInput.removeAttribute('data-file-num');
						
						//파일 태그 삭제 버튼 onclick에 deleteFileNum 추가
						deleteBtn.setAttribute('onClick', `deleteFileInputDiv(this)`);
					}, { once: true });
				});
				
				if(hasHidden)  { //그 글에서 계속 임시저장했을 때 삭제한 파일 fileNum은 지우기
					const deleteFileNums = hiddenDiv.querySelectorAll('input[name="deleteFileNum"]');
					if(deleteFileNums.length != 0) {
						for(const deleteFileNum of deleteFileNums) {
							deleteFileNum.remove();
						}
					}
				}
				
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}

//임시저장 파일 태그 삭제
function tempDeleteFileInputDiv(deleteBtn, fileNum) {
	const hiddenDiv = document.querySelector('#hiddenDiv');
					
	const deleteFileNumStr = `<input type="hidden" name="deleteFileNum" value="${fileNum}">`;
	hiddenDiv.insertAdjacentHTML('beforeend', deleteFileNumStr);
	
	const fileInputDiv = deleteBtn.parentElement;
	fileInputDiv.remove();
};



//제목, 내용, 파일 첨부 유효성 체크
function noticeFormCheck() {
	const boardTitle = document.querySelector('#boardTitle').value;
	const boardContent = document.querySelector('#boardContent').value;
	const fileInputList = document.querySelectorAll('#fileInput');
	
	
	if(boardTitle == '' || boardTitle == null) {
		alert('제목을 입력해주세요.')
		return false;
	};
	
	if(boardContent == '' || boardContent == null) {
		alert('내용을 입력해주세요.')
		return false;
	};
	
	if(fileInputList.length != 0) {
		for(const fileInput of fileInputList) {
			if(fileInput.value == '' || fileInput.value == null) {
				alert('파일을 첨부해주세요.');
				return false;
			}
		}
	}
	
	return true;
}

//제목, 내용, 파일 비어있는지 확인
function noticeFormNullCheck() {
	const boardTitle = document.querySelector('#boardTitle').value;
	const boardContent = document.querySelector('#boardContent').value;
	const fileInputList = document.querySelectorAll('#fileInput');
	
	const titleNull = boardTitle == '' || boardTitle == null;
	const contentNull = boardContent == '' || boardContent == null;
	let fileNull = true;
	
	if(fileInputList.length != 0) {
		for(const fileInput of fileInputList) {
			if(fileInput.value == '' || fileInput.value == null) {
				fileNull = true;
			}
			else {
				fileNull = false;
			}
		}
	}
	
	if(titleNull && contentNull && fileNull) {
		return true;
	}
	else {
		return false;
	}
}



//파일 추가 버튼
function addFileInputDiv(buttonTag) {
	const fileTd = buttonTag.parentElement;
	
	let str = '';
	str += `<div class="input-group my-2" id="fileDiv">                                              `;
	str += `	<input class="form-control form-control-sm" type="file" name="files" id="fileInput">                   `;
	str += `	<button class="btn btn-outline-secondary btn-sm" type="button" onclick="deleteFileInputDiv(this);">삭제</button>`;
	str += `</div>                                                                      `;
	
	fileTd.insertAdjacentHTML('beforeend', str);
};

//파일 태그 삭제 버튼
function deleteFileInputDiv(deleteBtn) {
	const fileInputDiv = deleteBtn.parentElement;
	
	fileInputDiv.remove();
};


//임시저장함 버튼
function tempBoardList() {
	//ajax start
	$.ajax({
		url: '/notice/tempBoardList', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {}, //필요한 데이터
		success: function(result) {
			const tempBoardList = result;
			
			const tempModalBody = document.querySelector('#tempModalBody');
			
			tempModalBody.replaceChildren();
			
			let str = '';
			
			const boardNumInput = document.querySelector("input[name='boardNum']");
			let boardNum = null;
			
			if(boardNumInput != null) {
				boardNum = boardNumInput.value;
			}
			
			
			for(const tempBoard of tempBoardList) {
				const currentBoard = boardNum != null && boardNum == tempBoard.boardNum;	
					
				str += `<tr>                                                                                                                                                                                                                `;
				str += `	<td class="text-start">                                                                                                                                                                                         `;
				if(currentBoard) {
				str += `		<a href="javascript:void(0);" onclick="currentBoardAlert();" style="color: black;">${tempBoard.boardTitle}</a>                                                        `;
				}
				else{
				str += `		<a href="javascript:void(0);" onclick="updateTempBoard('${tempBoard.boardNum}');" style="color: black;">${tempBoard.boardTitle}</a>                                                        `;
				}
				str += `	</td>                                                                                                                                                                                                           `;
				str += `	<td class="fs-6 text-secondary">${tempBoard.boardDate}</td>                                                                                                                                                    `;
				str += `	<td>                                                                                                                                                                                        `;
				if(currentBoard) {
				str += `	<span class="fs-6 text-danger">작성중</span>                                                                                                                                                                                        `;
				}
				else{
				str += `		<a href="javascript:void(0);" class="text-danger" onclick="deleteBoard('${tempBoard.boardNum}', this);"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">                                                                                     `;
				str += `		  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>`;
				str += `		</svg></a>                                                                                                                                                                                                    `;
				}
				str += `	</td>                                                                                                                                                                                                           `;
				str += `</tr>                                                                                                                                                                                                               `;
			}
			
			tempModalBody.insertAdjacentHTML('afterbegin', str)
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

function currentBoardAlert() {
	alert('현재 편집 중인 글입니다.');
}


//임시저장함 글 가져오기
function updateTempBoard(boardNum) {
	if(noticeFormNullCheck()) {
		getTempBoard(boardNum);
	}
	else if(confirm('작성 중인 내용을 임시저장하고 선택한 문서를 불러오시겠습니까?')) {
		if(!noticeFormCheck()) {
			return false;
		}
		else {
			//상태값 설정
			const hiddenDiv = document.querySelector('#hiddenDiv');
			
			const hasHidden = hiddenDiv.hasChildNodes();
			
			//hiddenDiv에 자식 노드가 없으면(첫 임시저장일 때)
			if(!hasHidden) {
				const statusStr = `<input type="hidden" name="boardStatus" value="${2}">`;
				hiddenDiv.insertAdjacentHTML('afterbegin', statusStr);
				
				//임시저장함 개수 증가
				const tempModalBtn = document.querySelector('#tempModalBtn');
				tempModalBtn.value = Number(tempModalBtn.value)+ 1;
			}
			
			//폼 태그
			const formData = new FormData(document.querySelector('#noticeForm'));
			
			//ajax start
			$.ajax({
				url: '/notice/tempRegNotice', //요청경로
				type: 'post',
				async: true,
				data: formData,
			    processData: false,
			    contentType: false,
				success: function(result) {
					
					
					getTempBoard(boardNum);
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end
		}
	}
}

//임시저장함 글 조회
function getTempBoard(boardNum) {
	//ajax start
	$.ajax({
		url: '/notice/getTempDetail', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'boardNum' : boardNum}, //필요한 데이터
		success: function(result) {
			const tempBoard = result;
			
			$('#tempRegModal').modal('hide');
			
			document.querySelector('#boardTitle').value = tempBoard.boardTitle;
			document.querySelector('#boardContent').value = tempBoard.boardContent;
			
			const fileDivs = document.querySelectorAll('#fileDiv');
			
			for(const fileDiv of fileDivs) {
				fileDiv.remove();
			}
			
			//hiddenDiv 비우고 boardNum, boardStatus 넣기
			const hiddenDiv = document.querySelector('#hiddenDiv');
			hiddenDiv.replaceChildren();
			
			let tempStr = '';
			tempStr += `<input type="hidden" name="boardNum" value="${tempBoard.boardNum}">`;
			tempStr += `<input type="hidden" name="boardStatus" value="2">     `;
			
			hiddenDiv.insertAdjacentHTML('afterbegin', tempStr);
			
			//파일 처리~~~~~~~~~~~~~~~~!!!!!!
			console.log(tempBoard);
				
			if(tempBoard.boardFileList.length != 0) {
				let fileStr = '';
				for(const file of tempBoard.boardFileList) {
					fileStr += `<div class="mb-1">`;
					fileStr += `<a th:href="@{/notice/download(fileNum=${file.fileNum})}" style="color: black; text-decoration:underline; text-underline-offset : 5px;">`;
					fileStr += `${file.originFileName}</a> (${file.fileSize}) `;
					fileStr += `<button class="btn btn-primary btn-sm" type="button" onclick="deleteAttachedFile('${file.fileNum}', this);">삭제</button></div>`;
				}
				
				const fileTd = document.querySelector('#fileTd');
				fileTd.insertAdjacentHTML('beforeend', fileStr);
				
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//첨부된 파일 삭제 버튼
function deleteAttachedFile(fileNum, attachedFileBtn) {
	if(confirm('해당 파일을 삭제하시겠습니까?')) {
		const hiddenDiv = document.querySelector('#hiddenDiv');
		
		const str = `<input type="hidden" name="deleteFileNum" value="${fileNum}">`;
		hiddenDiv.insertAdjacentHTML('beforeend', str);
	
		const attachedFileDiv = attachedFileBtn.parentElement;
		attachedFileDiv.remove();
	}
};




//글 삭제
function deleteBoard(boardNum, deleteBtn) {
	if(confirm('정말 삭제하시겠습니까?')) {
		//ajax start
		$.ajax({
			url: '/notice/tempDelete', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'boardNum' : boardNum}, //필요한 데이터
			success: function(result) {
				const deletedBoardTr = deleteBtn.parentElement.parentElement;
				
				deletedBoardTr.remove();
				
				//임시저장함 개수 감소
				const tempModalBtn = document.querySelector('#tempModalBtn');
				tempModalBtn.value = Number(tempModalBtn.value) - 1;
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}


