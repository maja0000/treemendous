import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FC } from 'react';
import TreeCard from './TreeCard';

type TreeType = {
  id: number;
  name: string;
  species_name: string;
  image: {
    src: string;
    alt: string;
  };
};

type ApiResponse = {
  trees: TreeType[];
};

const TreeList: FC = () => {
  const { isPending, error, data }: UseQueryResult<ApiResponse> =
    useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        fetch(
          'https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json'
        ).then((res) => res.json()),
    });

  if (isPending) return 'Loading...';

  if (error) {
    // TODO: Add Sentry error login
    console.log(error.message);
    return "Sorry! There's been an error! :(";
  }

  const { trees } = data;

  return (
    <ul>
      {trees.map((tree: TreeType) => (
        <li key={tree.id}>
          <TreeCard {...tree} />
        </li>
      ))}
    </ul>
  );
};

export default TreeList;
