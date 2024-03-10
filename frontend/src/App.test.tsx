import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('<App />', () => {
  it('renders successfully', async () => {
    render(<App />)
    const appElement = await screen.findByTestId('app')
    expect(appElement).toBeInTheDocument()
  })
})
