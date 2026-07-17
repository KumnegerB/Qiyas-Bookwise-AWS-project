const API_URL =
"https://iwm7t3c4id.execute-api.us-east-1.amazonaws.com/prod";


let currentBookId = null;

let currentUser = localStorage.getItem("user");

let allBooks = [];

// Convert DynamoDB format if needed
function convertDynamoDBItem(item){

    return {

        bookId: item.bookId?.S || item.bookId,

        title: item.title?.S || item.title,

        author: item.author?.S || item.author,

        description: item.description?.S || item.description

    };

}



// Browse Books cover images
function getBookImage(bookId){

    const images = {

        "book-001": "serverless-AWS.jpg",

        "book-002": "cloud computing made simple.jpg",

        "book-003": "mastering AWS Lambda.jpg"

    };


    return images[bookId] || "serverless-AWS.jpg";

}




// Load books from DynamoDB through API Gateway
async function loadBooks(){

    try{


        const response = await fetch(
            `${API_URL}/books`
        );


        let books = await response.json();



        // Handle DynamoDB response format
        books = books.map(
            book => convertDynamoDBItem(book)
        );

        allBooks = books;



        const grid =
        document.getElementById("books-grid");



        if(!grid){

            console.log("books-grid not found");

            return;

        }



        grid.innerHTML = books.map(book => `


        <div class="book-card">


            <img 
            src="images/${getBookImage(book.bookId)}"
            alt="${book.title}"
            onclick="openBook('${book.bookId}')"
            >



            <h3>
            ${book.title}
            </h3>



            <p>
            <strong>Author:</strong>
            ${book.author}
            </p>



            <p>
            ${book.description}
            </p>



            <button onclick="openBook('${book.bookId}')">

            Add Review

            </button>


        </div>


        `).join("");



    }


    catch(error){


        console.error(
            "Error loading books:",
            error
        );


    }


}





// Get single book
async function getBook(bookId){


    try{


        const response = await fetch(

            `${API_URL}/books/${bookId}`

        );


        let book =
        await response.json();



        return convertDynamoDBItem(book);



    }


    catch(error){

        console.error(
            "Error getting book:",
            error
        );

    }

}





// Submit Review
async function submitReview(){


    const review = {


        bookId: currentBookId,


        userId: currentUser,


        rating:
        document.getElementById("rating").value,


        comment:
        document.getElementById("comment").value


    };



    try{


        const response = await fetch(

            `${API_URL}/reviews`,

            {

                method:"POST",


                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(review)

            }

        );



        const result =
        await response.json();



        alert(

            result.message ||
            "Review submitted successfully"

        );



    }


    catch(error){


        console.error(
            "Error submitting review:",
            error
        );


    }


}





// Open selected book
async function openBook(bookId){


    currentBookId = bookId;



    const book =
    await getBook(bookId);



    console.log(
        "Selected book:",
        book
    );



    const reviewSection =
    document.getElementById(
        "review-section"
    );



    reviewSection.style.display =
    "block";



    reviewSection.scrollIntoView({

        behavior:"smooth"

    });


}




// Start loading books
loadBooks();

function searchBooks(){


    const searchValue =
    document.getElementById("search-bar")
    .value
    .toLowerCase();



    const filteredBooks =
    allBooks.filter(book =>


        book.title
        .toLowerCase()
        .includes(searchValue)

        ||

        book.author
        .toLowerCase()
        .includes(searchValue)


    );



    const grid =
    document.getElementById("books-grid");



    grid.innerHTML =
    filteredBooks.map(book => `


        <div class="book-card">


        <img 
        src="images/${getBookImage(book.bookId)}"
        alt="${book.title}">


        <h3>
        ${book.title}
        </h3>


        <p>
        <strong>Author:</strong>
        ${book.author}
        </p>


        <p>
        ${book.description}
        </p>


        <button onclick="openBook('${book.bookId}')">
        Add Review
        </button>


        </div>


    `).join("");

}