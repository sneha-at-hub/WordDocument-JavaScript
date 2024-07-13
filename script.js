const boldButton = document.getElementById('bold');
const italicButton = document.getElementById('italic');
const underlineButton = document.getElementById('underline');
const alignLeftButton = document.getElementById('align-left');
const alignCenterButton = document.getElementById('align-center');
const alignRightButton = document.getElementById('align-right');
const alignJustifyButton = document.getElementById('align-justify');
const artBoard = document.querySelector('.artboard');
const textColorInput = document.getElementById('text-color');
const backgroundColorInput = document.getElementById('background-color');

function applyStyle(style, value) {
  document.execCommand(style, false, value);
}

boldButton.addEventListener('click', () => {
  applyStyle('bold');
  boldButton.classList.toggle('active');
});

italicButton.addEventListener('click', () => {
  applyStyle('italic');
  italicButton.classList.toggle('active');
});

underlineButton.addEventListener('click', () => {
  applyStyle('underline');
  underlineButton.classList.toggle('active');
});

alignLeftButton.addEventListener('click', () => {
  applyStyle('justifyLeft');
  alignLeftButton.classList.add('active');
  alignCenterButton.classList.remove('active');
  alignRightButton.classList.remove('active');
  alignJustifyButton.classList.remove('active');
});

alignCenterButton.addEventListener('click', () => {
  applyStyle('justifyCenter');
  alignLeftButton.classList.remove('active');
  alignCenterButton.classList.add('active');
  alignRightButton.classList.remove('active');
  alignJustifyButton.classList.remove('active');
});

alignRightButton.addEventListener('click', () => {
  applyStyle('justifyRight');
  alignLeftButton.classList.remove('active');
  alignCenterButton.classList.remove('active');
  alignRightButton.classList.add('active');
  alignJustifyButton.classList.remove('active');
});

alignJustifyButton.addEventListener('click', () => {
  applyStyle('justifyFull');
  alignLeftButton.classList.remove('active');
  alignCenterButton.classList.remove('active');
  alignRightButton.classList.remove('active');
  alignJustifyButton.classList.add('active');
});


textColorInput.addEventListener('input', () => {
  applyStyle('foreColor', textColorInput.value);
});

backgroundColorInput.addEventListener('input', () => {
  artBoard.style.backgroundColor = backgroundColorInput.value;
});

// Get all toolbar buttons
const toolbarButtons = document.querySelectorAll('.toolbar .section button');

// Add click event listeners to each button
toolbarButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    toolbarButtons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const artboard = document.querySelector('.artboard');
  const undoButton = document.getElementById('undo');
  const redoButton = document.getElementById('redo');
  const saveButton = document.getElementById('save');
  const wordCountSpan = document.getElementById('word-count');
  let history = [];
  let historyIndex = -1;

  // Function to update history with current content
  function updateHistory() {
    historyIndex++;
    if (historyIndex < history.length) {
      history.splice(historyIndex);
    }
    history.push(artboard.innerHTML);
    updateButtons();
  }

  // Function to update undo and redo button states
  function updateButtons() {
    undoButton.disabled = historyIndex <= 0;
    redoButton.disabled = historyIndex >= history.length - 1;
  }

  // Event listener for content changes
  artboard.addEventListener('input', function() {
    updateHistory();
    updateWordCount();
  });

  // Undo button click event
  undoButton.addEventListener('click', function() {
    if (historyIndex > 0) {
      historyIndex--;
      artboard.innerHTML = history[historyIndex];
      updateButtons();
      updateWordCount();
    }
  });

  // Redo button click event
  redoButton.addEventListener('click', function() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      artboard.innerHTML = history[historyIndex];
      updateButtons();
      updateWordCount();
    }
  });

  // Save button click event
  saveButton.addEventListener('click', function() {
    const content = artboard.innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Function to update word count
  function updateWordCount() {
    const text = artboard.textContent || artboard.innerText;
    const words = text.trim().split(/\s+/).length;
    wordCountSpan.textContent = words;
  }

  // Initial update of buttons and word count
  updateButtons();
  updateWordCount();
});
