package com.mainproject.back.security.userdetails;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.security.utils.AuthorityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService {

  private final MemberRepository memberRepository;
  private final AuthorityUtils authorityUtils;

  public MemberDetailsService(
      MemberRepository memberRepository, AuthorityUtils authorityUtils) {
    this.memberRepository = memberRepository;
    this.authorityUtils = authorityUtils;
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Member> optionalMember = memberRepository.findByEmail(username);
    Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(
        MemberExceptionCode.MEMBER_NOT_FOUND));

    return new MyUserDetails(findMember);
  }

  public final class MyUserDetails extends Member implements UserDetails {

    MyUserDetails(Member member) {
      setMemberId(member.getMemberId());
      setName(member.getName());
      setEmail(member.getEmail());
      setPassword(member.getPassword());
      setIntroduce(member.getIntroduce());
      setBirthday(member.getBirthday());
      setGender(member.getGender());
      setLocation(member.getLocation());
      setRoles(member.getRoles());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return authorityUtils.createAuthorities(getRoles());
    }

    @Override
    public String getUsername() {
      return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
      return true;
    }

    @Override
    public boolean isAccountNonLocked() {
      return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }

    @Override
    public boolean isEnabled() {
      return true;
    }
  }
}
