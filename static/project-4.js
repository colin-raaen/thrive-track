//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function()
{

// IMPLEMENT PAGINATION AND DELETE BUTTONS FOR ACTIVITY LOGGING
        var table = document.getElementById("activity-history"); // Get and store activity history HTML Table
        var rowsPerPage = 30; // Number of rows to show
        var currentPage = 0; // First page
        
        // function to hide rows not on current page and show rows on current page
        function showPage(page) {
                var start = page * rowsPerPage + 1; // calculate start of rows
                var end = (page + 1) * rowsPerPage; // calculate end of rows
                
                // loop through rows of the table, , 
                for (var i = 1; i < table.rows.length; i++) {
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
                let paginationButtons = document.getElementById("page-numbers").getElementsByTagName("a");
        
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
                for (var i = 0; i < totalPages; i++) {
                        var pageNumberLink = document.createElement("a");
                        pageNumberLink.textContent = i + 1;
                        // Set the href attribute for the hyperlink
                        pageNumberLink.href = "#history-page-container";

                        // add listener event to hyperlink
                        pageNumberLink.addEventListener("click", function() {
                                var pageNumber = parseInt(this.textContent) - 1;
                                goToPage(pageNumber); //call goToPage function to start process of presenting current page
                        });
                        pageNumbersDiv.appendChild(pageNumberLink);

                        // add the 'active' class to the current page button and underline it
                        if (i === currentPage) {
                                pageNumberLink.classList.add("active");
                                pageNumberLink.style.textDecoration = "underline";
                        }
                }
        }

        // Attach event listeners to the buttons
        let previousButton = document.getElementById("previous-button");
        previousButton.addEventListener("click", previousPage);

        let nextButton = document.getElementById("next-button");
        nextButton.addEventListener("click", nextPage);
                        
        // Show the first page initially
        showPage(currentPage);

        // Generate pagination buttons
        generatePaginationButtons();

// IMPLEMENT PAGINATION FOR SLEEP LOGGING
        let sleepTable = document.getElementById("sleep-history"); // Get and store activity history HTML Table
        let currentPageSleep = 0; // First page

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
                console.log("nextPage function");
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
                var paginationButtons = document.getElementById("page-numbers-sleep").getElementsByTagName("a");
        
                for (var i = 0; i < paginationButtons.length; i++) {
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

                console.log("sleep table rows Length: " + sleepTable.rows.length);
                console.log("total pages calculated: " + totalPages);

                // if there is a remainder after dividing by 30, than add a page to account for additional rows
                // subtracting 1 from rows length to exclude the table header row
                if ((sleepTable.rows.length - 1) % rowsPerPage !== 0) {
                        totalPages++; // Add 1 if there is a remainder
                }

                console.log("total pages after if statement: " + totalPages);

                // Loop through pages to create and append
                for (let i = 0; i < totalPages; i++) {
                        let pageNumberLink = document.createElement("a");
                        //calculate page number
                        pageNumberLink.textContent = i + 1;
                        // Set the href attribute for the hyperlink
                        pageNumberLink.href = "#sleep-history-table-container";
                        // add listener for generated hyperlink
                        pageNumberLink.addEventListener("click", function() {
                                let pageNumber = parseInt(this.textContent) - 1;
                                goToPageSleep(pageNumber);
                        });
                        pageNumbersDiv.appendChild(pageNumberLink); // append pagination buttons

                         // add the 'active' class to the current page button and underline it
                        if (i === currentPageSleep) {
                                pageNumberLink.classList.add("active");
                                pageNumberLink.style.textDecoration = "underline";
                        }
                }
        }

        // Attach event listeners to the buttons
        let previousButtonSleep = document.getElementById("previous-button-sleep");
        previousButtonSleep.addEventListener("click", previousPageSleep);

        let nextButtonSleep = document.getElementById("next-button-sleep");
        nextButtonSleep.addEventListener("click", nextPageSleep);
                        
        // Show the first page initially
        showPageSleep(currentPageSleep);
        console.log("after showPage function call");

        // Generate pagination buttons
        generatePaginationButtonsSleep();

// DELETE ROWS OF ACTIVITY DATA WHEN CLICKED
        let deleteLinksActivity = document.querySelectorAll('.delete-link-activity'); // collect all delete links from rows
        console.log(deleteLinksActivity);

        deleteLinksActivity.forEach(function(link) { // loop through each delete link
                link.addEventListener('click', function(e) { // add listener event to each link
                        e.preventDefault(); // prevent default hyperlink behavior
                        // confirmation message presented to user, are you sure you want to delete?
                        if (confirm('Are you sure you want to delete this row?')) {
                                let rowId = this.getAttribute('activity-data-row-id'); // store sleep logging id
                                // call delete row function with rowId and data type
                                deleteRow('activity', rowId);
                        }
                });
        });

// DELETE ROWS OF SLEEP DATA WHEN CLICKED
        let deleteLinks = document.querySelectorAll('.delete-link'); // collect all delete links from rows
        console.log(deleteLinks);

        deleteLinks.forEach(function(link) { // loop through each delete link
                link.addEventListener('click', function(e) { // add listener event to each link
                        e.preventDefault(); // prevent default hyperlink behavior
                        // confirmation message presented to user, are you sure you want to delete?
                        if (confirm('Are you sure you want to delete this row?')) {
                                let rowId = this.getAttribute('sleep-data-row-id'); // store sleep logging id
                                // call delete row function with rowId
                                deleteRow('sleep', rowId);
                        }
                });
        });

        // Function to delete the row of data, input of which table data is coming from and row ID to identifty data in database
        function deleteRow(dataType, rowId) {
                let xhr = new XMLHttpRequest(); // make new instance of XMLHttpRequest object
                xhr.open('POST', '/history', true); // initializes request, type POST, endpoint, and true indicates it should be asynchronous
                xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE){ 
                                if (xhr.status === 200) {
                                        // Handle successful deletion
                                        // You can update the table dynamically or perform any other actions
                                        console.log('Row deleted successfully');
                                        location.reload(); // Reload the page
                                } else {
                                        // Handle error
                                        console.error('An error occurred while deleting the row');
                                }
                        }
                };
                // sends the request to the server with the request body containing the row_id parameter (sleep_logging id). 
                // The encodeURIComponent() function is used to properly encode the rowId value.
                xhr.send(dataType + '_row_id=' + encodeURIComponent(rowId));
        }

// SHOW WORKOUT TYPES WHEN "SHOW" HYPERLINK IS CLICKED
        // store "Show workout details" hyperlink
        let showWorkoutHyperlink = document.getElementById('show-workouts-hyperlink');
        let hideWorkoutHyperlink = document.getElementById('hide-workouts-hyperlink');

        // Add event listener to the "show-workouts" hyperlink
        document.getElementById("show-workouts-hyperlink").addEventListener("click", function() {
                // Store workout columns that are hidden
                let workoutColumns = document.getElementsByClassName("hidden-history-column");
                // loop through hidden columns
                for (let i = 0; i < workoutColumns.length; i++) {
                        //adds the "hidden-column" class to the element if it's not present, and removes it if it's already present. 
                        workoutColumns[i].style.display = 'table-cell';
                }
                // hide "show workout details" hyperlink
                showWorkoutHyperlink.style.display = 'none';
                // Show "hide workout details" hyperlink
                hideWorkoutHyperlink.style.display = 'block';
        });

// REHIDE WORKOUT TYPES WHEN "HIDE" HYPERLINK IS CLICKED
        // Add event listener to the "hide-workouts" hyperlink
        document.getElementById("hide-workouts-hyperlink").addEventListener("click", function() {
                // Store workout columns that appeared that will be rehidden
                var workoutColumns = document.getElementsByClassName("hidden-history-column");
                // loop through hidden columns
                for (var i = 0; i < workoutColumns.length; i++) {
                        //removes the "hidden-column" class to the element if it's not present 
                        workoutColumns[i].style.display = 'none';
                }
                // hide "show workout details" hyperlink
                showWorkoutHyperlink.style.display = 'block';
                // Show "hide workout details" hyperlink
                hideWorkoutHyperlink.style.display = 'none';
        });

// SHOW WELLNESS TYPES WHEN "SHOW" HYPERLINK IS CLICKED
        // store "Show workout details" hyperlink
        let showWellnessHyperlink = document.getElementById('show-wellness-hyperlink');
        let hideWellnessHyperlink = document.getElementById('hide-wellness-hyperlink');

        // Add event listener to the "show-workouts" hyperlink
        document.getElementById("show-wellness-hyperlink").addEventListener("click", function() {
                // Store workout columns that are hidden
                let wellnessColumns = document.getElementsByClassName("hidden-wellness-type-column");
                // loop through hidden columns
                for (var i = 0; i < wellnessColumns.length; i++) {
                        //adds the "hidden-column" class to the element if it's not present, and removes it if it's already present. 
                        wellnessColumns[i].style.display = 'table-cell';
                }
                // hide "show workout details" hyperlink
                showWellnessHyperlink.style.display = 'none';
                // Show "hide workout details" hyperlink
                hideWellnessHyperlink.style.display = 'block';
        });

// REHIDE WELLNESS TYPES WHEN "HIDE" HYPERLINK IS CLICKED
        // Add event listener to the "hide-workouts" hyperlink
        document.getElementById("hide-wellness-hyperlink").addEventListener("click", function() {
                // Store workout columns that appeared that will be rehidden
                let wellnessColumns = document.getElementsByClassName("hidden-wellness-type-column");
                // loop through hidden columns
                for (var i = 0; i < wellnessColumns.length; i++) {
                        //removes the "hidden-column" class to the element if it's not present 
                        wellnessColumns[i].style.display = 'none';
                }
                // hide "show workout details" hyperlink
                showWellnessHyperlink.style.display = 'block';
                // Show "hide workout details" hyperlink
                hideWellnessHyperlink.style.display = 'none';
        });
});