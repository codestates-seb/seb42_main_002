package com.mainproject.back.security.oauth;

import com.mainproject.back.security.jwt.JwtTokenizer;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenizer jwtTokenizer;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    log.info("OAuth2 Login 성공!");
    try {
      CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

      String accessToken = delegateAccessToken(oAuth2User);
      String refreshToken = delegateRefreshToken(oAuth2User);

      response.setHeader("Authorization", "Bearer " + accessToken);
      response.setHeader("Refresh", refreshToken);
      response.addHeader("Access-Control-Expose-Headers", "Authorization, Refresh");
      URI redirectURI = createURI(accessToken, refreshToken);
      log.info("## {} 리다이렉트", redirectURI);
      getRedirectStrategy().sendRedirect(request, response, redirectURI.toString());

    } catch (Exception e) {
      throw e;
    }
  }

  private URI createURI(String accessToken, String refreshToken) {
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("access", accessToken);
    params.add("refresh", refreshToken);
    return UriComponentsBuilder
        .newInstance()
        .path("http://localhost:3000")
        .queryParams(params)
        .build().toUri();
  }

  private String delegateAccessToken(CustomOAuth2User oAuth2User) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("username", oAuth2User.getEmail());
    claims.put("roles", oAuth2User.getRoles());

    String subject = oAuth2User.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
        base64EncodedSecretKey);

    return accessToken;
  }

  private String delegateRefreshToken(CustomOAuth2User oAuth2User) {
    String subject = oAuth2User.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
        base64EncodedSecretKey);

    return refreshToken;
  }
}
