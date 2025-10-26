const url = '../assets/catalogo.pdf';
const container = document.getElementById('pdf-magazine');
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;

const renderPDF = async () => {
  pdfDoc = await pdfjsLib.getDocument(url).promise;
  totalPages = pdfDoc.numPages;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport: viewport }).promise;

    const pageDiv = document.createElement('div');
    pageDiv.classList.add('page');
    pageDiv.appendChild(canvas);
    container.appendChild(pageDiv);
  }

  createControls();
};

function createControls() {
  const controls = document.createElement('div');
  controls.classList.add('controls');
  controls.innerHTML = `
    <button id="prev">⬅️ Prev</button>
    <button id="next">Next ➡️</button>
  `;
  container.parentNode.appendChild(controls);

  document.getElementById('prev').addEventListener('click', flipPrev);
  document.getElementById('next').addEventListener('click', flipNext);
}

function flipNext() {
  const pages = document.querySelectorAll('.page');
  if (currentPage < totalPages) {
    pages[currentPage - 1].classList.add('flipped');
    currentPage++;
  }
}

function flipPrev() {
  const pages = document.querySelectorAll('.page');
  if (currentPage > 1) {
    currentPage--;
    pages[currentPage - 1].classList.remove('flipped');
  }
}

renderPDF();
