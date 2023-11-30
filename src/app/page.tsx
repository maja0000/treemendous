'use client';
import TreeList from './components/TreeList';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <Router>
          <TreeList />
        </Router>
      </QueryClientProvider>
    </div>
  );
}
