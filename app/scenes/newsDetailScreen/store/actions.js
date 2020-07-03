import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchExample: null,
  fetchExampleLoading: null,
  fetchExampleSuccess: ['example'],
  fetchExampleFailure: ['errorMessage'],
})

export const ExampleScreenTypes = Types
export default Creators
