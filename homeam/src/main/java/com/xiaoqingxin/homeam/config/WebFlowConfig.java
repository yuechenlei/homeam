package com.xiaoqingxin.homeam.config;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.webflow.config.AbstractFlowConfiguration;
import org.springframework.webflow.definition.registry.FlowDefinitionRegistry;
import org.springframework.webflow.engine.builder.support.FlowBuilderServices;
import org.springframework.webflow.executor.FlowExecutor;
import org.springframework.webflow.mvc.builder.MvcViewFactoryCreator;
import org.springframework.webflow.mvc.servlet.FlowHandlerAdapter;
import org.springframework.webflow.mvc.servlet.FlowHandlerMapping;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.webflow.view.AjaxThymeleafViewResolver;
import org.thymeleaf.spring6.webflow.view.FlowAjaxThymeleafView;

/**
 *
 * @author Wu Liangxing
 */
@Configuration
public class WebFlowConfig extends AbstractFlowConfiguration{
    @Autowired
	private LocalValidatorFactoryBean localValidatorFacotryBean;
//	@Autowired
//	ClassLoaderTemplateResolver templateResolver;
	@Autowired
	SpringTemplateEngine templateEngine;

	
	
	@Bean
	public FlowDefinitionRegistry flowRegistry() {
	    return getFlowDefinitionRegistryBuilder(flowBuilderServices())
	    		.setBasePath("classpath:flows")
	            .addFlowLocationPattern("/**/*-flow.xml")
	            .build();
	}
	
	
	@Bean
	public FlowExecutor flowExecutor() {
	    return getFlowExecutorBuilder(this.flowRegistry())
	            .setMaxFlowExecutions(5)
	            .setMaxFlowExecutionSnapshots(10)
	            .build();
	}
	
	@Bean
	public FlowHandlerAdapter flowHandlerAdapter(FlowExecutor flowExecutor) {
		FlowHandlerAdapter flowHandlerAdapter = new FlowHandlerAdapter();
		flowHandlerAdapter.setFlowExecutor(flowExecutor);
		return flowHandlerAdapter;
		
	}
	
	@Bean
	public FlowHandlerMapping flowHandlerMapping(FlowDefinitionRegistry flowDefinitionRegistry) {
		FlowHandlerMapping flowHandlerMapping = new FlowHandlerMapping();
		flowHandlerMapping.setFlowRegistry(flowDefinitionRegistry);
		flowHandlerMapping.setOrder(0);
		return flowHandlerMapping;
	}
	
	
	@Bean
	public FlowBuilderServices flowBuilderServices() {
	    return getFlowBuilderServicesBuilder()
	    		.setViewFactoryCreator(mvcViewFactoryCreator())
	    		.setValidator(localValidatorFacotryBean)
				//.setDevelopmentMode(true)
	    		.build();
	}
	
	
	@Bean
	public MvcViewFactoryCreator mvcViewFactoryCreator() {
		MvcViewFactoryCreator factoryCreator = new MvcViewFactoryCreator();
		factoryCreator.setViewResolvers(Collections.singletonList(this.thymeleafViewResolver()));
		factoryCreator.setUseSpringBeanBinding(true);
		return factoryCreator;
	}
	
	
	@Bean
	@Description("Thymeleaf AJAX view resolver for Spring WebFlow")
	public AjaxThymeleafViewResolver thymeleafViewResolver() {
		AjaxThymeleafViewResolver viewResolver = new AjaxThymeleafViewResolver();
		viewResolver.setViewClass(FlowAjaxThymeleafView.class);
		viewResolver.setTemplateEngine(templateEngine);
		viewResolver.setCharacterEncoding("UTF-8");
		return viewResolver;
	}
	

	
//	@Bean
//	@Description("Thymeleaf template engine with Spring integration")
//	public SpringTemplateEngine templateEngine() {
//		SpringTemplateEngine templateEngine = new SpringTemplateEngine();
//		templateEngine.setTemplateResolver(templateResolver);
//		return templateEngine;
//	}
	
	
//	@Bean
//	@Description("Thymeleaf template resolver serving HTML 5")
//	public ClassLoaderTemplateResolver templateResolver() {
//		ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
//		templateResolver.setPrefix("templates/");
//		templateResolver.setCacheable(false);
//		templateResolver.setSuffix(".html");
//		templateResolver.setTemplateMode("HTML5");
//		templateResolver.setCharacterEncoding("UTF-8");
//		return templateResolver;
//	}
	
//	@Bean
//	public LocalValidatorFactoryBean validator() {
//		return new LocalValidatorFactoryBean();
//	}
	
        
}
