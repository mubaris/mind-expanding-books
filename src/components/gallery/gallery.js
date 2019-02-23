import React from 'react';
import PropTypes from 'prop-types';
import { FaGoodreads, FaAmazon } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import * as JsSearch from 'js-search';
// import Item from 'components/gallery/item';
// import Img from 'gatsby-image';
import {
  Container,
  Box,
  Image,
  Details,
  Title,
  Author,
  Rating,
  ButtonGroup,
  Button,
  Anchor,
  Search,
  SearchContainer,
  SearchIcon,
  SearchGroup
} from './gallery.css';

const star = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDEyNi43MjkgMTI2LjczIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMjYuNzI5IDEyNi43MzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik0xMjEuMjE1LDQ0LjIxMmwtMzQuODk5LTMuM2MtMi4yLTAuMi00LjEwMS0xLjYtNS0zLjdsLTEyLjUtMzAuM2MtMi01LTkuMTAxLTUtMTEuMTAxLDBsLTEyLjQsMzAuMyAgIGMtMC44LDIuMS0yLjgsMy41LTUsMy43bC0zNC45LDMuM2MtNS4yLDAuNS03LjMsNy0zLjQsMTAuNWwyNi4zLDIzLjFjMS43LDEuNSwyLjQsMy43LDEuOSw1LjlsLTcuOSwzMi4zOTkgICBjLTEuMiw1LjEwMSw0LjMsOS4zLDguOSw2LjYwMWwyOS4xLTE3LjEwMWMxLjktMS4xLDQuMi0xLjEsNi4xLDBsMjkuMTAxLDE3LjEwMWM0LjYsMi42OTksMTAuMS0xLjQsOC44OTktNi42MDFsLTcuOC0zMi4zOTkgICBjLTAuNS0yLjIsMC4yLTQuNCwxLjktNS45bDI2LjMtMjMuMUMxMjguNjE1LDUxLjIxMiwxMjYuNDE1LDQ0LjcxMiwxMjEuMjE1LDQ0LjIxMnoiIGZpbGw9IiNlZGJhM2EiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: shuffle(this.props.items),
      search: []
    }
    this.doSearch = debounce(this.doSearch, 300);
  }
  componentDidMount() {
    this.rebuildIndex()
  }
  onChange = ({ target: { value } }) => {
    console.log('Pre ', value);
    this.doSearch(value);
  };
  doSearch = (value) => {
    console.log('Search term ', value);
    if (value) {
      const { search } = this.state;
      const queryResult = search.search(value);
      this.setState({ items: queryResult });
    } else {
      this.setState({ items: shuffle(this.props.items) })
    }
  }
  rebuildIndex = () => {
    const { items } = this.state;
    const dataToSearch = new JsSearch.Search(["node", "data", "Name"]);
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    dataToSearch.addIndex(["node", "data", "Name"]);
    dataToSearch.addIndex(["node", "data", "Authors"]);
    dataToSearch.addIndex(["node", "data", "Description"]);

    dataToSearch.addDocuments(items);
    // console.log('dataToSearch ', dataToSearch);
    this.setState({ search: dataToSearch });
  }
  render() {
    return (
    <div>
      <SearchContainer>
        <SearchGroup>
        <SearchIcon width="16px" height="16px" viewBox="0 0 18 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1" fillRule="evenodd"><g transform="translate(-10.000000, -12.000000)"><g><g transform="translate(10.000000, 12.000000)"><path d="M7.32797563,14.6666667 C3.28084644,14.6666667 0,10.9023465 0,7.02341921 C0,3.14449189 3.28084644,0 7.32797563,0 C11.3751048,0 14.6559513,3.14449189 14.6559513,7.02341921 C14.6559513,8.44312002 14.2164539,9.76443694 13.4607464,10.8692066 L17.0258964,14.2861862 C17.4345238,14.6778307 17.4372165,15.3102312 17.0255445,15.7047938 C16.6167227,16.0966247 15.9574785,16.1000625 15.5454217,15.7051311 L12.0722968,12.376352 C10.7938961,13.4182002 9.13753246,14.6666667 7.32797563,14.6666667 Z M7.33333333,12.6666667 C10.278852,12.6666667 12.6666667,10.278852 12.6666667,7.33333333 C12.6666667,4.38781467 10.278852,2 7.33333333,2 C4.38781467,2 2,4.38781467 2,7.33333333 C2,10.278852 4.38781467,12.6666667 7.33333333,12.6666667 Z"></path></g></g></g></g></SearchIcon>
        <Search onChange={this.onChange} />
        </SearchGroup>
      </SearchContainer>
      <Container>
      {this.state.items.map((item, i) => (
        <Box key={i}>
          <Image src={item.node.data.Image[0].url} />
          <Details>
            <Title>{item.node.data.Name}</Title>
            <Author>{`By ${item.node.data.Authors}`}</Author>
            <Rating>
              <img height="12px" width="12px" src={star} alt="star symbol" /> {item.node.data.Rating}
            </Rating>
            <ButtonGroup>
              <Button>
                <Anchor href={item.node.data.Goodreads}>
                  <FaGoodreads /><span>&nbsp;Goodreads</span>
                </Anchor>
              </Button>
              <Button>
                <Anchor href={item.node.data.Amazon}>
                  <FaAmazon /><span>&nbsp;Amazon</span>
                </Anchor>
              </Button>
            </ButtonGroup>
          </Details>
        </Box>
      ))}
      </Container>
    </div>
    )
  }
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
