//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function()
{
        // VARIABLES FOR SLEEP ENTRY FORM
        // USED FOR ADDING NAP AND WAKE UP EARLY DETAILS (used when need to rehide fields from "no" checkbox selections)
        // AND FIELD VALIDATIONS RULES
        let napTimeRow = document.getElementById("napTimeHiddenRow");
        let napYesCheckbox = document.getElementById("nap-yes");
        let napNoCheckbox = document.getElementById("nap-no");
        let napTimeInputHour = document.getElementById("napTimeHour");
        let napTimeInputMin = document.getElementById("napTimeMin");
        let wakeUpEarlyTimeRow = document.getElementById("wakeUpEarlyHiddenRow");
        let wakeUpEarlyYesCheckbox = document.getElementById("earlier-yes");
        let wakeUpEarlyNoCheckbox = document.getElementById("earlier-no");
        let timesWokenUpInput = document.getElementById("timesWokenUp");
        let timesWokenUpRow = document.getElementById("awokenTimeHiddenRow");
        let timeAwokenHourInput = document.getElementById("timeAwokenHour");
        let timeAwokenMinInput = document.getElementById("timeAwokenMin");
        let travellingYesCheckbox = document.getElementById("travel-yes");
        let travellingNoCheckbox = document.getElementById("travel-no");
        let timeInBedInput = document.getElementById("bedTime");
        let sleepAttemptInput = document.getElementById("sleepAttempt");
        let timeToSleepInputHour = document.getElementById("timeToSleepHour");
        let timeToSleepInputMin = document.getElementById("timeToSleepMin");
        let finalAwakeningInput = document.getElementById("finalAwakening");
        let timeOutOfBedInput = document.getElementById("outOfBed");
        let sleepRatingInput = document.getElementById("rateSleep"); 
        let sleepDateInput = document.getElementById("sleep-date");     

        
     // Check to ensure sleep entry page is triggering the event by checking if add workout button exists
     if (napYesCheckbox){
        //JAVASCRIPT TO SET DATE INPUT TO TODAY'S DATE
                // Get the input element
                let sleepDateInput = document.getElementById('sleep-date');

                // Get today's date
                let today = new Date();

                // Format the date as YYYY-MM-DD
                let yyyy = today.getFullYear();
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let dd = String(today.getDate()).padStart(2, '0');
                let formattedDate = yyyy + '-' + mm + '-' + dd;

                // Set the value of the input field to today's date
                sleepDateInput.value = formattedDate;

        // JAVASCRIPT TO PERFORM FIELD VALIDATIONS ON SLEEP FORM SUBMISSION
        // fucnction that is called on form submission to perform validations
        function validateForm() {
                
                // Helper Function that is called to validate each yes/no field, with yes checkbox, no checkbox and field name as input
                function validateYNField(yesCheckbox, errorMessage, noCheckbox) {
                        //If neither yes or no checkbox is selected
                        if (!yesCheckbox.checked && !noCheckbox.checked) {
                                alert(`Please check either "Yes" or "No" for the ${errorMessage} checkbox.`); //Send alert message
                                return false; // return false for field validation check
                                }
                                return true; //passed validation
                };

                // store array of fields Y/N fields to validate, storing yes checkbox, no checkbox, and field name for error message
                const validationFields = [
                        { checkbox: napYesCheckbox, errorMessage: "Nap", negativeCheckbox: napNoCheckbox },
                        { checkbox: wakeUpEarlyYesCheckbox, errorMessage: "Wake Up Early", negativeCheckbox: wakeUpEarlyNoCheckbox },
                        { checkbox: travellingYesCheckbox, errorMessage: "Travelling", negativeCheckbox: travellingNoCheckbox },
                        ];

                // for every field in the array of stored fields, call the validateYN function with the field inputs
                // if any field returns false, the entire statement returns false and only throws one error message
                // for first field found with an error
                let boolYesNoFieldCheck = validationFields.every(field => validateYNField(field.checkbox, field.errorMessage, field.negativeCheckbox));
                // If a yes/no field doesn't pass validation checks, return false and display error, else continue to next validation check
                if (boolYesNoFieldCheck === false){
                        return false;
                }  

                //Ensure nap time is input if nap Yes is selected
                if (napYesCheckbox.checked === true && napTimeInputHour.value === "" && napTimeInputMin.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure length of nap time is filled out.');
                        return false;
                }

                //Ensure time in bed is input
                if (timeInBedInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the time you got into bed is filled out.');
                        return false;
                }

                //Ensure time attempted to fall asleep is input
                if (sleepAttemptInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the time you attempted to sleep is filled out.');
                        return false;
                }

                //Ensure time to fall asleep is input
                if (timeToSleepInputHour.value === "" && timeToSleepInputMin.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the time it took you to fall asleep is filled out.');
                        return false;
                }

                // If time to sleep hour or min is input, and other value is null, populate with 0
                if (timeToSleepInputHour.value !== null && timeToSleepInputMin.value === ""){
                        timeToSleepInputMin.value = 0;
                        console.log(timeToSleepInputMin.value);
                }
                if (timeToSleepInputHour.value === "" && timeToSleepInputMin.value !== null){
                        timeToSleepInputHour.value = 0;
                }

                //Ensure number of times woken up is input
                if (timesWokenUpInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the number of times woken up is filled out.');
                        return false;
                }

                // If number of times woken up is 0 than fill 0's for time woken up
                if (timesWokenUpInput.value === "0"){
                        // assign zero values to hours and minutes
                        timeAwokenHourInput.value = 0;
                        timeAwokenMinInput.value = 0;
                }

                //if number of times woken up is greater than 0, ensure time awoken in input
                if (timesWokenUpInput.value > 0 && timeAwokenHourInput.value === "" && timeAwokenMinInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the amount of time woken up is filled out.');
                        return false;
                }

                //if number of times woken up is greater than 0, and hour input has value and minutes is left blank, zero out
                if (timesWokenUpInput.value > 0 && timeAwokenHourInput.value > 0 && timeAwokenMinInput.value === ""){
                        // zero out minutes
                        timeAwokenMinInput.value = 0;
                }

                //if number of times woken up is greater than 0, and hour input has value and minutes is left blank, zero out
                if (timesWokenUpInput.value > 0 && timeAwokenHourInput.value === "" && timeAwokenMinInput.value > 0){
                        // zero out minutes
                        timeAwokenHourInput.value = 0;
                }

                // If minutes woken up is 0 and hours is left blank, than fill 0
                if (timeAwokenHourInput.value === "" && timeAwokenMinInput.value === "0"){
                        // assign zero values to hours and minutes
                        timeAwokenHourInput.value = 0;
                }

                // If hours woken up is 0 and minutes is left blank, than fill 0
                if (timeAwokenHourInput.value === "0" && timeAwokenMinInput.value === ""){
                        // assign zero values to hours and minutes
                        timeAwokenMinInput.value = 0;
                }

                //Ensure time of final awakening is input
                if (finalAwakeningInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the time of final awakening is filled out.');
                        return false;
                }

                //Ensure time out of bed is input
                if (timeOutOfBedInput.value === ""){
                        // throw error message and don't sumbit form
                        alert('Please ensure the time you got out of bed is filled out.');
                        return false;
                }

                //Ensure sleep quality rating is input
                if (sleepRatingInput.value === "defaultSleepRating"){
                        // throw error message and don't sumbit form
                        alert('Please ensure you rate your sleep quality.');
                        return false;
                }

        //FIELD VALIDATIONS TO CHECK IF HOURS SLEPT IS LESS THAN 5 OR GREATER THAN 10
                // Convert Min and Hour inputs to int's or to 0 if there is no input
                let timeToSleepMinIntValue = parseInt(timeToSleepInputMin.value);
                let timeToSleepHourIntValue = parseInt(timeToSleepInputHour.value);
                console.log(timeToSleepMinIntValue);
                console.log(timeToSleepHourIntValue);

                // Create new date object and store value of Date Input into Date object
                let selectedDate = new Date(sleepDateInput.value);
                // ignore the timezone offset and work with date as is, using locale String method, returns date string in Eastern Time Zone format
                let utcDateString = selectedDate.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                console.log(utcDateString);

                // Combine date input with time input and convert to Date object for calcuations
                let combinedDateTime = utcDateString + " " + sleepAttemptInput.value;
                console.log(combinedDateTime);
                let sleepAttemptDateObject = new Date(combinedDateTime);
                console.log(sleepAttemptDateObject);

                //variable to check if Sleep attempt is AM or PM
                let sleepAttemptCheck = sleepAttemptDateObject.getHours();
                console.log(sleepAttemptCheck);

                // if Sleep attempt is in the AM, then add day to date object
                if (0 <= sleepAttemptCheck && sleepAttemptCheck < 12){
                        sleepAttemptDateObject.setDate(sleepAttemptDateObject.getDate() + 1);
                        console.log("test 1");
                }
                console.log(sleepAttemptDateObject);

                //SPLICING FIELD VALIDATION TO ENSURE TIME IN BED IS EARLIER THAN SLEEP ATTEMPT
                try {
                // Split the string by the ":" character
                let timeInBedSplit = (timeInBedInput.value).split(":");
                // Extract the first two digits (hours) and store them in a variable
                let timeInBedCheck = parseInt(timeInBedSplit[0].trim());
                // define Date Time object
                let inBedDateTime;
                // if time in bed is PM
                if (12 <= timeInBedCheck && timeInBedCheck < 24){
                    // Returns string in Eastern Time Zone format to offset timezone
                    let timeInBedtring = selectedDate.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                    // Stage date and time of awakening          
                    let stagedInBedTime = timeInBedtring + " " + timeInBedInput.value;
                    // define Time out of Bed Date Object
                    inBedDateTime = new Date(stagedInBedTime); // create new date Object and store values
                    console.log(inBedDateTime);
                }
                else if (timeInBedCheck < 12) { //time in bed is AM
                    // Returns string in Eastern Time Zone format to offset timezone
                    let timeInBedtring = selectedDate.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                    // Stage date and time of awakening          
                    let stagedInBedTime = timeInBedtring + " " + timeInBedInput.value;
                    // define Time out of Bed Date Object
                    inBedDateTime = new Date(stagedInBedTime); // create new date Object and store values
                    // add day to Date Time object
                    inBedDateTime.setDate(inBedDateTime.getDate() + 1);
                    console.log(inBedDateTime);
                }
                // check if time in bed is earlier than sleep attempt
                if (sleepAttemptDateObject < inBedDateTime) {
                    // throw error message and don't sumbit form
                    alert('Please ensure the time in bed is earlier than time attempt to sleep');
                    return false;
                }
            } catch (error){
                console.log(error);
            }

                // CONTINUE CALCUATION FOR HOURS SLEPT
                // Add time to fall asleep to time attempted to sleep to get time actually fell asleep
                // Create new Date Object and add minutes (milliseconds * 60000) and hours 
                let sleepAttemptPlusTimeToSleep = new Date(sleepAttemptDateObject.getTime() + (timeToSleepMinIntValue * 60000) + (timeToSleepHourIntValue * 3600000)); 
                console.log(sleepAttemptPlusTimeToSleep);

                // Split the string by the ":" character
                let finalAwakeningSplit = (finalAwakeningInput.value).split(":");
                // Extract the first two digits (hours) and store them in a variable
                let finalAwakeningCheck = parseInt(finalAwakeningSplit[0].trim());
                console.log(finalAwakeningCheck);

                //variable to check if final time asleep is AM or PM
                let finalTimeAsleepCheck = sleepAttemptPlusTimeToSleep.getHours();
                console.log(finalTimeAsleepCheck);

                // define Final Awakening Date Object
                let finalAwakeningDateTime;
                
                // Store the value of the final time awoken input in Date object  
                // if final time asleep is AM, than use same day date for final awakening
                if (finalTimeAsleepCheck < 12){
                        // Returns string in Eastern Time Zone format to offset timezone
                        let finalAwakeningDateString = sleepAttemptPlusTimeToSleep.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                        // Stage date and time of awakening              
                        let stagedFinalAwakening = finalAwakeningDateString + " " + finalAwakeningInput.value;
                        finalAwakeningDateTime = new Date(stagedFinalAwakening); // create new date Object and store values
                        console.log("AM Test 1");
                        console.log(finalAwakeningDateTime);
                }
                //else is time asleep is PM and final awakening is PM use same day for final awakening
                else if (12 <= finalTimeAsleepCheck && finalTimeAsleepCheck < 24 && 12 <= finalAwakeningCheck && finalAwakeningCheck < 24){
                        // Returns string in Eastern Time Zone format to offset timezone
                        let finalAwakeningDateString = sleepAttemptPlusTimeToSleep.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                        // Stage date and time of awakening              
                        let stagedFinalAwakening = finalAwakeningDateString + " " + finalAwakeningInput.value;
                        finalAwakeningDateTime = new Date(stagedFinalAwakening); // create new date Object and store values
                        console.log("PM Test 2");
                        console.log(finalAwakeningDateTime);
                }
                else { //Time asleep is PM and final awakening is AM
                        // Returns string in Eastern Time Zone format to offset timezone
                        let finalAwakeningDateString = sleepAttemptPlusTimeToSleep.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                        // Stage date and time of awakening              
                        let stagedFinalAwakening = finalAwakeningDateString + " " + finalAwakeningInput.value;
                        finalAwakeningDateTime = new Date(stagedFinalAwakening); // create new date Object and store values
                        // Add day to Date Time object, different days
                        finalAwakeningDateTime.setDate(finalAwakeningDateTime.getDate() + 1);
                        console.log("PM Test 3");
                        console.log(finalAwakeningDateTime);
                }
                
                // SPLICING IN FIELD VALIDATION TO ENSURE TIME OUT OF BED IS LATER THAN TIME WOKEN UP
                // Returns string in Eastern Time Zone format to offset timezone
                let outOfBedDateString = finalAwakeningDateTime.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                // Stage date and time of awakening          
                let stagedOutOfBedTime = outOfBedDateString + " " + timeOutOfBedInput.value;
                // define Time out of Bed Date Object
                let outOfBedDateTime = new Date(stagedOutOfBedTime); // create new date Object and store values
                console.log(outOfBedDateTime);
                // if time out of bed is earlier than final awakening
                if (outOfBedDateTime < finalAwakeningDateTime) {
                    // throw error message and don't sumbit form
                    alert('Please ensure the time out of bed is later than final time woken up');
                    return false;
                }
            
                // CONTINUING HOURS SLEPT CALCUATION
                // variable to store time difference between final awakening and time asleep
                var timeDiff = 0;
                console.log(finalAwakeningDateTime.toDateString() + "Final awakening");
                console.log(sleepAttemptPlusTimeToSleep.toDateString() + "Sleep attempt plust time to sleep");
                // Check if final awakening is on the same day as actual time fell asleep
                if (finalAwakeningDateTime.toDateString() === sleepAttemptPlusTimeToSleep.toDateString()) {
                        console.log("Test: Same Day");
                        // Same day, calculate the time difference normally
                        timeDiff = finalAwakeningDateTime.getTime() - sleepAttemptPlusTimeToSleep.getTime();
                } else {
                        console.log("Test: Different Day");
                        // Different days, calculate the time difference accounting for the day change
                        let midnight = new Date(sleepAttemptPlusTimeToSleep.getFullYear(), sleepAttemptPlusTimeToSleep.getMonth(), sleepAttemptPlusTimeToSleep.getDate() + 1, 0, 0, 0);
                        timeDiff = (midnight.getTime() - sleepAttemptPlusTimeToSleep.getTime()) + (finalAwakeningDateTime.getTime() - midnight.getTime());
                }

                // Convert the time difference to hours and minutes
                let hoursDiff = timeDiff / (1000 * 60 * 60);
                console.log(hoursDiff);
                let minutesdiff = hoursDiff * 60;
                console.log(minutesdiff);

                // subtract amount of time woken up
                // Convert Min and Hour inputs to int's
                let timeAwokenMinInt = parseInt(timeAwokenMinInput.value);
                let timeAwokenpHourInt = parseInt(timeAwokenHourInput.value);

                //Convert Hours to Min
                timeAwokenMinInt += timeAwokenpHourInt * 60;
                console.log(timeAwokenMinInt);

                let finalAmountTimeSlept = minutesdiff - timeAwokenMinInt;
                console.log(finalAmountTimeSlept);

                // if less than 5 hours of sleep, trigger warning message
                if (finalAmountTimeSlept <= 300){
                        //Display confirmation dialougue
                        const sleepConfirmation = confirm(`The data entered shows that you are getting less than five hours of sleep - this can be very difficult and can affect daily functioning. It is recommended that you see a provider to discuss ways to improve your sleep. Are you sure you want to submit?`); //Send alert message
                        
                        // If "Yes" button is clicked, allow form submission
                        if (sleepConfirmation === true) {
                                return true;
                        } else {
                        // If "No" button is clicked, prevent form submission
                                return false;
                        }
                }
                // if more than 10 hours of sleep trigger warning message
                else if (finalAmountTimeSlept >= 600){
                        //Display confirmation dialougue
                        const sleepConfirmation = confirm(`The data entered suggests that you slept longer than 10 hours - is this correct?`); //Send alert message
                        
                        // If "Yes" button is clicked, allow form submission
                        if (sleepConfirmation === true) {
                                return true;
                        } else {
                        // If "No" button is clicked, prevent form submission
                                return false;
                        }
                }       
        } //close brackets on validateform function
        // Call function on activity form submission
        document.getElementById('sleepForm').onsubmit = validateForm;
        } //close brackets on sleep entry page validation
        
});