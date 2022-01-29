(function () {

	const randomColor = function () {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	};

	const updateDisplay = function (displayArea, bookList) {
		while (displayArea.firstChild) {
			displayArea.removeChild(displayArea.lastChild);
		}

		bookIndex = 0;

		bookList.forEach((book) => {
			bookCard = document.createElement('div');
			bookCard.classList.add('book-card');
			bookCard.dataset.bookIndex = bookIndex;

			bookTopPanel = document.createElement('div');
			bookTopPanel.classList.add('book-top-panel');

			readButton = document.createElement('button');
			readButton.textContent = 'READ';

			if(book.isRead) {
				readButton.classList.add('book-read-button');

			} else {
				readButton.classList.add('book-unread-button');
			}

			readButton.addEventListener('click', (e) => {
				toggleReadStatus(e.target.parentElement.parentElement.dataset.bookIndex, e.target);
			});
			bookTopPanel.appendChild(readButton);


			deleteButton = document.createElement('button');
			deleteButton.classList.add('book-delete-button');
			deleteButton.textContent = 'DEL';
			deleteButton.addEventListener('click', (e) => {
				deleteBook(e.target.parentElement.parentElement.dataset.bookIndex);
			});
			bookTopPanel.appendChild(deleteButton);

			bookTitle = document.createElement('div');
			bookTitle.classList.add('book-title');
			bookTitle.textContent = book.title;

			bookAuthor = document.createElement('div');
			bookAuthor.classList.add('book-author');
			bookAuthor.textContent = 'by ' + book.author;

			bookPrice = document.createElement('div');
			bookPrice.classList.add('book-price');
			bookPrice.textContent = 'Rs. ' + book.price;

			bookCard.appendChild(bookTopPanel);
			bookCard.appendChild(bookTitle);
			bookCard.appendChild(bookAuthor);
			bookCard.appendChild(bookPrice);
			bookCard.style.border = randomColor() + ' solid 5px';

			displayArea.appendChild(bookCard);
			bookIndex++;
		});
	};

	const addBook = function (bookList, newBook) {
		bookList.push(newBook);
		localStorage.setItem('bookList', JSON.stringify(bookList));
	};

	const deleteBook = function (bookIndex) {
		bookList.splice(bookIndex, 1);
		localStorage.setItem('bookList', JSON.stringify(bookList));
		updateDisplay(displayArea, bookList);
	};

	const toggleReadStatus = function (bookIndex, bookReadButton) {
		bookList[bookIndex].isRead = !bookList[bookIndex].isRead;
		localStorage.setItem('bookList', JSON.stringify(bookList));
		bookReadButton.classList.toggle('book-read-button');
		bookReadButton.classList.toggle('book-unread-button');
	};

	const bookFactory = function (title, author, price, isRead, timeAdded) {
		return { title, author, price, isRead, timeAdded };
	};

	const inputNewBook = function (addBookOverlay) {
		addBookOverlay.style.visibility = 'visible';
	};

	const addButton = document.querySelector('.add-book');
	const clearAllButton = document.querySelector('.clear-all-books');
	const displayArea = document.querySelector('.display-area');
	const addBookOverlay = document.querySelector('.add-book-overlay');
	const addBookTitleInput = document.querySelector('#add-book-title-input');
	const addBookAuthorInput = document.querySelector('#add-book-author-input');
	const addBookPriceInput = document.querySelector('#add-book-price-input');
	const addBookConfirmButton = document.querySelector('.add-book-form-confirm-button');
	const addBookCancelButton = document.querySelector('.add-book-form-cancel-button');
	bookList = [];

	addBookConfirmButton.addEventListener('click', () => {
		const newBook = bookFactory(addBookTitleInput.value, addBookAuthorInput.value, addBookPriceInput.value, false, new Date());
		addBookTitleInput.value = '';
		addBookAuthorInput.value = '';
		addBookPriceInput.value = null;
		addBook(bookList, newBook);
		addBookOverlay.style.visibility = 'hidden';
		updateDisplay(displayArea, bookList);
	});

	addBookCancelButton.addEventListener('click', () => {
		addBookTitleInput.value = '';
		addBookAuthorInput.value = '';
		addBookPriceInput.value = null;
		addBookOverlay.style.visibility = 'hidden';
	});

	addButton.addEventListener('click', function () {
		inputNewBook(addBookOverlay);
	});

	clearAllButton.addEventListener('click', function () {
		bookList = [];
		localStorage.clear();
		updateDisplay(displayArea, bookList);
	});

	if (localStorage.getItem('bookList')) {
		bookList = JSON.parse(localStorage.getItem('bookList'));
	}

	updateDisplay(displayArea, bookList);

})();