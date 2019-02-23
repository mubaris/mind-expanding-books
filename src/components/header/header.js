import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import posed from 'react-pose';
import { Container } from './header.css';
import Title from 'components/title';
// import Nav from 'components/header/nav';

// Example of a component-specific page transition
const AnimatedContainer = posed.div({
  enter: {
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100%',
    transition: {
      ease: 'easeInOut',
    },
  },
});

const booksEmoji = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/155/books_1f4da.png';

const Header = () => (
  <AnimatedContainer>
    <Container>
      <Link to="/">
        <Title as="h1"><img height="64px" width="64px" src={booksEmoji} alt="Mind Expanding Books" /></Title>
      </Link>

      {/* <Nav /> */}
    </Container>
  </AnimatedContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
