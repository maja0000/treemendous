'use client';

import TreeList from '../components/TreeList';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <TreeList />
      </QueryClientProvider>
    </div>
  );
}
