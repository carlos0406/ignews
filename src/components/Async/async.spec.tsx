import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { Async } from '.'

test('it renders correcly', async () => {
  render(<Async />)

  expect(screen.getByText('Async')).toBeInTheDocument()
  await waitForElementToBeRemoved(screen.queryByText('Teste2'))

  // expect(await screen.findByText('Teste',{},{
  //   timeout: 5000
  // })).toBeInTheDocument()

  await waitFor(() => {
    return expect(screen.getByText('Teste')).toBeInTheDocument()
  })
})
