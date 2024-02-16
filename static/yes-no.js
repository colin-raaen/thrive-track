//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
    // MAKE SURE ONLY ONE Y/N checkbox IS SELECTED IN A ROW FOR ACTIVITY.HTML AND SLEEP.HTML
    // store all checkboxes (Yes and No) in variable with class YesNo
    const rows = document.querySelectorAll('tr[data-row-number]');
    // for each row
    rows.forEach(row => {
            // Store all checkboxes that are Y/N
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            // for each checkbox
            checkboxes.forEach(checkbox => {
                    // Listen for click on checkbox
                    checkbox.addEventListener('click', event => {
                            // if "yes" checkbox is checked
                            if (checkbox.checked && checkbox.value === '1') {
                                    // uncheck any other checked checkbox in this row
                                    row.querySelectorAll('input[type="checkbox"][value="0"]:checked').forEach(otherCheckbox => {
                                    otherCheckbox.checked = false;
                                    });
                                    // if "no" checkbox is checked
                            } else if (checkbox.checked && checkbox.value === '0') {
                                    // uncheck any other checked checkbox in this row
                                    row.querySelectorAll('input[type="checkbox"][value="1"]:checked').forEach(otherCheckbox => {
                                            otherCheckbox.checked = false;
                                    });
                            }
                    });
            });
    });
});