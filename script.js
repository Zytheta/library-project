// book prototype

function bookBlueprint (
  title,
  author,
  dateOfPublication,
  pageLength,
  genre,
  publisher,
  summary
) {
  this.title = title
  this.author = author
  this.dateOfPublication = dateOfPublication
  this.pageLength = pageLength
  this.genre = genre
  this.publisher = publisher
  this.summary = summary
}

// basic set of books to display

const myLibrary = [
  // List of books
  {
    title: 'Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    dateOfPublication: '1954-07-29',
    pageLength: 423,
    genre: 'Fantasy',
    publisher: 'George Allen & Unwin',
    summary: 'The first part of the epic fantasy adventure of the Ring.'
  },
  {
    title: 'The Two Towers',
    author: 'J.R.R. Tolkien',
    dateOfPublication: '1954-11-11',
    pageLength: 352,
    genre: 'Fantasy',
    publisher: 'George Allen & Unwin',
    summary: "The second installment in the saga of the Ring's journey."
  },
  {
    title: 'The Return of the King',
    author: 'J.R.R. Tolkien',
    dateOfPublication: '1955-10-20',
    pageLength: 416,
    genre: 'Fantasy',
    publisher: 'George Allen & Unwin',
    summary: 'The final part of the iconic fantasy series.'
  },
  {
    title: 'The Adventures of Huckleberry Finn',
    author: 'Mark Twain',
    dateOfPublication: '1884-12-10',
    pageLength: 366,
    genre: 'Adventure',
    publisher: 'Charles L. Webster And Company',
    summary: "The story of Huck's journey along the Mississippi River."
  },
  {
    title: '1984',
    author: 'George Orwell',
    dateOfPublication: '1949-06-08',
    pageLength: 328,
    genre: 'Dystopian',
    publisher: 'Secker & Warburg',
    summary: 'A chilling vision of a totalitarian future.'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    dateOfPublication: '1945-08-17',
    pageLength: 112,
    genre: 'Political Satire',
    publisher: 'Secker & Warburg',
    summary: 'An allegorical tale portraying a society of farm animals.'
  }
]

const currentLibrary = myLibrary

function displayBooks (bookArray) {
  const bookshelf = document.getElementById('bookshelf')

  bookArray.forEach((book, index) => {
    const createBookSpace = document.createElement('div')
    createBookSpace.classList.add('book')

    // Create elements for each property of the book object
    for (const property in book) {
      const propertyElement = document.createElement('p')
      const labelElement = document.createElement('span')
      const valueElement = document.createElement('span')

      labelElement.textContent = `${property}: `
      valueElement.textContent = book[property]

      // Style the label and value
      labelElement.style.fontWeight = 'bold'
      labelElement.textContent = `${capitalizeFirstLetter(property)}: `

      // Append label and value to the property element
      propertyElement.appendChild(labelElement)
      propertyElement.appendChild(valueElement)

      // Append each property element to the container
      createBookSpace.appendChild(propertyElement)
    }

    // Read checkbox

    const readCheckbox = document.createElement('input')
    readCheckbox.type = 'checkbox'
    readCheckbox.id = `read-checkbox-${index}`
    readCheckbox.name = `read-checkbox-${index}`

    const readLabel = document.createElement('label')
    readLabel.textContent = 'Read'
    readLabel.htmlFor = `read-checkbox-${index}`

    readCheckbox.addEventListener('change', event => {
      const isChecked = event.target.checked

      if (isChecked) {
        console.log(`Book ${book.title} marked as read.`)
      } else {
        console.log(`Book ${book.title} marked as unread.`)
      }
    })

    createBookSpace.appendChild(readCheckbox)
    createBookSpace.appendChild(readLabel)

    // Remove book

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Delete Book'
    removeBtn.id = `remove-button-${index}` // Unique ID with the book index

    removeBtn.addEventListener('click', event => {
      console.log('Remove button pressed')
      bookshelf.removeChild(createBookSpace)
    })

    createBookSpace.appendChild(removeBtn)

    // Append the container to the document body (or another desired element)
    bookshelf.appendChild(createBookSpace)
  })
}

// Book constructor

function Book (
  title,
  author,
  dateOfPublication,
  pageLength,
  genre,
  publisher,
  summary
) {
  this.title = title
  this.author = author
  this.dateOfPublication = dateOfPublication
  this.pageLength = pageLength
  this.genre = genre
  this.publisher = publisher
  this.summary = summary
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Adding a new book

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('book-form')

  form.addEventListener('submit', submitForm)
})

// "Submitting" a book

async function submitForm (event) {
  event.preventDefault()

  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const dateOfPublication = document.getElementById('date-of-publication').value
  const pageLength = document.getElementById('page-length').value
  const genre = document.getElementById('genre').value
  const publisher = document.getElementById('publisher').value
  const summary = document.getElementById('summary').value

  const book = {
    title: title,
    author: author,
    dateOfPublication: dateOfPublication,
    pageLength: pageLength,
    genre: genre,
    publisher: publisher,
    summary: summary
  }

  myLibrary.push(book)

  clearCurrentLibrary()

  displayBooks(currentLibrary)

  try {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Posted data:', data)
    } else {
      console.error('Failed to post data')
    }
  } catch (error) {
    console.error('Error posting data:', error)
  }

  event.target.reset()
}

// Book display

displayBooks(currentLibrary)

// Removing a book

document.addEventListener('click', event => {
  if (event.target.classList.contains('remove-button')) {
    const bookContainer = event.target.closest('.book')
    if (bookContainer) {
      bookContainer.remove()
    }
  }
})

// Clearing the book list so no new duplicates pop-up

function clearCurrentLibrary () {
  const currentBookshelf = document.getElementById('bookshelf')

  while (currentBookshelf.firstChild) {
    currentBookshelf.removeChild(currentBookshelf.firstChild)
  }
}
