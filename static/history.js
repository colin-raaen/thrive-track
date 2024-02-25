//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
        const historyPageContainer = document.getElementById("history-page-container"); // Get and store activity history HTML Table
        const activityTable = document.getElementById("activity-history"); // Get and store activity history HTML Table
        const sleepTable = document.getElementById("sleep-history"); // Get and store activity history HTML Table
        let rowsPerPage = 30; // Number of rows to show
        let currentPageActivity = 0; // First page
        let currentPageSleep = 0; // First page
        let activityPaginationButtons = document.getElementById("page-numbers").getElementsByTagName("a");
        let sleepPaginationButtons = document.getElementById("page-numbers-sleep").getElementsByTagName("a");

        const showWorkoutHyperlink = document.getElementById('show-workouts-hyperlink'); // store "Show workout details" hyperlink
        const hideWorkoutHyperlink = document.getElementById('hide-workouts-hyperlink');
        const previousButtonActivity = document.getElementById("previous-button");
        const nextButtonActivity = document.getElementById("next-button");
        const previousButtonSleep = document.getElementById("previous-button-sleep");
        const nextButtonSleep = document.getElementById("next-button-sleep");
        const showWellnessHyperlink = document.getElementById('show-wellness-hyperlink');// store "Show workout details" hyperlink
        const hideWellnessHyperlink = document.getElementById('hide-wellness-hyperlink');
        const workoutColumns = document.getElementsByClassName("hidden-history-column"); // Store workout columns that are hidden
        const wellnessColumns = document.getElementsByClassName("hidden-wellness-type-column"); // Store workout columns that are hidden

        // FUNCTION CALLS ON PAGE LOAD FOR PAGINATION
        generatePaginationButtons("page-numbers", activityTable, currentPageActivity); // Generate pagination buttons   
        showPage(currentPageActivity, activityTable); // Show the first page initially
        generatePaginationButtons("page-numbers-sleep", sleepTable, currentPageSleep); // Generate pagination buttons
        showPage(currentPageSleep, sleepTable); // Show the first page initially on sleep table

       // EVENT DELEGATION, Listen for clicks to entire history.html
        historyPageContainer.addEventListener('click', function(event) {
                // if Show Workout Details hyperlink was clicked
                if (event.target === showWorkoutHyperlink) {
                        // call function to show details
                        handleShowColumnDetails(workoutColumns, showWorkoutHyperlink, hideWorkoutHyperlink); 
                }
                // if hide Workout Details hyperlink was clicked
                else if (event.target === hideWorkoutHyperlink) {
                        // call function to hide details
                        handleShowColumnDetails(workoutColumns, showWorkoutHyperlink, hideWorkoutHyperlink); 
                }
                // else if previous page for workout hyperlink was clicked
                else if (event.target === previousButtonActivity) {
                        // call function to go to previous page
                        currentPageActivity = handlePreviousPage(currentPageActivity, activityTable, activityPaginationButtons); 
                }
                // else if next page for workout hyperlink was clicked
                else if (event.target === nextButtonActivity) {
                        // call function to go to next page, update current page with return value
                        currentPageActivity = handleNextPage(currentPageActivity, activityTable, activityPaginationButtons); 
                }
                // if Show Wellness Details hyperlink was clicked
                else if (event.target === showWellnessHyperlink) {
                        // call function to show details
                        handleShowColumnDetails(wellnessColumns, showWellnessHyperlink, hideWellnessHyperlink); 
                }
                // if Hide Wellness Details hyperlink was clicked
                else if (event.target === hideWellnessHyperlink) {
                        // call function to hide details
                        handleShowColumnDetails(wellnessColumns, showWellnessHyperlink, hideWellnessHyperlink); 
                }
                // else if previous page for sleep logging hyperlink was clicked
                else if (event.target === previousButtonSleep) {
                        // call function to go to previous page
                        currentPageSleep = handlePreviousPage(currentPageSleep, sleepTable, sleepPaginationButtons); 
                }
                // else if next page for sleep logging hyperlink was clicked
                else if (event.target === nextButtonSleep) {
                        // call function to go to next page
                        currentPageSleep = handleNextPage(currentPageSleep, sleepTable, sleepPaginationButtons); 
                }
                // else if delete entry link for workout row was clicked
                else if (event.target.classList.contains('delete-link-activity')) {
                        handleDeleteRowClick(event, 'activity-data-row-id', 'activity'); // call function to handle deletion
                }
                // else if delete entry link for sleep logging row was clicked
                else if (event.target.classList.contains('delete-link')) {
                        handleDeleteRowClick(event, 'sleep-data-row-id', 'sleep'); // call function to handle deletion
                }
                // else if activity pagination number button was clicked
                else if (event.target.classList.contains('activity-pagination')) {
                        currentPageActivity = parseInt(event.target.textContent) - 1; // set current pageNumber to number clicked
                        showPage(currentPageActivity, activityTable); // Call show page function to display correct page rows
                        setActiveButton(currentPageActivity, activityPaginationButtons); // call set active button function to underline current page
                }
                // else if sleep pagination number button was clicked
                else if (event.target.classList.contains('sleep-pagination')) {
                        currentPageSleep = parseInt(event.target.textContent) - 1; // set current pageNumber to number clicked
                        showPage(currentPageSleep, sleepTable); //call show page function to show rows of data
                        setActiveButton(currentPageSleep, sleepPaginationButtons); // call setActiveButton Function to activate underline on current page
                }
        });

        // helper function to show or hide workout and wellness details
        function handleShowColumnDetails(columns, showHyperlink, hideHyperlink){
                // loop through hidden columns
                for (let i = 0; i < columns.length; i++) {
                        //adds the "hidden-column" class to the element if it's not present, and removes it if it's already present. 
                        columns[i].style.display = columns[i].style.display === 'none' ? 'table-cell' : 'none';
                }
                // ternary to hide or show "show workout/wellness details" hyperlink 
                showHyperlink.style.display = showHyperlink.style.display === 'none' ? 'inline-block' : 'none';
                // ternary to hide or show "hide workout/wellness details" hyperlink
                hideHyperlink.style.display = hideHyperlink.style.display === 'none' ? 'inline-block' : 'none';
        }

        // HANDLE DELETE ROW HYPERLINK CLICK WHEN CLICKED
        function handleDeleteRowClick(event, attribute, type){
                event.preventDefault(); // prevent default hyperlink behavior
                // confirmation message presented to user, are you sure you want to delete?
                if (confirm('Are you sure you want to delete this row?')) {
                        const rowId = event.target.getAttribute(attribute); // store activity logging id
                        // call delete row function with rowId and data type to make call to back end
                        deleteRow(type, rowId);
                } 
        }

        // IMPLEMENT PAGINATION AND DELETE BUTTONS FOR ACTIVITY LOGGING
        // function if next page button is clicked
        function handleNextPage(page, tableType, paginationButtons) {
                // if page number is less than highest page, aka still pages to move to next
                if (page < Math.floor(tableType.rows.length / rowsPerPage)) {
                        page++; // increment current page
                        showPage(page, tableType); // call show page function with updated current page
                        // if activity table
                        if (tableType === activityTable){
                                // call set active button function to underline current page, update HTML elements with return value
                                activityPaginationButtons = setActiveButton(page, paginationButtons); 
                        }
                        else{ // else, sleep table
                                // call set active button function to underline current page, update HTML elements with return value
                                sleepPaginationButtons = setActiveButton(page, paginationButtons); 
                        }
                }
                return page; // return the updated current page to update HTML
        }

        // function if previous page button is clicked
        function handlePreviousPage(page, tableType, paginationButtons) {
                // if at least one page exists
                if (page > 0) {
                        page--; // update current page by decrementing
                        showPage(page, tableType); // call show page function with updated current page
                        // if activity table
                        if (tableType === activityTable){
                                // call set active button function to underline current page, update HTML elements with return value
                                activityPaginationButtons = setActiveButton(page, paginationButtons); 
                        }
                        else{ // else, sleep table
                                // call set active button function to underline current page, update HTML elements with return value
                                sleepPaginationButtons = setActiveButton(page, paginationButtons); 
                        }
                }
                return page; // return the updated current page to update HTML
        }

        // function to hide rows not on current page and show rows on current page
        function showPage(page, tableType) {
                let start = page * rowsPerPage + 1; // calculate start of rows
                let end = (page + 1) * rowsPerPage; // calculate end of rows
                // loop through rows of the table, , 
                for (let i = 1; i < tableType.rows.length; i++) {
                        // if row is within range, show
                        if (i >= start && i <= end) {
                                tableType.rows[i].style.display = "";
                        // else if outside of range hide
                        } else {
                                tableType.rows[i].style.display = "none";
                        }
                } 
        }

        // Function to set the active button and underline the current page number
        function setActiveButton(pageNumber, paginationButtons) { 
                // loop through pagination buttons generated to show current page
                for (let i = 0; i < paginationButtons.length; i++) {
                        if (i === pageNumber) {
                                paginationButtons[i].classList.add("active");
                                paginationButtons[i].style.textDecoration = "underline";
                        } else {
                                paginationButtons[i].classList.remove("active");
                                paginationButtons[i].style.textDecoration = "none";
                        }
                }
                return paginationButtons; // return buttons to update HTML elements
        }
                
        // Generate pagination buttons dynamically
        function generatePaginationButtons(elementID, tableType, currentPage) {
                let totalPages = Math.floor((tableType.rows.length - 1) / rowsPerPage); // calculate total number of pages
                let pageNumbersDiv = document.getElementById(elementID); // create new div element for buttons
                pageNumbersDiv.innerHTML = ""; // define inner HTML

                // if there is a remainder after dividing by 30, than add a page to account for additional rows
                // subtracting 1 from rows length to exclude the table header row
                if ((tableType.rows.length - 1) % rowsPerPage !== 0) {
                        totalPages++; // Add 1 if there is a remainder
                }
        
                // loop through total number of pages to create buttons
                for (let i = 0; i < totalPages; i++) {
                        const pageNumberLink = document.createElement("a"); // create HTML element
                        pageNumberLink.textContent = i + 1; // set page number to show
                        // Set the href attribute for the hyperlink
                        pageNumberLink.href = tableType === activityTable ? "#history-page-container" : "#sleep-history-table-container"; 
                        if (tableType === activityTable){ // if table type is activity
                                pageNumberLink.classList.add("activity-pagination"); // set HTML class
                        } else{ // else if sleep table
                                pageNumberLink.classList.add("sleep-pagination"); // set HTML class
                        }
                        pageNumbersDiv.appendChild(pageNumberLink); // append HTML element
                        // add the 'active' class to the current page button and underline it
                        if (i === currentPage) {
                                pageNumberLink.classList.add("active");
                                pageNumberLink.style.textDecoration = "underline";
                        }
                }
        } 

        // Function to delete the row of data, input of which table data is coming from and row ID to identifty data in database
        function deleteRow(dataType, rowId) {
                let xhr = new XMLHttpRequest(); // make new instance of XMLHttpRequest object
                xhr.open('POST', '/history', true); // initializes request, type POST, endpoint, and true indicates it should be asynchronous
                xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE){ 
                                if (xhr.status === 200) {
                                        // Handle successful deletion
                                        // You can update the table dynamically or perform any other actions
                                        location.reload(); // Reload the page
                                }
                        }
                };
                // sends the request to the server with the request body containing the row_id parameter (sleep_logging id). 
                // The encodeURIComponent() function is used to properly encode the rowId value.
                xhr.send(dataType + '_row_id=' + encodeURIComponent(rowId));
        }
});