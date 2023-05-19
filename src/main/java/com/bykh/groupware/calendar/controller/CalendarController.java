package com.bykh.groupware.calendar.controller;



import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.calendar.vo.CalendarVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
    @Resource(name = "calendarService")
    private CalendarService calendarService;

    @ResponseBody
    @PostMapping("/calendarSave")
    public Map<Object, Object> calendarSaveAjax(@RequestBody CalendarVO[] calendarVOs) throws Exception {
        Map<Object, Object> map = new HashMap<>();
        for (CalendarVO calendarVO : calendarVOs) {
            calendarService.insertSchedule(calendarVO);
        }
        return map;
    }

}

		

