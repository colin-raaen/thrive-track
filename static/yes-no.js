// Function that is called to validate each yes/no field, with yes checkbox, no checkbox and field name as input
export function validateYNField(yesCheckbox, errorMessage, noCheckbox) {
        console.log("Export test");
        //If neither yes or no checkbox is selected
        if (!yesCheckbox.checked && !noCheckbox.checked) {
                alert(`Please check either "Yes" or "No" for the ${errorMessage} checkbox.`); //Send alert message
                return false; // return false for field validation check
        }
        return true; //passed validation
};

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