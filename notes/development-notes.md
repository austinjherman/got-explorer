# Dev notes
These notes will take the place of a wireframe / conceptual overview in the interest of time. They'll be my instructions on how to proceed with development.

## Critical requirements
Build an app that lets a user explore details about the (GOT) houses and the characters that belong to them. The details of the UX are up to you, but your app should include:

- A paginated list of characters with buttons to move between pages
- A way to see details about each character, including which house they belong to or are sworn to
- The ability to find characters by name

## Questions about the critical requirements
- Can I use typescript?
  - yes 
- It's unclear to me whether the functionality to _explore houses_ is a requirement. The way it's phrased here: "Build an app that lets a user explore details about the (GOT) houses and the characters that belong to them" makes it seem like it's a required feature, but it doesn't show up again in the actual list of requirements. I think it'd be an easy add so I'm going to go for it.
  - not required but go for it

## UI / UX
I think a nice way to approach this would be to have two tabs on the main view: Character and House. The tabs will render a search bar and a paginated, table-esque sort of view with all items in that category. We don't want to cram too much info into a row, though, so instead we'll make each row a button that pops a modal containing more comprehensive info about the character or house.

Another nice feature might be to include a history of viewed items, both on the main view and in the modal. This would provide a way to quickly cross-reference viewed items.