package com.xiaoqingxin.homeam.handler;

import com.xiaoqingxin.homeam.model.HamUser;
import com.xiaoqingxin.homeam.repository.HamUserRepository;
import org.springframework.binding.message.MessageBuilder;
import org.springframework.binding.message.MessageContext;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.webflow.execution.RequestContext;

/**
 *
 * @author Wu Liangxing
 */
@Component
public class LoginValidator {

    private final HamUserRepository hamUserRepository;

    public LoginValidator(HamUserRepository hamUserRepository) {
        this.hamUserRepository = hamUserRepository;
    }

    public boolean findByUsername(String username) {
        System.out.println("****************进入findByUsername方法*******************");

        if (!StringUtils.hasText(username)) {
            return false;
        }
        HamUser hamUser = hamUserRepository.findByUsername(username);
        if (null == hamUser || !StringUtils.hasText(hamUser.getUsername())) {
            return false;
        } else {
            return true;
        }
    }

    public boolean findByUsernameAndMessageContext(String username, MessageContext messageContext) {
        System.out.println("****************进入findByUsernameAndMessageContext方法*******************");

        if (!StringUtils.hasText(username)) {
            messageContext.addMessage(new MessageBuilder().error()
                    .source("userError")
                    .defaultText("用户名不能为空!")
                    .build());
            return false;
        }

        HamUser hamUser = hamUserRepository.findByUsername(username);

        if (null == hamUser || !StringUtils.hasText(hamUser.getUsername())
                || !username.equals(hamUser.getUsername())) {
            messageContext.addMessage(new MessageBuilder().error()
                    .source("userError")
                    .defaultText("用户不存在!").build());
            return false;
        } else {
            return true;
        }

    }

    public boolean passwordValidator(HamUser hamUser, RequestContext context) {
        System.out.println("****************进入passwordValidator方法*******************");
        if (null == hamUser || !StringUtils.hasText(hamUser.getPassword())) {
            context.getFlowScope().put("passError", "密码不能为空！");
            return false;
        }

        HamUser hamUserValidator = hamUserRepository.findByUsername(hamUser.getUsername());

        if (hamUserValidator.getUsername().equals(hamUser.getUsername())
                && hamUserValidator.getPassword().equals(hamUser.getPassword())) {
            return true;
        } else {
            context.getFlowScope().put("passError", "密码错误！");
            return false;
        }

    }
}
