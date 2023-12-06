import React from 'react';
import RestaurantMenutable from '../pages/Restaurant/RestaurantMenutable';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';

jest.mock('../pages/Restaurant/RestaurantMenutable', () => ({
    __esModule: true,
    default: jest.fn(() => <div>Mocked RestaurantMenutable</div>),
  }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('RestaurantMenutable component', ()=>{
    it('renders RestaurantMenutable', ()=>{
        const queryClient = new QueryClient();

        render(
        <QueryClientProvider client={queryClient}>    
        <RestaurantMenutable/>
        </QueryClientProvider>
        );
    })

    it('renders RestaurantMenutable', async ()=>{
        const queryClient = new QueryClient();

        render(
        <QueryClientProvider client={queryClient}>    
        <RestaurantMenutable/>
        </QueryClientProvider>
        );
       
        const addButton = screen.getByTestId('button');
        fireEvent.click(addButton);

        fireEvent.change(screen.getByLabelText(/Menu Name/i), { target: { value: 'Sample Menu' } });
        fireEvent.change(screen.getByLabelText(/Original Price/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Discounted Price/i), { target: { value: '8' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Sample Description' } });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(()=>{
            expect(screen.getByText('Sample Menu')).toBeInTheDocument();
            expect(screen.getByText('Original Price: $10')).toBeInTheDocument();
            expect(screen.getByText('Discounted Price: $8')).toBeInTheDocument();
            expect(screen.getByText('Sample Description')).toBeInTheDocument();
        })


    })
})