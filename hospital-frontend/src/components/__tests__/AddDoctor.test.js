import React from 'react';
import { render, screen } from '@testing-library/react';
import AddDoctor from '../AddDoctor';

test('renders AddDoctor component', () => {
    render(<AddDoctor />);
    const linkElement = screen.getByText(/add doctor/i);
    expect(linkElement).toBeInTheDocument();
});