import { render, screen } from '@testing-library/react'
import { ESubmitState } from '../types/github'
import SubmitState from './submit-state'

describe('SubmitState component', () => {
  test('renders loading state correctly', () => {
    render(<SubmitState value={ESubmitState.LOADING} />)

    // Spinner is present
    expect(screen.getByText('Loading')).toHaveTextContent()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('renders error state correctly', () => {
    render(<SubmitState value={ESubmitState.ERROR} />)

    expect(
      screen.getByText(/Something went wrong/i)
    ).toBeInTheDocument()
  })
})
