// const form=document.getElementById('form');
// form.addEventListener('submit',(event)=>{
//     event.preventDefault();
//     const formData={
//         name:document.getElementById('name').value,
//         email:document.getElementById('email').value
//     };
//     fetch('http://localhost:3270/students',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//     .then(response=>response.json())
//     .then(values=>{
//         form.reset();
//     }) 
//     .catch(error => {
//             console.log(error);
//         });     

// })

const page = window.location.pathname;
console.log(page);
const pageContent = document.getElementById('page-content');
const url = 'http://localhost:3270'
function loadData(fileName) {
    return fetch(`${url}/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch data');
            } return response.json();
        })
}
//Home page
if (page.endsWith('index.html') || page === '/' || page.endsWith('/')) {
    loadData('home')
        .then(data => {
            pageContent.innerHTML = ` 
        <section class="info1">
         <h2>${data.welcome.heading}</h2> 
         <p>${data.welcome.description}</p>
        <a href="${data.welcome.buttonLink}" class="btn">
           ${data.welcome.buttonText} </a>
        </section> 
        <section class="info">
             <h2>${data.about.heading}</h2>
              <p>${data.about.description}</p>
       </section>
        <section class="info2"> ${data.cards.map(card => ` 
                <div class="infoMatter">
                 <h3>${card.heading}</h3>
                  <p>${card.description}</p>
                <a href="${card.link}">${card.linkText} </a>
                     </div> `).join('')} 
         </section> `;
        })
        .catch(error => console.log(error));
}

// about page
else if (page.endsWith('about.html')) {
    loadData('about')
        .then(data => {
            pageContent.innerHTML = `
                <section class="info">
                    <h2>${data.heading}</h2>
                    <p>${data.established}</p>
                    <p>${data.location}</p>
                    <p>${data.description}</p>
                </section>
            `;
        })
        .catch(error => console.log(error));
}

// course page
else if (page.endsWith('courses.html')) {
    loadData('courses')
        .then(data => {
            pageContent.innerHTML = `
        <section class="info">
        <h2>${data.heading}</h2>
        <div class="info2"> ${data.courses.map(course => ` <div class="infoMatter"> 
            <h3>${course.name}</h3> <p>${course.description}</p> <p>Duration: ${course.duration}</p>
             <a href="${course.link}">View Course</a> 
             </div> `).join('')} </div> 
             </section> `;
        })
        .catch(error => console.log(error));

}
// Bca page
else if (page.endsWith('bca.html')) {
    loadData('courses/bca')
        .then(data => {
            pageContent.innerHTML = `
                <section class="info">
                    <h2>${data.heading}</h2>
                    <p>${data.fullName}</p>
                    <p>Duration: ${data.duration}</p>
                    <p>${data.description}</p>
                </section>
            `;
        })
        .catch(error => {
            console.log(error);
        });
}

// Btech page
else if (page.endsWith('btech.html')) {
    loadData('courses/btech')
        .then(data => {
            pageContent.innerHTML = `
                <section class="info">
                    <h2>${data.heading}</h2>
                    <p>${data.fullName}</p>
                    <p>Specialization: ${data.specialization}</p>
                    <p>Duration: ${data.duration}</p>
                    <p>${data.description}</p>
                </section>
            `;
        })
        .catch(error => {
            console.log(error);
        });
}
//  students page
else if (page.endsWith('students.html')) {
    loadData('students')
    .then(data => {
        pageContent.innerHTML = `
                 <section class="info">
                  <h2>${data.heading}</h2> 
                  <p>Total Students: ${data.totalStudents}</p> 
                  <p>Active Batches: ${data.activeBatches}</p> 
                  <form id="form"> 
                  <table border="2" align="center" class="studentTable"> 
                  <thead> <tr> <td colspan="2">
                   <h3>Register a New Student</h3>
                    </td> </tr> </thead>
                     <tbody> 
                     <tr> 
                     <td>NAME:</td>
                      <td> <input type="text" name="name" id="name" placeholder="Student Name" required > </td>
                       </tr> 
                       <tr> 
                       <td>EMAIL:</td> 
                       <td> <input type="email" name="email" id="email" placeholder="Email" required > </td>
                        </tr> 
                        <tr> <td colspan="2"> <button type="submit" class="btn"> Register </button> </td> 
                        </tr> 
                        </tbody> 
                        
                        </table> 
                        </form> 
                        </section> `;
        const form = document.getElementById('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            };
            fetch('http://localhost:3270/students',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    form.reset();
                })
                .catch(error => {
                    console.log(error);
                });
        });
    })
    .catch(error => console.log(error));
}      
// facilities page
else if (page.endsWith('facilities.html'))
     { loadData('facilities') 
        .then(data => { pageContent.innerHTML = ` 
            <section class="info"> 
            <h2>${data.heading}</h2> 
            <ul> ${data.facilities.map(facility => ` <li>${facility}</li> `).join('')} 
            </ul> </section> `; })
     .catch(error => console.log(error)); }
    // placement page
  else if (page.endsWith('placement.html'))
     { loadData('placement') 
        .then(data => { pageContent.innerHTML = ` 
            <section class="info"> 
            <h2>${data.heading}</h2> 
            ${data.description.map(item => ` <p>${item}</p> `).join('')} 
            </section> `; })
     .catch(error => console.log(error)); }  
    //  contact page
    else if (page.endsWith('contact.html'))
         { loadData('contact') 
            .then(data => { pageContent.innerHTML = ` 
                <section class="info">
                 <h2>${data.heading}</h2>
                  <p>Phone: ${data.phone}</p> 
                  <p>Email: ${data.email}</p> 
                  <p>Location: ${data.location}</p>
                   </section> `; })
         .catch(error => console.log(error)); }