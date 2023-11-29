import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';

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

function TreeList() {
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
          {tree.name}
          {tree.image && (
            <Image
              src={tree.image.src}
              width={500}
              height={500}
              alt={tree.image.alt}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default TreeList;
