


//정상 글 등록
function regNotice() {
	const boardStatus = document.querySelector('#boardStatus');
	boardStatus.value = 1;
	
	if(!noticeFormCheck()) {
		return false;
	}
	else {
		document.querySelector('#noticeForm').submit();
	}
}


//임시 저장 글 등록
function tempRegNotice() {
	const boardStatus = document.querySelector('#boardStatus');
	boardStatus.value = 2;
	
	if(!noticeFormCheck()) {
		return false;
	}
	else {
		
	}
}


//제목, 내용, 파일 첨부 유효성 체크 + 글 등록
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
	fileTd = buttonTag.parentElement;
	
	let str = '';
	str += `<div class="input-group my-2">                                              `;
	str += `	<input class="form-control form-control-sm" type="file" name="files" id="fileInput">                   `;
	str += `	<button class="btn btn-outline-secondary btn-sm" type="button" onclick="deleteFileInputDiv(this);">삭제</button>`;
	str += `</div>                                                                      `;
	
	fileTd.insertAdjacentHTML('beforeend', str);
};

//파일 태그 삭제 버튼
function deleteFileInputDiv(deleteBtn) {
	fileInputDiv = deleteBtn.parentElement;
	
	fileInputDiv.remove();
};



