import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantMenuSetting from '../components/RestaurantMenuSetting';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('RestaurantMenuSetting component', () => {
  const restaurantMenuInfo = {
    name: 'Test food',
    original_price: 10,
    price: 8,
    quantity: 5,
    id: 1,
    restaurant_id: 1,
    description: 'A test food',
  };

  it('renders with menu information', () => {
    render(<RestaurantMenuSetting restarantmenuInfo={restaurantMenuInfo} unsold={true} />);
    
    expect(screen.getByText('Test food')).toBeInTheDocument();
    expect(screen.getByText('A test food')).toBeInTheDocument();
  });

  it('renders with menu information when unsold is true', () => {
    render(<RestaurantMenuSetting restarantmenuInfo={restaurantMenuInfo} unsold={true} />);
    
    expect(screen.getByText('A test food')).toBeInTheDocument();
  });

  it('renders without delete and edit buttons when unsold is false', () => {
    render(<RestaurantMenuSetting restarantmenuInfo={restaurantMenuInfo} unsold={false} />);
    
    expect(screen.getByText('Test food')).toBeInTheDocument();
    expect(screen.getByText('A test food')).toBeInTheDocument();

    expect(screen.queryByText('Delete')).toBeNull();
  });


});
