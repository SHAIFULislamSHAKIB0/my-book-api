const searchBook = () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    // console.log(searchText)
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResult(data)
            displayBookDetails(data.docs)
        })

}

const displaySearchResult = (data) => {
    // console.log(data.numFound)
    // console.log(data.docs.length)
    const resultFound = document.getElementById('result-found');

    // Error message for hijibijii hijibigii input 
    if (data.docs.length === 0) {
        resultFound.innerHTML = `
          <h3>No result found</h3>
    `;
    }
    // result found
    else {
        resultFound.innerHTML = `
        <h3>Result Found: ${data.numFound}</h3>
        `;
    }

}

const displayBookDetails = (books) => {
    // console.log(books.docs);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    books?.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="container card h-100">
                     <img width="250px" height="250px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text">Authors: ${book.author_name}</p>
                    <p class="card-text">Publisher: ${book.publisher} </p>

                    <p>First Publishing Year: ${book.first_publish_year}</p>

                </div>
        </div>
        `;
        searchResult.appendChild(div);

    })
}