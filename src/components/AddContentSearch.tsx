import styled from 'styled-components';
import { useState, useRef } from 'react';
import * as ApiTMDBService from '../services/searchContentApi';
import * as listsService from '../services/lists';

interface IAddContentSearch {
  hidden: boolean;
  hiddenFunc: Function;
  listId: number;
  renderList: Function;
  token: string
}

interface SearchResult {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export function AddContentSearch(props: IAddContentSearch) {
  const { hidden, hiddenFunc, renderList, token } = props;
  const inputSearch: any = useRef();
  const timeoutRef: any = useRef(null);
  const [searchResults, setSearchResults] = useState<
    SearchResult | undefined
  >();

  function handleSearch(search: string) {
    if (search.length >= 3) {
      ApiTMDBService.searchContents(search, 1)
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function formatContentObject(content: any) {
    const objectFormated = {
      contentId: content.id,
      title: content.title || content.name,
      pictureUrl: `https://image.tmdb.org/t/p/original${content.poster_path}`,
      description: content.overview,
      releaseYear: content.first_air_date || content.release_date,
      trailerUrl: '',
      rating: content.vote_average,
    };
    if (objectFormated.releaseYear.length === 0)
      objectFormated['releaseYear'] = '0000-00-00';
    return objectFormated;
  }

  function addContet(listId: number, content: any) {
    listsService
      .addNewContent(token, listId, formatContentObject(content))
      .then((res) => {
        renderList(Math.random());
        hiddenFunc(!hidden);
      })
      .catch((err) => {
        alert('One occurred while adding new content');
      });
  }

  return (
    <Background hidden={hidden}>
      <Container>
        <ButtonToClose onClick={() => hiddenFunc(!hidden)} />

        <SearchContainer>
          <InputSearch
            type="text"
            placeholder="Search for a movie or tv show..."
            minLength={3}
            ref={inputSearch}
            onChange={(e) => {
              const search = inputSearch.current.value;
              if (search.length < 3) setSearchResults(undefined);
              clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => handleSearch(search), 1000);
            }}
          />
          <ResultsContainer>
            {searchResults ? (
              searchResults?.results.length > 0 ? (
                searchResults.results.map((item: any) => {
                  return (
                    <MovieFounded
                      onClick={() => addContet(props.listId, item)}
                      key={item.id}
                    >
                      <h1>
                        {item.name || item.original_title} -
                        {` ${
                          item.release_date
                            ? String(item.release_date).slice(0, 4)
                            : String(item.first_air_date).slice(0, 4)
                        }`}
                      </h1>
                    </MovieFounded>
                  );
                })
              ) : (
                <MovieFounded>
                  <h1>Nothing found!</h1>
                </MovieFounded>
              )
            ) : (
              ''
            )}
          </ResultsContainer>
        </SearchContainer>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #00000030;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 80%;
  border-radius: 10px 10px 0px 0px;
`;

const ButtonToClose = styled.div`
  background-color: white;
  width: 50px;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  width: 97%;
  max-height: 90%;
  background-color: #f7c84f;
  border-radius: 10px;
`;

const InputSearch = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  padding: 10px;
  font-size: 1em;
  border-radius: 10px;
  &:focus {
    outline: 1px solid black;
  }
`;

const MovieFounded = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 90%;
  padding: 10px;
  h1:hover {
    font-weight: bold;
    cursor: pointer;
  }
  hr {
    background-color: black;
    height: 1px;
    border: none;
    width: 100%;
  }
`;

const ResultsContainer = styled.div`
  background-color: #f7c84f;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  border-radius: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #000000;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 20px;
  }
`;
