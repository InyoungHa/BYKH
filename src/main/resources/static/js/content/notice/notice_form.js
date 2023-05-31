


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
				
				console.log(tempBoard);
				
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
						
						//data-file-num 속성 삭제 (안해도 상관 없지만..)
						fileInput.removeAttribute('data-file-num');
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



//파일 추가 버튼
function addFileInputDiv(buttonTag) {
	const fileTd = buttonTag.parentElement;
	
	let str = '';
	str += `<div class="input-group my-2">                                              `;
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



