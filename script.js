const dailyActivityDropdownOptions = ['T1', 'T2', 'T2Q', 'OTR', 'TEAM', '1ON1', 'TRAIN', 'CSP', 'SCT', 'CAP', 'OPS'];
const tableData = [];

// Function to create a table row from a data object
function createTableRow(data) {
    const row = document.createElement('tr');

  // Daily activity dropdown
  const activityCell = document.createElement('td');
  const activityDropdown = document.createElement('select');
  dailyActivityDropdownOptions.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    activityDropdown.appendChild(optionElement);
  });
  activityDropdown.value = data.activity; // Set the selected value
  activityCell.appendChild(activityDropdown);
  row.appendChild(activityCell);

  // Time spent input
  const timeSpentCell = document.createElement('td');
  const timeSpentInput = document.createElement('input');
  timeSpentInput.type = 'number';
  timeSpentInput.min = '0';
  timeSpentInput.value = data.timeSpent; // Set the input value
  timeSpentCell.appendChild(timeSpentInput);
  row.appendChild(timeSpentCell);

  // Comment input
  const commentCell = document.createElement('td');
  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.value = data.comment; // Set the input value
  commentCell.appendChild(commentInput);
  row.appendChild(commentCell);

  // Actions cell (contains "Add Row" and "Remove Row" buttons)
  const actionsCell = document.createElement('td');

  // Add "Add Row" button to all rows except the first one
  if (data === tableData[0]) {
    const addRowButton = document.createElement('button');
    addRowButton.textContent = 'Add Row';
    addRowButton.addEventListener('click', addNewRow);
    actionsCell.appendChild(addRowButton);
  } else { // Add "Remove Row" button to rows other than the first one
    const removeRowButton = document.createElement('button');
    removeRowButton.textContent = 'Remove Row';
    removeRowButton.addEventListener('click', () => {
      const index = tableData.indexOf(data);
      if (index > -1) {
        tableData.splice(index, 1); // Remove the row data from tableData array
      }
      row.remove(); // Remove the clicked row
    });
    actionsCell.appendChild(removeRowButton);
  }

  row.appendChild(actionsCell);

  // Add the new row data to the tableData array
  tableData.push(data);

  return row;
}

// Function to add a new row to the table
function addNewRow() {
    const newRowData = {
      activity: dailyActivityDropdownOptions[0],
      timeSpent: '',
      comment: '',
    };
    const newRow = createTableRow(newRowData);
    tableData.push(newRowData);
    const tbody = document.querySelector('tbody');
    tbody.appendChild(newRow);
  
    // Add event listener to the time spent input in the new row
    const timeSpentInput = newRow.querySelector('input[type="number"]');
    timeSpentInput.addEventListener('input', () => {
      newRowData.timeSpent = timeSpentInput.value; // Update the timeSpent property in tableData
    });
  }
// Function to generate text from the table data
function generateText() {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
  
    let text = '---\n '; 
  
    // Get the first row data
    const firstRow = rows[0];
    const activity = firstRow.querySelector('select').value;
    const timeSpent = firstRow.querySelector('input[type="number"]').value;
    text += `*** ${activity}: ${timeSpent}\n `;
  
    // Get data from all rows created below
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i];
      const activity = rowData.querySelector('select').value;
      const timeSpent = rowData.querySelector('input[type="number"]').value;
      text += `*** ${activity}: ${timeSpent}\n`;
    }
  
    // Add comments
    text += '*** Comments: ';
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const comment = rowData.querySelector('input[type="text"]').value;
      text += `${comment}`;
      if (i !== rows.length - 1) {
        text += '; ';
      }
    }
    text += '\n---';
      // Update the generated text in the "generated-text-container" element
  const generatedTextContainer = document.getElementById('generated-text-container');
  generatedTextContainer.textContent = text;

  // Show the "Copy Code" container
  const copyCodeContainer = document.getElementById('copy-code-container');
  copyCodeContainer.style.display = 'block';

  console.log(text);
  return text;
}
  const copyCodeButton = document.getElementById('copy-code-button');
  copyCodeButton.addEventListener('click', copyToClipboard);

  function copyToClipboard() {
  const generatedTextContainer = document.getElementById('generated-text-container');
  const text = generatedTextContainer.textContent;

  // Create a temporary textarea element to copy the text to the clipboard
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();

  // Copy the text to the clipboard
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempTextarea);

  // Show a notification or any other feedback to the user (optional)
  alert('Generated code copied to clipboard!');
}

  // Add event listener to the "Generate Text" button
  const generateTextButton = document.getElementById('generate-text-button');
  generateTextButton.addEventListener('click', generateText);
  
  // Add event listener to the "Add Row" button
  const addRowButton = document.getElementById('add-row-button');
  addRowButton.addEventListener('click', addNewRow);

  // Add event listener to the "Refresh" button
const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', refreshPage);

function refreshPage() {
  // Reload the page to reset all values
  window.location.reload();
}
// Add event listener to the "Back" button
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
  history.back(); // Navigate back to the previous screen
});
