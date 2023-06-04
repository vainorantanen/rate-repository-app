import { useQuery } from '@apollo/client';

import { ORDERED_REPOS } from '../graphql/queries';

const useRepositories = ({ order }) => {
  console.log("order: ", order);

  /*
  useQuery(ORDERED_REPOS,
      { variables: { orderBy: "CREATED_AT",
      orderDirection: "DESC"
      }, 
      fetchPolicy: 'cache-and-network'
    });
  */

  if (order === 'latest') {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "CREATED_AT",
      orderDirection: "DESC"
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  } else if (order === 'highest') {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "RATING_AVERAGE",
      orderDirection: "DESC"
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  } else {
    const { data, loading, error } = useQuery(ORDERED_REPOS,
      { variables: { orderBy: "RATING_AVERAGE",
      orderDirection: "ASC"
      }, 
      fetchPolicy: 'cache-and-network'
    });
    return { repositories: data?.repositories, loading, error };
  }
};

export default useRepositories;
