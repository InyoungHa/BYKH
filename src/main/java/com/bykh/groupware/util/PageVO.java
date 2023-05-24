package com.bykh.groupware.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PageVO {
	private int nowPage; // 현재 선택된 페이지 번호
	private int totalDataCnt; // 전체 데이터 수
	private int beginPage; // 화면에 보이는 첫번째 페이지 번호 
	private int endPage; // 화면에 보이는 마지막 페이지 번호
	private int displayCnt; // 한 페이지에 보여지는 게시글 수
	private int displayPageCnt; // 한 번에 보여지는 페이지 수
	private boolean prev; // '이전' 버튼의 유무 - 1번 페이지 앞에는 이전 버튼 없도록
	private boolean next; // '다음' 버튼의 유무 - 마지막 페이지 뒤에는 다음 버튼이 없도록
	private int offsetCnt; // 건너뛸 개수
	
	
	
	//이전 1 2 3 4 5 다음
	//이전 6 7 8 9 10 다음
	//이전 11 12 13 14 15 다음
	//-> 첫 번째 페이지가 1, 6,11 (beginPage)
	// -> 마지막 페이지가 5,10,15.... (endPage)
	// displayPageCnt :  5 라면 이전 1 2 3 4 5 다음 / 10이라면 이전 1 2 3 4 5 6 7 8 9 10 다음
	// startNum~ endNum까지 시작~마지막으로 ROWNUM을 WHERE 절 조건에 넣어줌
	
	
	//기본 생성자 선언
	public PageVO() {
		this(5, 3);
		nowPage = 1; // 생성과 동시에 첫 페이지는 1 / 현재페이지
	}
	
	//게시판용 생성자
	public PageVO(int displayCnt, int displayPageCnt) {
		nowPage = 1;
		this.displayCnt = displayCnt; // 한 페이지에 보여줄 개수
		this.displayPageCnt = displayPageCnt; // 한 번에 보여지는 페이지 수
	}
	
	//이 메서드가 실행되면 page 처리를 위한 모든 변수 값을 세팅
	public void setPageInfo() {
		//마지막에 보이는 페이지 번호 - displayPageCnt 개수에 따라/ nowPage 현재페이지
		//Math.random() - java에서 사용하는 수학 함수
		//Math.ceil() - 올림
		endPage = displayPageCnt * (int) Math.ceil(nowPage / (double)displayPageCnt);
		
		
		//처음에 보이는 페이지 번호
		beginPage = endPage - displayPageCnt + 1;
		
		
		//전체 페이지수
		// 전체데이터 / 한번에 보여지는 페이지 수 -> 올림
		// 155 / (실수)10 ~> 올림
		// totalPageCnt 자료형이 int라 형 일치 시키기
		int totalPageCnt = (int) Math.ceil(totalDataCnt / (double)displayCnt);
		
		
		//next 버튼 유무
		//endPage가 totalDataCnt보다 작으면  true 다음버튼 생성
		// 아니면 false -> 다음 버튼 없애고 마지막 페이지까지만 표현한다
		if(endPage < totalPageCnt) {
			next = true;
		}
		else {
			next = false;
			endPage = totalPageCnt;
		}

		
		//prev 버튼 유무 (이전 버튼)
		//begin 페이지가 1일 때를 제외하고 prev 버튼 생성
		// 삼항연산자 : prev가 1이면 버튼 생성 안함 : 1이 아니면 버튼 생성
		prev = beginPage == 1 ? false : true;
		
		//조회된 페이지 수가 0 일때 endPage를 1로 설정
		if(totalPageCnt == 0) {
			endPage = 1;
		}
		
		
		//현재 페이지-1 * 한 페이지에 몇 개씩 출력할 지 설정해 offsetCnt를 찾아낸다.
		offsetCnt = (nowPage - 1) * displayCnt;
		
		
		
	}
}
