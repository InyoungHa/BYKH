package com.bykh.groupware.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		//헤더 정보
		registry.addInterceptor(getHeaderInterceptor())
				.addPathPatterns("/archive/**")
				.addPathPatterns("/attendance/**")
				.addPathPatterns("/calender/**")
				.addPathPatterns("/community/**")
				.addPathPatterns("/dept/**")
				.addPathPatterns("/emp/**")
				.addPathPatterns("/mro/**")
				.addPathPatterns("/notice/**")
				.addPathPatterns("/resource/**")
				.addPathPatterns("/sign/**")
				.addPathPatterns("/user/**")
				.excludePathPatterns("/user/log")
				.excludePathPatterns("/user/findEPWForm")
				.excludePathPatterns("/**/*Ajax")
				.excludePathPatterns("/**/download");
				//.order()로 순번 지정 가능
	}
	
	
	
	@Bean //객체 -> 리턴되는 데이터를 객체로 생성, 프로젝트 생성시 바로 실행
	HeaderInterceptor getHeaderInterceptor() {
		return new HeaderInterceptor();
	}

	
}
