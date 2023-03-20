package com.mainproject.back.security.config;

import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.security.filter.JwtAuthenticationFilter;
import com.mainproject.back.security.filter.JwtVerificationFilter;
import com.mainproject.back.security.handler.MemberAccessDeniedHandler;
import com.mainproject.back.security.handler.MemberAuthenticationEntryPoint;
import com.mainproject.back.security.handler.MemberAuthenticationFailureHandler;
import com.mainproject.back.security.handler.MemberAuthenticationSuccessHandler;
import com.mainproject.back.security.jwt.JwtTokenizer;
import com.mainproject.back.security.utils.AuthorityUtils;
import com.mainproject.oauth.CustomOAuth2UserService;
import com.mainproject.oauth.OAuth2LoginFailureHandler;
import com.mainproject.oauth.OAuth2LoginSuccessHandler;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final AuthorityUtils authorityUtils;
  private final JwtTokenizer jwtTokenizer;
  private final MemberRepository memberRepository;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .headers().frameOptions().sameOrigin() // (1)
        .and()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .cors().configurationSource(corsConfigurationSource())
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
        )
        .oauth2Login()
        .successHandler(new OAuth2LoginSuccessHandler(jwtTokenizer))
        .failureHandler(new OAuth2LoginFailureHandler())
        .userInfoEndpoint().userService(new CustomOAuth2UserService(memberRepository));

    return http.build();
  }

  public class CustomFilterConfigurer extends
      AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

    @Override
    public void configure(HttpSecurity builder) throws Exception {

      AuthenticationManager authenticationManager = builder.getSharedObject(
          AuthenticationManager.class);

      JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(
          authenticationManager, jwtTokenizer);
      jwtAuthenticationFilter.setFilterProcessesUrl("/login");
      jwtAuthenticationFilter.setAuthenticationSuccessHandler(
          new MemberAuthenticationSuccessHandler());  // (3) 추가
      jwtAuthenticationFilter.setAuthenticationFailureHandler(
          new MemberAuthenticationFailureHandler());

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

  @Bean
  CorsConfigurationSource corsConfigurationSource() {

    // CORS 설정에 대한 객체.
    CorsConfiguration configuration = new CorsConfiguration();

    // 1. 브라우저가 허용하는 출처 (request를 보내는 입장의 주소)에 대한 설정.
    configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
    // 2. 이거는 1번과 동일한 역할을 함.
//        configuration.setAllowedOrigins(Arrays.asList("*"));
    // 3. 여기에는 pre-flight를 위해 OPTIONS을 추가.
    configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PATCH", "DELETE", "OPTIONS"));

    // BE 정하는 규칙.(Arrays.asList) "Authrorization",
    // 4. request에 어떤 헤더값을 우리(BE)가 응답에 넣어서 보내줄지 ex) 회원가입하면 JWT auth를 넣어주듯.
    configuration.setExposedHeaders(Arrays.asList("Authorization", "Location"));
    // 5. request에 어떤 헤더값을 받아들이는데 성공할지
    configuration.setAllowedHeaders(Arrays.asList("*"));

    // 6. 프론트에서 로그인 인증이나 인증이 필요한 요청에는
    // withCrednetial라고 FE 에서하는게 있는데 거기에 대한 결과가 true여야지만 CORS 통과하도록 설정.
    // FE에 혹시 withCredential 설정은 어떻게 했는지 물어보고 안만들었다 하면 false로 해야함
    // 단 true일 경우에는 #1. allowedOriginPatterns()에는 * 를 사용할 수 없음.
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    // 위에서 정한 configuration의 CORS 정책을 적용하고 싶은 URL
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}