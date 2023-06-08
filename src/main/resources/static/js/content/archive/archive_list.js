//페이지 이동 + 검색
function movePage(pageNum) {
	const archiveForm = document.querySelector('#archiveForm');
	document.querySelector('#nowPage').value = pageNum;	
	archiveForm.submit();
}