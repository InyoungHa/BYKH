package com.bykh.groupware.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception{
		security.csrf().disable()
		   .authorizeHttpRequests()
		   //.requestMatchers("/admin/**").hasRole("ADMIN")
		 //  .requestMatchers("/admin/**").hasAnyRole("ADMIN", "MANAGER")
		   .anyRequest().authenticated()
	.and()
			.formLogin()
			.loginPage("/")
			.usernameParameter("empno")
			.passwordParameter("epw")
			.loginProcessingUrl("/admin/login")
			.defaultSuccessUrl("/admin/main")
			.failureUrl("/")
	//		.successHandler(getSuccessHandler())
	//		.failureHandler(getFailureHandler())
			.permitAll() //로그인
	.and()
			.logout()
			.logoutUrl("/member/logout")
			.invalidateHttpSession(true)
			.logoutSuccessUrl("/"); // 로그아웃
	//.and()
	//		.exceptionHandling()  				// 예외 다르는 방법
	//		.accessDeniedPage("/accessDeny");   // 예외를 연결하는 경로_> IndexController
	//		.accessDeniedHandler(null) //Handler이용해서 미인가시 다루기

		

return security.build();
		
		
	}
	
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**","/css/**" , "/upload/**");
    }
	
	@Bean//비번 암호화 객체 생성
	public PasswordEncoder getPasswordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
}
