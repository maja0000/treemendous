import { jest } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeList from './TreeList';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

describe('TreeList', () => {
  // const treesData = {
  //   trees: [
  //     {
  //       id: 1,
  //       name: 'Baobab',
  //       species_name: 'Adansonia',
  //       image: {
  //         src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Baobab_Adansonia_digitata.jpg',
  //         alt: 'A large African baobab tree with bright green leaves against a soft blue sky.',
  //       },
  //     },
  //     {
  //       id: 2,
  //       name: 'Red Mangrove',
  //       species_name: 'Rhizophora mangle',
  //       image: {
  //         src: 'https://upload.wikimedia.org/wikipedia/en/1/16/Red_mangrove-everglades_natl_park.jpg',
  //         alt: 'A free-standing red mangrove tree growing in shallow water in the backcountry of the Cape Sable area of Everglades National Park.',
  //       },
  //     },
  //   ],
  // };

  // beforeEach(async () => {
  //   jest.mock('next/navigation', () => ({
  //     useRouter() {
  //       return {
  //         route: '/',
  //         pathname: '',
  //         query: '',
  //         asPath: '',
  //         push: jest.fn(),
  //         replace: jest.fn(),
  //       };
  //     },
  //   }));
  // });

  test('page renders without errors', async () => {
    jest.mock('next/navigation', () => ({
      useRouter: jest.fn(),
    }));
    jest.mock('next/navigation', () => ({
      useRouter() {
        return {
          route: '/',
          pathname: '',
          query: '',
          asPath: '',
        };
      },
    }));
    const client = new QueryClient();
    const routes = [
      {
        path: '/',
        element: <TreeList />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(
      screen.getByText('List of our trees!')
    ).toBeInTheDocument();
  });
});
