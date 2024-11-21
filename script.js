import { zodiacSigns, annualHoroscope, emojiHoroscope } from './horoscope.js';

// variables
const form = document.getElementById('date-checker');
const button = document.querySelector('#date-checker button');
const signTitle = document.getElementById('yourSign')
const answer = document.getElementById('answer')


// Event listener for the form
button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('!!' + form.elements['date'])
    const dateArray = form.elements['date'].value.split('-').slice(1); //from string to array ['month', 'day']

    const yourSign = getZodiacSign(dateArray)
    console.log(yourSign); 
    signTitle.innerText = yourSign +'' + emojiHoroscope[yourSign]
    if(annualHoroscope[yourSign] != undefined) {
        answer.innerHTML = '"'+annualHoroscope[yourSign]+'"'
    }
    
    console.log(getZodiacSign(dateArray))
})

// function to get zodiac sign
const getZodiacSign = (dateArray) => {
    // convert date on a full number
    const [month, day] = dateArray.map(Number)
    const birthdayDate = month * 100 + day;

    // Loop through all zodiac signs
    for (const { sign, start, end } of zodiacSigns) {
        // Separate and convert dates  on full numbers
        const [startMonth, startDay] = start.split('-').map(Number);
        const [endMonth, endDay] = end.split('-').map(Number);
        const startDate = startMonth * 100 + startDay;
        const endDate = endMonth * 100 + endDay;

        // Special handling for Capricorn
        if (sign === 'Capricorn') {
            if ((birthdayDate >= startDate && birthdayDate <= 1231) || (birthdayDate >= 101 && birthdayDate <= endDate)) {
                return sign;
            }
        } else if (birthdayDate >= startDate && birthdayDate <= endDate) {
            return sign;
        }
    }
    return 'No zodiac sign found for this date';
}