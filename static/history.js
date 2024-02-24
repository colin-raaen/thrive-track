//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
        const historyPageContainer = document.getElementById("history-page-container"); // Get and store activity history HTML Table
        const table = document.getElementById("activity-history"); // Get and store activity history HTML Table
        const sleepTable = document.getElementById("sleep-history"); // Get and store activity history HTML Table
        let rowsPerPage = 30; // Number of rows to show
        let currentPage = 0; // First page
        let currentPageSleep = 0; // First page

        const showWorkoutHyperlink = document.getElementById('show-workouts-hyperlink'); // store "Show workout details" hyperlink
        const hideWorkoutHyperlink = document.getElementById('hide-workouts-hyperlink');
        const previousButton = document.getElementById("previous-button");
        const nextButton = document.getElementById("next-button");
        const previousButtonSleep = document.getElementById("previous-button-sleep");
        const nextButtonSleep = document.getElementById("next-button-sleep");
        const showWellnessHyperlink = document.getElementById('show-wellness-hyperlink');// store "Show workout details" hyperlink
        const hideWellnessHyperlink = document.getElementById('hide-wellness-hyperlink');
        const workoutColumns = document.getElementsByClassName("hidden-history-column"); // Store workout columns that are hidden
        const wellnessColumns = document.getElementsByClassName("hidden-wellness-type-column"); // Store workout columns that are hidden

        // FUNCTION CALLS ON PAGE LOAD FOR PAGINATION
        showPage(currentPage); // Show the first page initially
        generatePaginationButtons(); // Generate pagination buttons      
        showPageSleep(currentPageSleep); // Show the first page initially
        generatePaginationButtonsSleep(); // Generate pagination buttons

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
                else if (event.target === previousButton) {
                        previousPage(); // call function to go to previous page
                }
                // else if next page for workout hyperlink was clicked
                else if (event.target === nextButton) {
                        nextPage(); // call function to go to next page
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
                        previousPageSleep(); // call function to go to previous page
                }
                // else if next page for sleep logging hyperlink was clicked
                else if (event.target === nextButtonSleep) {
                        nextPageSleep(); // call function to go to next page
                }
                // else if delete entry link for workout row was clicked
                else if (event.target.classList.contains('delete-link-activity')) {
                        handleDeleteRowClick(event, 'activity-data-row-id', 'activity'); // call function to handle deletion
                }
                // else if delete entry link for sleep logging row was clicked
                else if (event.target.classList.contains('delete-link')) {
                        handleDeleteRowClick(event, 'sleep-data-row-id', 'sleep'); // call function to handle deletion
                }
                // else if activity pagination button was clicked
                else if (event.target.classList.contains('activity-pagination')) {
                        let pageNumber = parseInt(event.target.textContent) - 1;
                        goToPage(pageNumber); //call goToPage function to start process of presenting current page
                }
                // else if sleep pagination button was clicked
                else if (event.target.classList.contains('sleep-pagination')) {
                        let pageNumber = parseInt(event.target.textContent) - 1;
                        goToPageSleep(pageNumber); //call goToPage function to start process of presenting current page
                }

        });

        // helper function to show or hide workout and wellness details
        function handleShowColumnDetails(columns, showHyperlink, hideHyperlink){
                console.log(columns);
                // loop through hidden columns
                for (let i = 0; i < columns.length; i++) {
                        console.log(columns[i].style.display);
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
        // function to hide rows not on current page and show rows on current page
        function showPage(page) {
                let start = page * rowsPerPage + 1; // calculate start of rows
                let end = (page + 1) * rowsPerPage; // calculate end of rows
                
                // loop through rows of the table, , 
                for (let i = 1; i < table.rows.length; i++) {
                        // if row is within range show
                        if (i >= start && i <= end) {
                                table.rows[i].style.display = "";
                        // else if outside of range hide
                        } else {
                                table.rows[i].style.display = "none";
                        }
                } 
        }
        
        // function if previous page button is clicked
        function previousPage() {
                if (currentPage > 0) {
                        currentPage--; // update current page
                        showPage(currentPage); // call show page function with updated current page
                        setActiveButton(currentPage); // call set active button function to underline current page
                }
        }
        
        // function if next page button is clicked
        function nextPage() {
                if (currentPage < Math.floor(table.rows.length / rowsPerPage)) {
                        currentPage++; // increment current page
                        showPage(currentPage); // call show page function with updated current page
                        setActiveButton(currentPage); // call set active button function to underline current page
                }
        }

        function goToPage(page) {
                currentPage = page; // set currentPage variable with page called into function
                showPage(currentPage); // Call show page function to display correct page rows
                setActiveButton(page); // call set active button function to underline current page
        }

        // Function to set the active button and underline the current page number
        function setActiveButton(pageNumber) {
                const paginationButtons = document.getElementById("page-numbers").getElementsByTagName("a");
        
                for (let i = 0; i < paginationButtons.length; i++) {
                        if (i === pageNumber) {
                                paginationButtons[i].classList.add("active");
                                paginationButtons[i].style.textDecoration = "underline";
                        } else {
                                paginationButtons[i].classList.remove("active");
                                paginationButtons[i].style.textDecoration = "none";
                        }
                }
        }
                
        // Generate pagination buttons dynamically
        function generatePaginationButtons() {
                let totalPages = Math.floor((table.rows.length - 1) / rowsPerPage); // calculate total number of pages
                let pageNumbersDiv = document.getElementById("page-numbers"); // create new div element for buttons
                pageNumbersDiv.innerHTML = ""; // define inner HTML

                // if there is a remainder after dividing by 30, than add a page to account for additional rows
                // subtracting 1 from rows length to exclude the table header row
                if ((table.rows.length - 1) % rowsPerPage !== 0) {
                        totalPages++; // Add 1 if there is a remainder
                }
        
                // loop through total number of pages to create buttons
                for (let i = 0; i < totalPages; i++) {
                        const pageNumberLink = document.createElement("a"); // create HTML element
                        pageNumberLink.textContent = i + 1; // set page number to show
                        pageNumberLink.href = "#history-page-container"; // Set the href attribute for the hyperlink
                        pageNumberLink.classList.add("activity-pagination"); // set class
                        pageNumbersDiv.appendChild(pageNumberLink); // append HTML element

                        // add the 'active' class to the current page button and underline it
                        if (i === currentPage) {
                                pageNumberLink.classList.add("active");
                                pageNumberLink.style.textDecoration = "underline";
                        }
                }
        }
                        
// IMPLEMENT PAGINATION FOR SLEEP LOGGING
        // Function that "shows" page by hiding rows of table that don't fall within range of "current page"
        function showPageSleep(page) {
                let start = page * rowsPerPage + 1; // define row that starts the page
                let end = (page + 1) * rowsPerPage; // define row that ends the page
                
                // loop through all rows, hiding rows outside of range, showing rows within range
                for (let i = 1; i < sleepTable.rows.length; i++) {
                        if (i >= start && i <= end) {
                                sleepTable.rows[i].style.display = "";
                        } else {
                                sleepTable.rows[i].style.display = "none";
                        }
                }
        }

        // function called when previous page button is clicked, which calls show page function -1 page
        function previousPageSleep() {
                if (currentPageSleep > 0) {
                        currentPageSleep--;
                        showPageSleep(currentPageSleep);
                        setActiveButtonSleep(currentPageSleep); // call setActiveButton Function to activate underline on current page
                }
        }

        // function called when next page button is clicked, which calls show page function +1 page
        function nextPageSleep() {
                if (currentPageSleep < Math.floor(sleepTable.rows.length / rowsPerPage)) {
                        currentPageSleep++;
                        showPageSleep(currentPageSleep);
                        setActiveButtonSleep(currentPageSleep); // call setActiveButton Function to activate underline on current page
                }
        }

        // Function to "go to" page that is clicked by calling show page function
        function goToPageSleep(page) {
                currentPageSleep = page; // set currentPageSleep variable with page that calls into the function
                showPageSleep(currentPageSleep); //call show page function
                setActiveButtonSleep(page); // call setActiveButton Function to activate underline on current page
        }

        // Function to set the active button and underline the current page number
        function setActiveButtonSleep(pageNumber) {
                const paginationButtons = document.getElementById("page-numbers-sleep").getElementsByTagName("a");
        
                for (let i = 0; i < paginationButtons.length; i++) {
                        if (i === pageNumber) {
                                paginationButtons[i].classList.add("active");
                                paginationButtons[i].style.textDecoration = "underline";
                        } else {
                                paginationButtons[i].classList.remove("active");
                                paginationButtons[i].style.textDecoration = "none";
                        }
                }
        }
                
        // Generate pagination buttons dynamically
        function generatePaginationButtonsSleep() {
                // calculate total number of pages based on rows, without rounding up, subtracting 1 for the header row of table
                let totalPages = Math.floor((sleepTable.rows.length - 1) / rowsPerPage); 
                let pageNumbersDiv = document.getElementById("page-numbers-sleep"); // get page numbers div placeholder
                pageNumbersDiv.innerHTML = "";

                // if there is a remainder after dividing by 30, than add a page to account for additional rows
                // subtracting 1 from rows length to exclude the table header row
                if ((sleepTable.rows.length - 1) % rowsPerPage !== 0) {
                        totalPages++; // Add 1 if there is a remainder
                }

                // Loop through pages to create and append
                for (let i = 0; i < totalPages; i++) {
                        const pageNumberLink = document.createElement("a");
                        pageNumberLink.textContent = i + 1; //calculate page number
                        pageNumberLink.href = "#sleep-history-table-container"; // Set the href attribute for the hyperlink
                        pageNumberLink.classList.add("sleep-pagination");
                        pageNumbersDiv.appendChild(pageNumberLink); // append pagination buttons

                         // add the 'active' class to the current page button and underline it
                        if (i === currentPageSleep) {
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