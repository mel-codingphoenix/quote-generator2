//Get Quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// async fubction will run at anytime independently and it won't stop the browser from loading the page
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://shielded-wave-97294.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    // Try-Catch Statement: allow us to attempt a fetch request but if it doesn't work, we can catch the error information and do something with it
    try {
        const response = await fetch(proxyUrl + apiUrl); //This constant will not be populated until it has some data fetched from our api
        const data = await response.json();
        //If author is blank, add Unknown
        if (!data.quoteAuthor) {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        removeLoadingSpinner();
        quoteText.innerText = data.quoteText;
    } catch (error) {
        //Catch Error Here
        getQuote();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On load - run the function
getQuote();