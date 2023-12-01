import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
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

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: () => ({
    pathname: '/?treeId=1',
    search: '?treeId=1',
  }),
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

  test('pre-selected tree shows picture', async () => {
    const routes = [
      {
        path: '/',
        element: <TreeList />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?treeId=1'],
    });
    userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText('Baobab'));
    await waitFor(() => {
      const image = screen.getByAltText(
        'A large African baobab tree with bright green leaves against a soft blue sky.'
      );
      expect(image).toBeInTheDocument();
    });
  });

  test('can select a tree and show picture', async () => {
    const routes = [
      {
        path: '/',
        element: <TreeList />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText('Baobab'));
    const button = screen.getByTestId('tree-card-button-Baobab');

    await user.click(button);

    expect(mockUseNavigate).toHaveBeenCalledWith('/?treeId=1');

    await waitFor(() => {
      const image = screen.getByAltText(
        'A large African baobab tree with bright green leaves against a soft blue sky.'
      );
      expect(image).toBeInTheDocument();
    });
  });
});
