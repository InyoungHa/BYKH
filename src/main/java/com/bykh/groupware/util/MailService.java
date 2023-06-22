package com.bykh.groupware.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service("mailService")
public class MailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;
	
	//단순 문자 메일 보내기
	public void sendSimpleEmail(MailVO mailVO) {
		//단순 문자 메일을 보낼 수 있느 객체 생성
		SimpleMailMessage message = new SimpleMailMessage();
		message.setSubject(mailVO.getTitle());
		message.setTo(mailVO.getRecipientList().toArray(new String[mailVO.getRecipientList().size()]));
		message.setText(mailVO.getContent());
		
		javaMailSender.send(message);
	}
	
	
	
	
	//HTML 메일 보내기
	public void sendHTMLEmail() {
		MimeMessage message = javaMailSender.createMimeMessage();
		String password = "111111";
		
		try {
			message.setSubject("임시 제목");
			message.setText(setContext(password), "UTF-8", "html");
			message.addRecipients(MimeMessage.RecipientType.TO, "qhdla1004t@naver.com");
			javaMailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
	}
	
	//6자리의 랜덤 비밀번호 생성
	public String createRandomPw() {
        String[] charSet = new String[]{ //10 -> 9
        		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
               };
        
        String imsiPw = "";
        
        for(int i = 0 ; i < 6 ; i++) {
        	int randIndex = (int)(Math.random() * charSet.length);
        	imsiPw += charSet[randIndex];
        }
        
        return imsiPw;
	}
	
	//HTML 메일 보낼 시 내용 세팅
	public String setContext(String password) {
		Context context = new Context();
		context.setVariable("password", password);
		return templateEngine.process("mail", context);
	}
	
}












