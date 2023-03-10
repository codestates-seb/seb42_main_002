package com.mainproject.back.security.config;

import com.mainproject.back.security.filter.JwtAuthenticationFilter;
import com.mainproject.back.security.filter.JwtVerificationFilter;
import com.mainproject.back.security.handler.MemberAccessDeniedHandler;
import com.mainproject.back.security.handler.MemberAuthenticationEntryPoint;
import com.mainproject.back.security.handler.MemberAuthenticationFailureHandler;
import com.mainproject.back.security.handler.MemberAuthenticationSuccessHandler;
import com.mainproject.back.security.jwt.JwtTokenizer;
import com.mainproject.back.security.utils.AuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

  private final AuthorityUtils authorityUtils;
  private final JwtTokenizer jwtTokenizer;

  public SecurityConfiguration(AuthorityUtils authorityUtils, JwtTokenizer jwtTokenizer) {
    this.authorityUtils = authorityUtils;
    this.jwtTokenizer = jwtTokenizer;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .headers().frameOptions().sameOrigin() // (1)
        .and()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .formLogin().disable()
        .httpBasic().disable()
        .exceptionHandling()
        .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // (1) 추가
        .accessDeniedHandler(new MemberAccessDeniedHandler())
        .and()
        .apply(new CustomFilterConfigurer())
        .and()
        .authorizeHttpRequests(authorize -> authorize
            .antMatchers("/*").permitAll()
//            .antMatchers(HttpMethod.POST, "⁄members").permitAll()
//            .antMatchers("/bans").hasAnyRole("USER","ADMIN")
//            .antMatchers("/members/*").hasAnyRole("USER","ADMIN")
//            .antMatchers("/letters/*").hasAnyRole("USER","ADMIN")
//            .antMatchers("/vocabs/*").hasAnyRole("USER","ADMIN")
//            .antMatchers("/blocks/*").hasAnyRole("USER","ADMIN")
//            .antMatchers("/follows/*").hasAnyRole("USER","ADMIN")
        );
    return http.build();
  }

  public class CustomFilterConfigurer extends
      AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
    @Override
    public void configure(HttpSecurity builder) throws Exception {

      AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

      JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
      jwtAuthenticationFilter.setFilterProcessesUrl("/login");
      jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
      jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

      JwtVerificationFilter jwtVerificationFilter =
          new JwtVerificationFilter(jwtTokenizer, authorityUtils);

      builder.addFilter(jwtAuthenticationFilter)
       .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
    }
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }
}