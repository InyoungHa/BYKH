package com.bykh.groupware.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class RandomUtil {
	
	//사번 자동 생성 202301
	//현재 날짜 가져오기
	LocalDate currentDate = LocalDate.now();
	
	//날짜를 원하는 형식으로 포멧
	String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy"));
	
	//마지막 2자리 랜덤 숫자 생성
	Random random = new Random();
	
	String randomDigits = String.format("%02d", random.nextInt(100));
	
	//식별 번호 생성
	String identifier = formattedDate + randomDigits;
}
