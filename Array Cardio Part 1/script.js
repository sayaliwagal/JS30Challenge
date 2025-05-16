    // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

const bands = [
    { name: 'Queen', year: 1970, members: ['Freddie Mercury', 'Brian May', 'John Deacon', 'Roger Taylor'] },
    { name: 'Led Zeppelin', year: 1968, members: ['Robert Plant', 'Jimmy Page', 'John Paul Jones', 'John Bonham'] },
    { name: 'The Beatles', year: 1960, members: ['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'] },
    { name: 'Black Sabbath', year: 1968, members: ['Ozzy Osbourne', 'Tony Iommi', 'Geezer Butler', 'Bill Ward'] },
    { name: 'Nirvana', year: 1987, members: ['Kurt Cobain', 'Krist Novoselic', 'Dave Grohl'] }
];

    const people = [
      'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
      'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
      'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
      'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
      'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
    ];
    
    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
     console.log("1. Filter the list of inventors for who were born in 1500's")
      const fifteen = inventors.filter((inventor) =>  (inventor.year >= 1500 && inventor.year <= 1600));

const inventorsTableBody = document.querySelector('#inventorsTable tbody');
const inventorName = document.querySelector('#inventorsList')
const centuryFilter = document.querySelector('#centuryFilter');
const bandsList = document.querySelector('#bandsList');

function getCentury(year){
  return Math.ceil(year / 100);
}

function displayInventors(inventorsToShow){
  inventorsTableBody.innerHTML = '';

  inventorsToShow.forEach(inventor => {
    const row = inventorsTableBody.insertRow();

    const firstNameCell = row.insertCell();
    firstNameCell.textContent = inventor.first;

    const lastNameCell = row.insertCell();
    lastNameCell.textContent = inventor.last;

    const yearCell = row.insertCell();
    yearCell.textContent = inventor.year;

    const passedCell = row.insertCell();
    passedCell.textContent = inventor.passed;

    const ageCell = row.insertCell();
    ageCell.textContent = inventor.passed - inventor.year;
    
  });
}

function filterInventorsByCentury(century){
  if(century==='all'){
    displayInventors(inventors);
    return;
  }

  const filteredInventors = inventors.filter(inventor => {
    const inventorCentury = getCentury(inventor.year);
    return inventorCentury === parseInt(century);
  });
  displayInventors(filteredInventors);
}

function populateBandsList() {
  bands.forEach((band) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${band.name} (Formed: ${band.year}, Members: ${band.members.join(', ')})`;
    bandsList.appendChild(listItem);
  });
}

// displayInventors(inventors);
populateBandsList();


centuryFilter.addEventListener('change', function(){
  const selectedCenrury = this.value;
  filterInventorsByCentury(selectedCenrury);  
});

window.addEventListener('load', () => {
  centuryFilter.dispatchEvent(new Event('change'));
})

      console.table(fifteen);
    // Array.prototype.map()
    // 2. Give us an array of the inventors first and last names
      console.log("2. Give us an array of the inventors first and last names");  

      function fullName() {
             inventors.map(inventor => {
               const inventorLi = document.createElement('li');
              inventorLi.textContent =`${inventor.first} ${inventor.last}`;
              // console.log(`${inventor.first} ${inventor.last}`);
            inventorName.appendChild(inventorLi);
      });
      };

      fullName();

// Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
console.log("3. Sort the inventors by birthdate, oldest to youngest");
const ordered = inventors.sort((a,b) => a.year > b.year ? 1 :-1);
console.table(ordered);     


// Array.prototype.reduce()
    // 4. How many years did all the inventors live all together?
 console.log('4. How many years did all the inventors live all together?');
 const totalYears = inventors.reduce((total, inventor) => {
  return total = (inventor.passed - inventor.year);
 }, 0)

 console.log(totalYears)
    // 5. Sort the inventors by years lived
    console.log('5. Sort the inventors by years lived');
    const oldest = inventors.sort(function(a,b) {
      const lastGuy = a.passed - a.year;
      const nextGuy = b.passed - b.year;
      return lastGuy > nextGuy ? -1 : 1;
    });
    console.table(oldest);

    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    /*console.log("6. create a list of Boulevards in Paris that contain 'de' anywhere in the name")
   const category = document.querySelector('.mw-category');
   const link = Array.from(category.querySelectorAll('a'));
   const de = link
                .map(link => link.textContent)
                .filter(streetName => streetName.includes('de'));
*/
    // 7. sort Exercise
    // Sort the people alphabetically by last name
    console.log("7. Sort the people alphabetically by last name")
    const alpha = people.sort((lastOne, nextOne) =>{
      const[aLast, aFirst] = lastOne.split(', ');
      const[bLast, bFirst] = nextOne.split(', ');
      return aLast > bLast? 1:-1;
    });

    console.log(alpha);
    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
console.log("8. Reduce Exercise Sum up the instances of each of these");
const transportation = data.reduce(function(obj, item){
  if(!obj[item]){
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
console.log(transportation);