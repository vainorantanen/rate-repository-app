import { useQuery } from '@apollo/client';

import { ORDERED_REPOS } from '../graphql/queries';

const useRepositories = (variables) => {
  
  const { data, loading, fetchMore, ...result } = useQuery(ORDERED_REPOS,
    { variables: { orderBy: variables.orderBy,
    orderDirection: variables.orderDirection,
    searchKeyword: variables.debouncedValue,
    first: variables.first
    }, 
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: variables.orderBy,
        orderDirection: variables.orderDirection,
        searchKeyword: variables.debouncedValue,
        first: variables.first
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };

  //return { repositories: data?.repositories, loading, error };
  /*
  useQuery(ORDERED_REPOS,
      { variables: { orderBy: "CREATED_AT",
      orderDirection: "DESC"
      }, 
      fetchPolicy: 'cache-and-network'
    });
  */
  /*
  if (order === 'latest') {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: debouncedValue
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  } else if (order === 'highest') {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
      searchKeyword: debouncedValue
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  } else {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
      searchKeyword: debouncedValue
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  }
  */
};

export default useRepositories;
