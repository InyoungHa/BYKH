package com.bykh.groupware.attendance.vo;

public class PageVO {
	private int nowPage; //현재 선택된 페이지 번호
	private int totalDataCnt; //전체 데이터 수
	private int beginPage; //화면에 보이는 첫번쨰 페이지 번호
	private int endPage; // 화면에 보이는 마지막 페이지 번호
	private int displayCnt; //한 페이지에 보여지는 게시글 수
	private int displyPageCnt; //한 번에 보여지는 페이지 수
	private boolean prev;  //'이전' 버튼의 유무
	private boolean next;  //'다음' 버튼의 유무
	private int startNum; //시작 ROW_NUM
	private int endNum; //마지막 ROW_NUM
	
	
	
	public PageVO() {
		nowPage = 1;
		displayCnt = 5;
		displyPageCnt = 5;
	}
	
	//이 메소드가 실행되면 page처리를 위한 모든 변수 값을 세팅
	public void setPasgeInfo() {
		//마지막에 보이는 페이지 번호
		endPage = displyPageCnt * (int)Math.ceil(nowPage / (double)displyPageCnt); //displayPageCnt, nowPage
		//처음에 보이는 페이지 번호
		beginPage = endPage - displayCnt + 1;
		//전체 페이지 수
		int totalPageCnt = (int)Math.ceil(totalDataCnt / (double)displayCnt);
		
		//next 버튼 유무
		if(endPage < totalPageCnt) {
			next = true;
		}
		else {
			next = false;
			endPage = totalPageCnt;
		}
		
		//prev 버튼 유무
		prev = beginPage == 1 ? false : true;
		
		//검색 시작과 마지막 ROW_NUM
		startNum = (nowPage - 1) * displayCnt + 1;
		endNum = nowPage * displayCnt;
	}

	public int getNowPage() {
		return nowPage;
	}

	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}

	public int getTotalDataCnt() {
		return totalDataCnt;
	}

	public void setTotalDataCnt(int totalDataCnt) {
		this.totalDataCnt = totalDataCnt;
	}

	public int getBeginPage() {
		return beginPage;
	}

	public void setBeginPage(int beginPage) {
		this.beginPage = beginPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getDisplayCnt() {
		return displayCnt;
	}

	public void setDisplayCnt(int displayCnt) {
		this.displayCnt = displayCnt;
	}

	public int getDisplyPageCnt() {
		return displyPageCnt;
	}

	public void setDisplyPageCnt(int displyPageCnt) {
		this.displyPageCnt = displyPageCnt;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public int getStartNum() {
		return startNum;
	}

	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}

	public int getEndNUm() {
		return endNum;
	}

	public void setEndNUm(int endNUm) {
		this.endNum = endNUm;
	}


}
