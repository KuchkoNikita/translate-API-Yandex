const input = document.querySelector('.input');
const button = document.querySelector('.button');
const translatedText = document.querySelector('.translated-text');

const btnRussianEn  = document.querySelector('.ru-en');
const btnEnglishRu  = document.querySelector('.en-ru');

let translateLanguage = 'ru-en';
btnRussianEn.disabled = true;

const key = 'trnsl.1.1.20200302T121415Z.ff486d36e949c145.000bb0dbd610c5d61551e349987675b3aadf3140';

const postData = () => {
    let text = encodeURIComponent(input.value);
    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${translateLanguage}&format=plain&options=1`;
    let request = new XMLHttpRequest();
    
    request.open('GET', url, true);
    return new Promise ( ( resolve ,reject ) => {
        request.addEventListener('readystatechange', () => {
            if ( request.readyState !== 4 ) {
                return;
            } if ( request.status === 200 ) {
                resolve(request.responseText);
            } else {
                reject(request.status);
            }
        });
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify())
    });
};


const serverRequest = () => {
    postData()
        .then( (response) => {
            let data = JSON.parse(response);
            console.log('data: ', data.text[0]);
            translatedText.textContent = data.text[0];
        })
        .catch( (error) => {
            console.log(error);
            translatedText.textContent = 'Произошла ошибка!';
        });
};

button.addEventListener('click', () => {
    serverRequest();
});

btnRussianEn.addEventListener('click', () => {
    translateLanguage = 'ru-en';
    btnRussianEn.disabled = true;
    btnEnglishRu.disabled = false;
});
btnEnglishRu.addEventListener('click', () => {
    translateLanguage = 'en-ru';
    btnEnglishRu.disabled = true;
    btnRussianEn.disabled = false;
});