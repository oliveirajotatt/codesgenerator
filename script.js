const dailyActivityDropdownOptions = ['T1', 'T2', 'T2Q', 'OTR', 'TEAM', '1ON1', 'TRAIN', 'CSP', 'SCT', 'CAP', 'OPS'];
const tableData = [];

function createTableRow(data) {
    const row = document.createElement('tr');

    const activityCell = document.createElement('td');
    const activityDropdown = document.createElement('select');
    dailyActivityDropdownOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        activityDropdown.appendChild(optionElement);
    });
    activityDropdown.value = data.activity;
    activityCell.appendChild(activityDropdown);
    row.appendChild(activityCell);

    const timeSpentCell = document.createElement('td');
    const timeSpentInput = document.createElement('input');
    timeSpentInput.type = 'number';
    timeSpentInput.min = '0';
    timeSpentInput.value = data.timeSpent;
    timeSpentCell.appendChild(timeSpentInput);
    row.appendChild(timeSpentCell);

    const commentCell = document.createElement('td');
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.value = data.comment;
    commentCell.appendChild(commentInput);
    row.appendChild(commentCell);

    const actionsCell = document.createElement('td');
    if (data === tableData[0]) {
        const addRowButton = document.createElement('button');
        addRowButton.textContent = 'Add Row';
        addRowButton.addEventListener('click', addNewRow);
        actionsCell.appendChild(addRowButton);
    } else {
        const removeRowButton = document.createElement('button');
        removeRowButton.textContent = 'Remove Row';
        removeRowButton.addEventListener('click', () => {
            const index = tableData.indexOf(data);
            if (index > -1) {
                tableData.splice(index, 1);
            }
            row.remove();
        });
        actionsCell.appendChild(removeRowButton);
    }
    row.appendChild(actionsCell);
    tableData.push(data);
    return row;
}

function addNewRow() {
    const newRowData = { activity: dailyActivityDropdownOptions[0], timeSpent: '', comment: '' };
    const newRow = createTableRow(newRowData);
    tableData.push(newRowData);
    document.querySelector('tbody').appendChild(newRow);
}

function generateText() {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    let text = '---\n ';

    rows.forEach(row => {
        const activity = row.querySelector('select').value;
        const timeSpent = row.querySelector('input[type="number"]').value;
        text += `*** ${activity}: ${timeSpent}\n`;
    });
    text += '*** Comments: ';
    rows.forEach((row, index) => {
        const comment = row.querySelector('input[type="text"]').value;
        text += `${comment}${index !== rows.length - 1 ? '; ' : ''}`;
    });
    text += '\n---';

    document.getElementById('generated-text-container').textContent = text;
    document.getElementById('copy-code-container').style.display = 'block';
}

function copyToClipboard() {
    const text = document.getElementById('generated-text-container').textContent;
    navigator.clipboard.writeText(text).then(() => alert('Generated code copied to clipboard!'));
}

document.getElementById('generate-text-button').addEventListener('click', generateText);
document.getElementById('add-row-button').addEventListener('click', addNewRow);
document.getElementById('copy-code-button').addEventListener('click', copyToClipboard);
document.getElementById('refresh-button').addEventListener('click', () => location.reload());
document.getElementById('back-button').addEventListener('click', () => history.back());
