document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('.main');

  // Create layout columns

  const navSide = document.createElement('div')
  navSide.classList.add('navSide');

  const navL = document.createElement('div')
  navL.classList.add('navL');

  const navR = document.createElement('div')
  navR.classList.add('navR');




  const mainSide = document.createElement('div')
  mainSide.classList.add('mainSide');

  const mainL = document.createElement('div');
  mainL.classList.add('main-l');

  const mainR = document.createElement('div');
  mainR.classList.add('main-r');
  
  


  const detailsR = document.createElement('div');
  detailsR.classList.add('detailsR');
    detailsR.innerHTML = `
  
   
    <a class="link" href="https://www.instagram.com/hoesslerhoffmann/">Instagram</a>

    <a class="link" href="https://www.linkedin.com/company/hoesslerhoffmann/">LinkedIn</a>

    <a class="link" href="../impressum/impressum.html">Impressum</a>
  `;

  const detailsSide = document.createElement('div')
  detailsSide.classList.add('detailsSide');
  detailsSide.innerHTML = `
    <div class="link">
      WARTSTRASSE 16, 8400 WINTERTHUR
      <br>
      STUDIO@HOESSLERHOFFMANN.CH
      <br>
      +41 52 228 62 10
    </div>
  `;


  const detailsL = document.createElement('div')
  detailsL.classList.add('detailsL');





  // --- LEFT: Gallery ---
  const projectContent = document.createElement('div');
  projectContent.classList.add('project-content');

  const gallery = document.createElement('div');
  gallery.classList.add('project-gallery');

  const header = document.createElement('div');
  header.classList.add('project-header');


  const image = document.createElement('img');
  image.src = "../../libraries/01_Images/HH-Images/Studio/HH_20260630_260522-2274.jpg";
  image.classList.add('project-image', 'active');



  mainSide.appendChild(header);
  gallery.appendChild(image);
  projectContent.appendChild(gallery);
  mainL.appendChild(projectContent);








  // --- RIGHT: Employees ---
const imageLoaded = new Promise((resolve, reject) => {
  if (image.complete && image.naturalWidth > 0) {
    resolve();
  } else {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', reject, { once: true });
  }
});

const studioLoaded = fetch('../../libraries/04_Studio/studio.json')
  .then(res => res.json());

Promise.all([imageLoaded, studioLoaded])
  .then(([_, studio]) => {

      const employeeContent = document.createElement('div');
      employeeContent.classList.add('employee-content');

      const employeeList = document.createElement('div');
      employeeList.classList.add('employee-list');

      const employeeText = document.createElement('div');
      employeeText.classList.add('employee-text');

      studio.employees.forEach(employee => {

        const name = document.createElement('p');
        name.textContent = employee.name;


name.addEventListener('click', () => {

  document.querySelectorAll('.employee-list p')
    .forEach(item => item.classList.remove('active'));

  name.classList.add('active');

  employeeText.innerHTML = `<p>${employee.text}</p>`;
});


        employeeList.appendChild(name);
      });

  employeeContent.appendChild(employeeList);

const employeeRow = document.createElement('div');
employeeRow.classList.add('employee-row');

employeeRow.appendChild(employeeContent);
employeeRow.appendChild(employeeText);

const mainRBottom = document.createElement('div');
mainRBottom.classList.add('main-r-bottom');

mainRBottom.innerHTML = `
  <a class="link team-link" href="#">Team</a>
  <a class="link jobs-link" href="#">Jobs</a>
  <a class="link publikationen-link" href="#">Publikationen</a>
  <a class="link aktuell-link" href="#">Aktuell</a>

`;


function setActiveLink(activeLink) {
  mainRBottom.querySelectorAll('.link')
    .forEach(link => link.classList.remove('active'));

  activeLink.classList.add('active');
}

const teamLink = mainRBottom.querySelector('.team-link');
  setActiveLink(teamLink);


teamLink.addEventListener('click', (e) => {

  e.preventDefault();

  setActiveLink(teamLink);

  employeeContent.style.display = 'block';

  employeeContent.innerHTML = '';
  employeeContent.appendChild(employeeList);

  employeeText.innerHTML = '';
  employeeText.classList.remove('full-text');

});




const jobsLink = mainRBottom.querySelector('.jobs-link');

jobsLink.addEventListener('click', (e) => {

  e.preventDefault();

  setActiveLink(jobsLink);

  fetch('../../libraries/04_Studio/jobs.txt')
    .then(res => res.text())
    .then(text => {

employeeContent.style.display = 'none';

employeeText.innerHTML = text;
employeeText.classList.add('full-text');

    })
    .catch(error => {
      console.error("Error loading jobs.txt:", error);
    });

});




const publikationenLink = mainRBottom.querySelector('.publikationen-link');

publikationenLink.addEventListener('click', (e) => {

  e.preventDefault();
  setActiveLink(publikationenLink);

  fetch('../../libraries/04_Studio/publikationen.txt')
    .then(res => res.text())
    .then(text => {



employeeContent.style.display = 'none';

employeeText.innerHTML = text;
employeeText.classList.add('full-text');



    })
    .catch(error => {
      console.error("Error loading publikationen.txt:", error);
    });

});


const aktuellLink = mainRBottom.querySelector('.aktuell-link');

aktuellLink.addEventListener('click', (e) => {

  e.preventDefault();
  setActiveLink(aktuellLink);

  fetch('../../libraries/04_Studio/aktuell.txt')
    .then(res => res.text())
    .then(text => {

employeeContent.style.display = 'none';

employeeText.innerHTML = text;
employeeText.classList.add('full-text');

    })
    .catch(error => {
      console.error("Error loading aktuell.txt:", error);
    });

});


mainR.appendChild(employeeRow);
mainR.appendChild(mainRBottom);

      // Add both columns after data is ready
      container.appendChild(navSide);
      container.appendChild(navL);
      container.appendChild(navR);

      container.appendChild(mainSide);
      container.appendChild(mainL);
      container.appendChild(mainR);

      container.appendChild(detailsSide);
      container.appendChild(detailsL);
      container.appendChild(detailsR);

    })
    .catch(error => {
      console.error("Error loading studio.json:", error);
    });



    




});