'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FC, useCallback } from 'react';
import TreeCard from './TreeCard';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

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
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const pathname = usePathname();

  // const currentTreeId = searchParams.get('treeId');

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  // const handleClick = (treeId: number) => {
  //   const selectedTreeKey = treeId.toString();

  //   if (selectedTreeKey === currentTreeId) {
  //     // If the new treeId is the same as the current one, remove the query parameter
  //     router.push(pathname);
  //   } else {
  //     router.push(
  //       pathname + '?' + createQueryString('treeId', selectedTreeKey)
  //     );
  //   }
  // };

  const { isPending, error, data }: UseQueryResult<ApiResponse> =
    useQuery({
      queryKey: ['treesData'],
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
    <ul className="tree-list">
      {/* TODO: delete */}
      List of our trees!
      {trees.map((tree: TreeType) => (
        <li key={tree.id}>
          <TreeCard
            {...tree}
            // isSelected={currentTreeId === tree.id.toString()}
            // onClick={() => handleClick(tree.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TreeList;
