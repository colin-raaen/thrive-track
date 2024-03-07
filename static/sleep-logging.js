import { validateYNField } from './helpers.js';
import { validateFieldEntry } from './helpers.js';

//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
        // VARIABLES FOR SLEEP ENTRY FORM
        // USED FOR ADDING NAP AND WAKE UP EARLY DETAILS (used when need to rehide fields from "no" checkbox selections)
        // AND FIELD VALIDATIONS RULES
        const napTimeRow = document.getElementById("napTimeHiddenRow");
        const napYesCheckbox = document.getElementById("nap-yes");
        const napNoCheckbox = document.getElementById("nap-no");
        const napTimeInputHour = document.getElementById("napTimeHour");
        const napTimeInputMin = document.getElementById("napTimeMin");
        const wakeUpEarlyTimeRow = document.getElementById("wakeUpEarlyHiddenRow");
        const wakeUpEarlyYesCheckbox = document.getElementById("earlier-yes");
        const wakeUpEarlyNoCheckbox = document.getElementById("earlier-no");
        const wakeUpEarlyHour = document.getElementById("wakeUpEarlyHour");
        const wakeUpEarlyMin = document.getElementById("wakeUpEarlyMin");
        const timesWokenUpInput = document.getElementById("timesWokenUp");
        const timesWokenUpRow = document.getElementById("awokenTimeHiddenRow");
        const timeAwokenHourInput = document.getElementById("timeAwokenHour");
        const timeAwokenMinInput = document.getElementById("timeAwokenMin");
        const travellingYesCheckbox = document.getElementById("travel-yes");
        const travellingNoCheckbox = document.getElementById("travel-no");
        const timeInBedInput = document.getElementById("bedTime");
        const sleepAttemptInput = document.getElementById("sleepAttempt");
        const timeToSleepInputHour = document.getElementById("timeToSleepHour");
        const timeToSleepInputMin = document.getElementById("timeToSleepMin");
        const finalAwakeningInput = document.getElementById("finalAwakening");
        const timeOutOfBedInput = document.getElementById("outOfBed");
        const sleepRatingInput = document.getElementById("rateSleep"); 
        const sleepDateInput = document.getElementById("sleep-date");     

        //JAVASCRIPT TO SET DATE INPUT TO TODAY'S DATE
        // Get today's date
        let today = new Date();

        // Format the date as YYYY-MM-DD
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let formattedDate = yyyy + '-' + mm + '-' + dd;

        // Set the value of the input field to today's date
        sleepDateInput.value = formattedDate;

        // UNHIDE NAP TIME ENTRY IF YES IS SELECTED
        // Listen for changes to the Sleep entry form
        document.querySelector('form').addEventListener('click', function(event){       
                //If event that was clicked is Yes Nap Checkbox is checked, unhide row
                if (event.target === napYesCheckbox && napYesCheckbox.checked === true){
                        // Unhide Nap time entry
                        napTimeRow.style.display = 'table-row';
                }

                //If Yes Nap Checkbox is unchecked, or if No Nap Checkbox is checked, then hide row
                else if ((event.target === napYesCheckbox && napYesCheckbox.checked === false) || 
                        (event.target === napNoCheckbox && napNoCheckbox.checked === true)){
                        // Hide Nap time entry
                        napTimeRow.style.display = 'none';
                }

                //If event that was clicked is Yes Woke up early Checkbox is checked, unhide row
                if (event.target === wakeUpEarlyYesCheckbox && wakeUpEarlyYesCheckbox.checked === true){
                        // Unhide Wake Up early time entry
                        wakeUpEarlyTimeRow.style.display = 'table-row';
                }

                //If Yes Wake Up Early Checkbox is unchecked, OR if No Wake Up Early Checkbox is checked, then hide row
                else if ((event.target === wakeUpEarlyYesCheckbox && wakeUpEarlyYesCheckbox.checked === false) ||
                        (event.target === wakeUpEarlyNoCheckbox && wakeUpEarlyNoCheckbox.checked === true)){
                        // Hide Wake Up early time entry
                        wakeUpEarlyTimeRow.style.display = 'none';
                }
        });
        
        // Listen for changes on the entire Sleep Logging entry form
        document.querySelector('form').addEventListener('change', function(event) {
                // SHOW OR HIDE TIME AWAKE BASED ON NUMBER OF TIMES AWOKEN VALUE
                // if number of awakenings was target and is greater than 0
                if (event.target === timesWokenUpInput && timesWokenUpInput.value > 0) {
                        timesWokenUpRow.style.display = 'table-row'; // Show amount of time awake input
                }

                // if number of awakenings was target and is 0
                else if (event.target === timesWokenUpInput && parseInt(timesWokenUpInput.value) === 0) {
                        timesWokenUpRow.style.display = 'none'; // hide amount of time awake input
                }
        });         

        // JAVASCRIPT TO PERFORM FIELD VALIDATIONS ON SLEEP FORM SUBMISSION
        // fucnction that is called on form submission to perform validations
        function validateForm() {
                // store array of fields Y/N fields to validate, storing yes checkbox, no checkbox, and field name for error message
                const validationFields = [
                        { checkbox: napYesCheckbox, errorMessage: "Nap", negativeCheckbox: napNoCheckbox },
                        { checkbox: wakeUpEarlyYesCheckbox, errorMessage: "Wake Up Early", negativeCheckbox: wakeUpEarlyNoCheckbox },
                        { checkbox: travellingYesCheckbox, errorMessage: "Travelling", negativeCheckbox: travellingNoCheckbox },
                ];

                // for every field in the array of stored fields, call the validateYN helper function with the field inputs
                // if any field returns false, the entire statement returns false and only throws one error message
                // for first field found with an error
                let boolYesNoFieldCheck = validationFields.every(field => validateYNField(field.checkbox, field.errorMessage, field.negativeCheckbox));
                // If a yes/no field doesn't pass validation checks, return false and display error, else continue to next validation check
                if (boolYesNoFieldCheck === false){
                        return false;
                }  
                // array or validations checks on form submission and error messages to throw if true
                const validations = [
                        { condition: napYesCheckbox.checked && napTimeInputHour.value === "" && napTimeInputMin.value === "", message: 'Please ensure length of nap time is filled out.' },
                        { condition: timeInBedInput.value === "", message: 'Please ensure the time you got into bed is filled out.' },
                        { condition: sleepAttemptInput.value === "", message: 'Please ensure the time you attempted to sleep is filled out.' },
                        { condition: timeToSleepInputHour.value === "" && timeToSleepInputMin.value === "", message: 'Please ensure the time it took you to fall asleep is filled out.' },
                        { condition: timesWokenUpInput.value === "", message: 'Please ensure the number of times woken up is filled out.' },
                        { condition: timesWokenUpInput.value > 0 && timeAwokenHourInput.value === "" && timeAwokenMinInput.value === "", message: 'Please ensure the amount of time woken up is filled out.' },
                        { condition: finalAwakeningInput.value === "", message: 'Please ensure the time of final awakening is filled out.' },
                        { condition: wakeUpEarlyYesCheckbox.checked && wakeUpEarlyHour.value === "" && wakeUpEarlyMin.value === "", message: 'Please ensure the amount of time woken up early is filled out.'},
                        { condition: timeOutOfBedInput.value === "", message: 'Please ensure the time you got out of bed is filled out.' },
                        { condition: sleepRatingInput.value === "defaultSleepRating", message: 'Please ensure you rate your sleep quality.' }
                ];

                // Call field validation helper function to loop through validation checks, alert if condition found
                if (!validateFieldEntry(validations)) {
                        return false; // If validation fails, prevent form submission
                }

                // If time to sleep hour or min is input, and other value is null, populate with 0
                if (timeToSleepInputHour.value !== null && timeToSleepInputMin.value === ""){
                        timeToSleepInputMin.value = 0;
                }

                if (timeToSleepInputHour.value === "" && timeToSleepInputMin.value !== null){
                        timeToSleepInputHour.value = 0;
                }

                // If number of times woken up is 0 than fill 0's for time woken up
                if (timesWokenUpInput.value === "0"){
                        // assign zero values to hours and minutes
                        timeAwokenHourInput.value = 0;
                        timeAwokenMinInput.value = 0;
                }

                //if number of times woken up is greater than 0, and hour input has value and minutes is left blank, zero out minutes
                if (timesWokenUpInput.value > 0 && timeAwokenHourInput.value >= 0 && timeAwokenMinInput.value === ""){
                        // zero out minutes
                        timeAwokenMinInput.value = 0;
                }

                // if number of times woken up is greater than 0, and minute input has value and hour is left blank, zero out
                if (timesWokenUpInput.value > 0 && timeAwokenHourInput.value === "" && timeAwokenMinInput.value >= 0){
                        // zero out minutes
                        timeAwokenHourInput.value = 0;
                }

        //FIELD VALIDATIONS TO CHECK IF HOURS SLEPT IS LESS THAN 5 OR GREATER THAN 10
                // Convert Min and Hour inputs to int's or to 0 if there is no input
                let timeToSleepMinIntValue = parseInt(timeToSleepInputMin.value);
                let timeToSleepHourIntValue = parseInt(timeToSleepInputHour.value);

                // Create new date object and store value of Date Input into Date object
                let selectedDate = new Date(sleepDateInput.value);
                // call function to store new values in a date time object
                let sleepAttemptDateObject = dateTimeHelper(selectedDate, sleepAttemptInput.value);
                //variable to check if Sleep attempt is AM or PM
                let sleepAttemptCheck = sleepAttemptDateObject.getHours();

                // if Sleep attempt is in the AM, then add day to date object
                if (0 <= sleepAttemptCheck && sleepAttemptCheck < 12){
                        sleepAttemptDateObject.setDate(sleepAttemptDateObject.getDate() + 1);
                }

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
                                // call function to store new values in a date time object
                                inBedDateTime = dateTimeHelper(selectedDate, timeInBedInput.value);
                        }
                        else if (timeInBedCheck < 12) { //time in bed is AM
                                // call function to store new values in a date time object
                                inBedDateTime = dateTimeHelper(selectedDate, timeInBedInput.value);
                                inBedDateTime.setDate(inBedDateTime.getDate() + 1);
                        }

                        // array of validations checks on form submission and error messages to throw if true
                        const validations = [ { condition: sleepAttemptDateObject < inBedDateTime, message: 'Please ensure the time in bed is earlier than time attempt to sleep' } ];
                        // Call field validation helper function to loop through validation checks, alert if condition found
                        if (!validateFieldEntry(validations)) {
                                return false; // If validation fails, prevent form submission
                        }
                } catch (error){
                        console.log(error);
                }

                // CONTINUE CALCUATION FOR HOURS SLEPT
                // Add time to fall asleep to time attempted to sleep to get time actually fell asleep
                // Create new Date Object and add minutes (milliseconds * 60000) and hours 
                let sleepAttemptPlusTimeToSleep = new Date(sleepAttemptDateObject.getTime() + (timeToSleepMinIntValue * 60000) + (timeToSleepHourIntValue * 3600000)); 

                // Split the string by the ":" character
                let finalAwakeningSplit = (finalAwakeningInput.value).split(":");
                // Extract the first two digits (hours) and store them in a variable
                let finalAwakeningCheck = parseInt(finalAwakeningSplit[0].trim());

                //variable to check if final time asleep is AM or PM
                let finalTimeAsleepCheck = sleepAttemptPlusTimeToSleep.getHours();

                // define Final Awakening Date Object
                let finalAwakeningDateTime;
                
                // Store the value of the final time awoken input in Date object  
                // if final time asleep is AM, than use same day date for final awakening
                if (finalTimeAsleepCheck < 12){
                        // call function to store new values in a date time object
                        finalAwakeningDateTime = dateTimeHelper(sleepAttemptPlusTimeToSleep, finalAwakeningInput.value);
                }
                //else if time asleep is PM and final awakening is PM use same day for final awakening
                else if (12 <= finalTimeAsleepCheck && finalTimeAsleepCheck < 24 && 12 <= finalAwakeningCheck && finalAwakeningCheck < 24){
                        // call function to store new values in a date time object
                        finalAwakeningDateTime = dateTimeHelper(sleepAttemptPlusTimeToSleep, finalAwakeningInput.value);
                }
                else { //Time asleep is PM and final awakening is AM
                        // call function to store new values in a date time object
                        finalAwakeningDateTime = dateTimeHelper(sleepAttemptPlusTimeToSleep, finalAwakeningInput.value);
                        finalAwakeningDateTime.setDate(finalAwakeningDateTime.getDate() + 1);
                }
                
                // SPLICING IN FIELD VALIDATION TO ENSURE TIME OUT OF BED IS LATER THAN TIME WOKEN UP
                // call function to store new values in a date time object
                let outOfBedDateTime = dateTimeHelper(finalAwakeningDateTime, timeOutOfBedInput.value);

                // array or validations checks on form submission and error messages to throw if true
                const wakeUpCheck = [ { condition: outOfBedDateTime < finalAwakeningDateTime, message: 'Please ensure the time out of bed is later than final time woken up' } ];
                // Call field validation helper function to loop through validation checks, alert if condition found
                if (!validateFieldEntry(wakeUpCheck)) {
                        return false; // If validation fails, prevent form submission
                }
            
                // CONTINUING HOURS SLEPT CALCUATION
                // variable to store time difference between final awakening and time asleep
                let timeDiff = 0;
                // Check if final awakening is on the same day as actual time fell asleep
                if (finalAwakeningDateTime.toDateString() === sleepAttemptPlusTimeToSleep.toDateString()) {
                        // Same day, calculate the time difference normally
                        timeDiff = finalAwakeningDateTime.getTime() - sleepAttemptPlusTimeToSleep.getTime();
                } else {
                        // Different days, calculate the time difference accounting for the day change
                        let midnight = new Date(sleepAttemptPlusTimeToSleep.getFullYear(), sleepAttemptPlusTimeToSleep.getMonth(), sleepAttemptPlusTimeToSleep.getDate() + 1, 0, 0, 0);
                        timeDiff = (midnight.getTime() - sleepAttemptPlusTimeToSleep.getTime()) + (finalAwakeningDateTime.getTime() - midnight.getTime());
                }

                // Convert the time difference to hours and minutes
                let hoursDiff = timeDiff / (1000 * 60 * 60);
                let minutesdiff = hoursDiff * 60;

                // subtract amount of time woken up
                // Convert Min and Hour inputs to int's
                let timeAwokenMinInt = parseInt(timeAwokenMinInput.value);
                let timeAwokenpHourInt = parseInt(timeAwokenHourInput.value);

                //Convert Hours to Min
                timeAwokenMinInt += timeAwokenpHourInt * 60;
                // subtract time awoken from minutesdiff
                let finalAmountTimeSlept = minutesdiff - timeAwokenMinInt;

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
        document.getElementById('sleep-form').onsubmit = validateForm;  
        
        function dateTimeHelper(date, time){
                // Returns string in Eastern Time Zone format to offset timezone
                let formattedDate = date.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "short" });
                // Stage date and time of awakening     
                let finalDateTime = formattedDate + " " + time;     
                // define Time out of Bed Date Object
                return new Date(finalDateTime); // create new date Object and store values
        }
});