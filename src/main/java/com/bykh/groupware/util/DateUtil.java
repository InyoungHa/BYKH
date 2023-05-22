package com.bykh.groupware.util;

import java.util.Calendar;

public class DateUtil {
	//오늘 날짜를 문자열로 리턴
	//객체를 생성하지 않고 객체명.변수명으로 바로 접근할 수 있도록 static으로 생성
	public static String getNowDateToString() {
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);//년 2023
		int month = cal.get(Calendar.MONTH) + 1;//월 3+1
		int date = cal.get(Calendar.DATE);//일 12
		
		//2023-4-12
		//type이 date인 input태그의 value에는 무조건 yyyy-mm-dd 형식으로 들어와야 한다.(4글자-2글자-2글자)
		//String.format (맞출 형식, 사용할 데이터)
		//%02d : 형식을 정수 2자리로 맞추고, 자리수가 부족할 경우 0으로 채운다.
		return year + "-" + String.format("%02d", month) + "-" + String.format("%02d", date);
	}; 
}
