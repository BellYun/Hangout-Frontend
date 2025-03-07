import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterLayout>
      HANGOUT © 2023 ALL RIGHTS RESERVED.
      <br />
    </FooterLayout>
  );
};

export default Footer;

const FooterLayout = styled.div`
  width: 100%;
  height: 50px;
  font-family: Pretendard-Regular;
  font-size: small;
  padding: 7rem;
  border-top: 1px solid #bcbcbc;
  margin-bottom: 4rem;
  margin-top: 5rem;
`;
