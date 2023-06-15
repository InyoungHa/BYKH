package com.bykh.groupware.emp.vo;

import java.util.UUID;

public class ImageCodeGenerator {
	public static String generateImgCode() {
        // 이미지 코드 생성 로직을 구현합니다.
        // 예를 들어, 데이터베이스 시퀀스를 활용하거나 고유한 값 생성 알고리즘을 적용할 수 있습니다.
        // 실제 구현은 프로젝트의 요구사항과 환경에 따라 달라질 수 있습니다.
        
        // 여기에 이미지 코드를 생성하는 로직을 작성합니다.
        // 예시로 UUID를 사용한 코드를 작성하겠습니다.
        String imgCode = "IMG_" + UUID.randomUUID().toString();
        
        return imgCode;
    }
}
