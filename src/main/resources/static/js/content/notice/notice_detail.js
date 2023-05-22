
function deleteBoard(boardNum) {
	if(confirm('정말 삭제하시겠습니까?')) {
		location.href = "/notice/delete?boardNum=" + boardNum;
	}
}















