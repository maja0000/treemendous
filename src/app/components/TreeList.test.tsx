import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import TreeList from './TreeList';
import {
  createMemoryRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import userEvent from '@testing-library/user-event';

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

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(apiResponce),
    }) as unknown as Promise<Response>
);

const queryClient = new QueryClient();

describe('TreeList', () => {
  test('renders a list of trees', async () => {
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      screen.getByText('Baobab');
      screen.getByText('Red Mangrove');
    });
  });

  // test('can select a tree and show its picture', async () => {
  //   const routes = [
  //     {
  //       path: '/',
  //       element: <TreeList />,
  //     },
  //   ];
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ['/'],
  //   });
  //   const user = userEvent.setup();

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider router={router} />
  //     </QueryClientProvider>
  //   );

  //   await waitFor(() => screen.getByText('Baobab'));
  //   const button = screen.getByTestId('tree-card-button-Baobab');

  //   const mockNavigate = jest.fn();
  //   (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  //   await user.click(button);

  //   expect(mockNavigate).toHaveBeenCalledWith('/?treeId=1');

  //   await waitFor(() => {
  //     screen.getByText('Hello');
  //     const image = screen.getByAltText(
  //       'A large African baobab tree with bright green leaves against a soft blue sky.'
  //     );
  //     expect(image).toBeInTheDocument();
  //   });
  // });
});
