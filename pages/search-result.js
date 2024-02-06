import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  // Extract the search term from the URL query parameters
  useEffect(() => {
    setSearchTerm(router.query.term || '');
  }, [router.query.term]);

  const token =
  "103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8";

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await axios.get(
        `http://localhost:1338/api/projects?filters[$or][0][students][$contains]=${searchTerm}&filters[$or][1][faculty][$contains]=${searchTerm}&filters[$or][2][keywords][$contains]=${searchTerm}&filters[$or][3][projectName][$contains]=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        setSearchResults(res.data.data);
      }).catch((error) => {
        console.log(error);
      });
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      {/* Render the search results */}
      {searchResults.map((result) => (
        <div key={result.id}>
          <span>{result.attributes.students}</span>
          <span>{result.attributes.projectName}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
