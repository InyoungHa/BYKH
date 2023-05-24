package com.bykh.groupware.util;

import java.util.Calendar;

public class DateUtil {

	//현재날짜시간
	public static String getNowDateToString() {
	    Calendar cal = Calendar.getInstance();
	    int year = cal.get(Calendar.YEAR); // 년도
	    int month = cal.get(Calendar.MONTH) + 1; // 월 (0부터 시작하므로 +1)
	    int date = cal.get(Calendar.DATE); // 일
	    int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK); // 요일 (1부터 일요일)

	    // 요일명으로 변환
	    String dayOfWeekStr;
	    switch (dayOfWeek) {
	        case Calendar.SUNDAY:
	            dayOfWeekStr = "일";
	            break;
	        case Calendar.MONDAY:
	            dayOfWeekStr = "월";
	            break;
	        case Calendar.TUESDAY:
	            dayOfWeekStr = "화";
	            break;
	        case Calendar.WEDNESDAY:
	            dayOfWeekStr = "수";
	            break;
	        case Calendar.THURSDAY:
	            dayOfWeekStr = "목";
	            break;
	        case Calendar.FRIDAY:
	            dayOfWeekStr = "금";
	            break;
	        case Calendar.SATURDAY:
	            dayOfWeekStr = "토";
	            break;
	        default:
	            dayOfWeekStr = "";
	            break;
	    }

	    int hour = cal.get(Calendar.HOUR); // 시간
	    int minute = cal.get(Calendar.MINUTE); // 분

	    // 날짜 및 시간 문자열로 반환
	    return year + "-" + String.format("%02d", month) + "-" + String.format("%02d", date) + " (" + dayOfWeekStr + ")" + " " + String.format("%02d", hour) + ":" + String.format("%02d", minute);
	}

	  
}
