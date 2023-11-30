import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import TreeList from './TreeList';

const apiResponce = {
  trees: [
    {
      id: 1,
      name: 'Baobab',
      species_name: 'Adansonia',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Baobab_Adansonia_digitata.jpg',
        alt: 'A large African baobab tree with bright green leaves against a soft blue sky.',
      },
    },
    {
      id: 2,
      name: 'Red Mangrove',
      species_name: 'Rhizophora mangle',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/en/1/16/Red_mangrove-everglades_natl_park.jpg',
        alt: 'A free-standing red mangrove tree growing in shallow water in the backcountry of the Cape Sable area of Everglades National Park.',
      },
    },
  ],
};

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ trees: [{ id: 1, name: 'Oak' }] }),
    }) as unknown as Promise<Response>
);

const queryClient = new QueryClient();

describe('TreeList', () => {
  test('renders TreeList component', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TreeList />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText('Oak'));

    expect(screen.getByText('Oak')).toBeInTheDocument();
    expect(
      screen.getByText('List of our trees!')
    ).toBeInTheDocument();
  });
});
