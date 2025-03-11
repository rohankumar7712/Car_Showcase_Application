import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 0 0 0;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 20px;
  min-width: 250px;
`;

const FooterTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  text-transform: uppercase;
`;

const FooterText = styled.p`
  line-height: 1.6;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0058db;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ContactInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid white;
  border-radius: 5px;
`;

const ContactTextarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid white;
  border-radius: 5px;
`;

const ContactButton = styled.button`
  padding: 10px;
  background-color: #0058db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0097a7;
  }
`;

const FooterBottom = styled.div`
  background-color: #111;
  padding: 20px 0;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterText>
            Car Showcase is a platform to explore the best cars for every
            enthusiast. From classic to modern, our goal is to help you discover
            your perfect ride
          </FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#about">About Us</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#contact">Contact</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#terms">Terms of Service</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactForm>
            <ContactInput
              type="email"
              placeholder="Your email address"
              required
            />
            <ContactTextarea placeholder="Your message" required />
            <ContactButton type="submit">Send</ContactButton>
          </ContactForm>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <p>&copy; 2025 Car Showcase. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
