function noticeUpdateCheck() {
	const boardTitle = document.querySelector('#boardTitle').value;
	const boardContent = document.querySelector('#boardContent').value;

	
	if(boardTitle == '' || boardTitle == null) {
		alert('제목을 입력해주세요.')
		return false;
	};
	
	if(boardContent == '' || boardContent == null) {
		alert('내용을 입력해주세요.')
		return false;
	};
	
	document.querySelector('#noticeUpdateForm').submit();
}