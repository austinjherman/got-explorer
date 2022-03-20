import { Character, House, Result } from './types'

/**
 * Turn off API calls. Useful during dev so we're not hitting the API constantly. 
 */
const API_OFF: boolean = true

/**
 * The number of results per page we'll request.
 */
const API_PAGE_SIZE = 10

/**
 * The base API URL.
 */
const API_BASE: string = 'https://www.anapioficeandfire.com/api'

/**
 * Figure out if we're on the last page. This a little complicated because the last page
 * is sent in a "Link" header.
 * See: https://www.anapioficeandfire.com/Documentation#pagination
 */
function isLastPage(currentPage: number, linkHeader: string|null): boolean {
  let result = false
  if (linkHeader === null) return result
  const parts = linkHeader.split(',')
  for (let i=0; i < parts.length; i++) {
    if (/rel="last"/.test(parts[i])) {
      let match = parts[i].match(/\?page=(\d*)/)
      if (match && match.length > 1) {
        const lastPage = parseInt(match[1])
        result = lastPage === currentPage
      }
    }
  }
  return result
}

export function getIDFromAPIURL(url: string): string {
  return url.split('/').pop() || ''
}

/**
 * Get character by ID.
 */
 export async function getCharacterByID(id: string): Promise<Result<Character|null>> {
  if (API_OFF) return Promise.resolve({ data: null, error: null, isLastPage: true })
  const result: Result<Character|null> = { data: null, error: null, isLastPage: true }
  const response = await fetch(`${API_BASE}/characters/${id}`)
  if (!response.ok) result.error = 'There was a problem loading character data.'
  result.data = await response.json() as Character
  result.data.id = getIDFromAPIURL(result.data.url)
  return result
}

/**
 * Get character by Name.
 */
 export async function getCharacterByName(name: string): Promise<Result<Character[]>> {
  if (API_OFF) return Promise.resolve({ data: [], error: null, isLastPage: true })
  const result: Result<Character[]> = { data: [], error: null, isLastPage: true }
  const response = await fetch(`${API_BASE}/characters/?name=${name}`)
  if (!response.ok) result.error = 'There was a problem loading character data.'
  result.data = await response.json() as Character[]
  if (result.data.length > 0) {
    result.data[0].id = getIDFromAPIURL(result.data[0].url)
  }
  return result
}

/**
 * Get characters by page number. The API paginates characters, so we'll have to request
 * them by page number.
 */
export async function getCharactersByPage(
  pageNumber: number
): Promise<Result<Character[]>> {
  if (API_OFF) return Promise.resolve({ data: [], error: null, isLastPage: false })
  const result: Result<Character[]> = { data: [], error: null, isLastPage: false }
  const response = await fetch(`${API_BASE}/characters?pageSize=${API_PAGE_SIZE}&page=${pageNumber}`)
  if (!response.ok) result.error = 'There was a problem loading character data.'
  result.data = await response.json() as Character[]
  result.data = result.data.map<Character>(c => {
    c.id = getIDFromAPIURL(c.url)
    return c
  })
  result.isLastPage = isLastPage(pageNumber, response.headers.get('link'))
  return result
}

/**
 * Get house by ID.
 */
 export async function getHouseByID(id: string): Promise<Result<House|null>> {
  if (API_OFF) return Promise.resolve({ data: null, error: null, isLastPage: true })
  const result: Result<House|null> = { data: null, error: null, isLastPage: true }
  const response = await fetch(`${API_BASE}/houses/${id}`)
  if (!response.ok) result.error = 'There was a problem loading house data.'
  result.data = await response.json() as House
  result.data.id = getIDFromAPIURL(result.data.url)
  return result
}

/**
 * Get house by name.
 */
 export async function getHouseByName(name: string): Promise<Result<House|null>> {
  if (API_OFF) return Promise.resolve({ data: null, error: null, isLastPage: true })
  const result: Result<House|null> = { data: null, error: null, isLastPage: true }
  const response = await fetch(`${API_BASE}/houses/?name=${name}`)
  if (!response.ok) result.error = 'There was a problem loading house data.'
  result.data = await response.json() as House
  result.data.id = getIDFromAPIURL(result.data.url)
  return result
}

/**
 * Get characters by page number. The API paginates characters, so we'll have to request
 * them by page number.
 */
 export async function getHousesByPage(
  pageNumber: number
): Promise<Result<House[]>> {
  if (API_OFF) return Promise.resolve({ data: [], error: null, isLastPage: false })
  const result: Result<House[]> = { data: [], error: null, isLastPage: false }
  const response = await fetch(`${API_BASE}/houses?pageSize=${API_PAGE_SIZE}&page=${pageNumber}`)
  if (!response.ok) result.error = 'There was a problem loading house data.'
  result.data = await response.json() as House[]
  result.data = result.data.map<House>(h => {
    h.id = getIDFromAPIURL(h.url)
    return h
  })
  result.isLastPage = isLastPage(pageNumber, response.headers.get('link'))
  return result
}
