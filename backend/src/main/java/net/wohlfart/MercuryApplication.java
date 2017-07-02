package net.wohlfart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.CompositeFilter;

import javax.servlet.Filter;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableOAuth2Client
@RestController
public class MercuryApplication extends WebSecurityConfigurerAdapter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired  // from EnableOAuth2Client
	OAuth2ClientContext oauth2ClientContext;


	public static void main(String[] args) {
		System.setProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME, "dev");
		SpringApplication.run(MercuryApplication.class, args);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				// angular resources
				.antMatchers(HttpMethod.GET, "/**/*.js").permitAll()
				// rest resources
				.antMatchers("/data/**", "/data/user").permitAll()
				// initial page
				.antMatchers("/index.html","/").permitAll()
				// logged in only by default
				.anyRequest().authenticated()
				// see: https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii
				// X-XSRF-TOKEN
				.and().addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
				.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.and().addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class)
		;
	}


	private Filter ssoFilter() {
		logger.info("<ssoFilter>");

		CompositeFilter filter = new CompositeFilter();
		List<Filter> filters = new ArrayList<>();

		OAuth2ClientAuthenticationProcessingFilter facebookFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/facebook");
		OAuth2RestTemplate facebookTemplate = new OAuth2RestTemplate(facebook(), oauth2ClientContext);
		facebookFilter.setRestTemplate(facebookTemplate);
		UserInfoTokenServices tokenServices = new UserInfoTokenServices(facebookResource().getUserInfoUri(), facebook().getClientId());
		tokenServices.setRestTemplate(facebookTemplate);
		facebookFilter.setTokenServices(tokenServices);
		filters.add(facebookFilter);

		OAuth2ClientAuthenticationProcessingFilter githubFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/github");
		OAuth2RestTemplate githubTemplate = new OAuth2RestTemplate(github(), oauth2ClientContext);
		githubFilter.setRestTemplate(githubTemplate);
		tokenServices = new UserInfoTokenServices(githubResource().getUserInfoUri(), github().getClientId());
		tokenServices.setRestTemplate(githubTemplate);
		githubFilter.setTokenServices(tokenServices);
		filters.add(githubFilter);

		filter.setFilters(filters);
		return filter;

	}

	@Bean
	public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
		logger.info("<oauth2ClientFilterRegistration>");
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(filter);
		registration.setOrder(-100);
		return registration;
	}

	@Bean
	@ConfigurationProperties("facebook.client")
	public AuthorizationCodeResourceDetails facebook() {
		logger.info("<facebook>");
		return new AuthorizationCodeResourceDetails();
	}

	@Bean
	@ConfigurationProperties("facebook.resource")
	public ResourceServerProperties facebookResource() {
		logger.info("<facebookResource>");
		return new ResourceServerProperties();
	}

	@Bean
	@ConfigurationProperties("github.client")
	public AuthorizationCodeResourceDetails github() {
		return new AuthorizationCodeResourceDetails();
	}

	@Bean
	@ConfigurationProperties("github.resource")
	public ResourceServerProperties githubResource() {
		return new ResourceServerProperties();
	}
}
