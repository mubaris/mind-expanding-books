import styled from 'styled-components';
// import Img from 'gatsby-image';
// import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 800px) {
    /* transform: translate3d(0px, 0px, 0px) scale(0.5) !important; */
  }
`;

export const Box = styled.div`
  height: 250px;
  width: 500px;
  border-radius: 12px;
  background:linear-gradient(135deg, #7c8beb 0%,#4e6ffb 100%);
  display: flex;
  flex-direction: row;
  padding: 20px !important;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  box-shadow: 3px 3px 24px 0px rgba(255,255,255,0.2);
  align-items: center;
  margin: 25px !important;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px !important;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

export const Button = styled.button`
  border-radius: 100px;
  color: #7c8beb;
  background: #ffffff;
  border: 2px solid #ffffff;
  margin: 0 18px 0 0 !important;
  padding: 6px 12px !important;
  cursor: pointer;
`;

export const Anchor = styled.a`
  text-decoration: none;
  display: flex;
  color: #7c8beb;
`;

export const Image = styled.img`
  height: 210px;
  width: 140px;
  border-radius: 16px;
  align-self: center;
  margin: 10px 20px 10px 10px !important;
`;

// export const Image = styled(Img)`
//   height: 210px;
//   width: 140px;
//   border-radius: 16px;
//   align-self: center;
//   margin: 10px 20px 10px 10px !important;
// `;

export const Title = styled.h3`
  font-weight: bold;
  margin: 5px 0;
  font-size: 125%;
`;

export const Author = styled.p`
  color: #cbcbf8;
  /* margin-top: -10px !important; */
  margin: 5px 0;
`;

export const Rating = styled.p`
  color: #edba3a;
  /* margin-top: -10px !important; */
  margin: 5px 0;
  font-weight: bold;
  font-size: 16px;
`;

export const Search = styled.input`
  font-size: 17px;
  font-weight: 400;
  padding-left: 32px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 4px;
  border-width: 0px;
  padding: 8px 20px 8px 32px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchIcon = styled.svg`
  margin-right: 4px;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translate(0px, -50%);
`;

export const SearchGroup = styled.div`
  position: relative;
  color: rgb(82, 95, 127);
  cursor: initial;
  margin-right: 8px;
`;

