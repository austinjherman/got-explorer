/**
 * The result that will be returned by all of our API calls.
 */
 export type Result<T> = { data: T, error: string|null, isLastPage: boolean }

/**
 * The character type as defined by the API. See:
 * https://www.anapioficeandfire.com/Documentation#characters Implements the
 * SummaryDetailInterface
 */
 export type Character = {
   /** The character ID */
  id: string
  /** The hypermedia URL of this resource */
  url: string
  /** The name of this character */
  name: string
  /** The gender of this character. */
  gender: string
  /** The culture that this character belongs to. */
  culture: string
  /** Textual representation of when and where this character was born. */
  born: string
  /** Textual representation of when and where this character died. */
  died: string
  /** The titles that this character holds. */
  titles: string[]
  /** The aliases that this character goes by. */
  aliases: string[]
  /** The character resource URL of this character's father. */
  father: string
  /** The character resource URL of this character's mother. */
  mother: string
  /** A Character resource URL. */
  spouse: string
  /** An array of House resource URLs that this character is loyal to. */
  allegiances: string[]
  /** An array of Book resource URLs that this character has been in. */
  books: string[]
  /** An array of Book resource URLs that this character has had a POV-chapter in. */
  povBooks: string[]
  /** An array of names of the seasons of Game of Thrones that this character has been in.
   * */
  tvSeries: string[]
  /** An array of actor names that has played this character in the TV show Game Of
   * Thrones. */
  playedBy: string[]
}

export function newMockCharacter(): Character {
  return {
    id: 'test',
    url: 'test',
    name: 'character name',
    gender: 'test',
    culture: 'test',
    born: 'test',
    died: 'test',
    titles: ['test'],
    aliases: ['test'],
    father: 'test',
    mother: 'test',
    spouse: 'test',
    allegiances: ['test'],
    books: ['test'],
    povBooks: ['test'],
    tvSeries: ['test'],
    playedBy: ['test'],
  }
}

/**
 * The house type as defined by the API. See:
 * https://www.anapioficeandfire.com/Documentation#houses Implements the
 * SummaryDetailInterface
 */
export type House = {
  /** The house ID */
  id: string
  /** The hypermedia URL of this resource */
  url: string
  /** The name of this house */
  name: string
  /** The region that this house resides in. */
  region: string
  /** Text describing the coat of arms of this house. */
  coatOfArms: string
  /** The words of this house. */
  words: string
  /** The titles that this house holds. */
  titles: string[]
  /** The seats that this house holds. */
  seats: string[]
  /** The Character resource URL of this house's current lord. */
  currentLord: string
  /** The Character resource URL of this house's heir. */
  heir: string
  /** The House resource URL that this house answers to. */
  overlord: string
  /** The year that this house was founded. */
  founded: string
  /** The Character resource URL that founded this house. */
  founder: string
  /** The year that this house died out. */
  diedOut: string
  /** An array of names of the noteworthy weapons that this house owns. */
  ancestralWeapons: string[]
  /** An array of House resource URLs that was founded from this house. */
  cadetBranches: string[]
  /** An array of Character resource URLs that are sworn to this house. */
  swornMembers: string[]
}

export function newMockHouse(): House {
  return {
    id: 'test',
    url: 'test',
    name: 'house name',
    region: 'test',
    coatOfArms: 'test',
    words: 'test',
    titles: ['test'],
    seats: ['test'],
    currentLord: 'test',
    heir: 'test',
    overlord: 'test',
    founded: 'test',
    founder: 'test',
    diedOut: 'test',
    ancestralWeapons: ['test'],
    cadetBranches: ['test'],
    swornMembers: ['test'],
  }
}

export function factory<T>(n: number, creator: () => T): T[] {
  const arr = []
  for (let i=0; i < n; i++) { arr.push( creator() ) }
  return arr
}