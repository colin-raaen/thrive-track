//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function()
{
        // VARIABLES FOR ADDING ADDITIONAL WORKOUT AND WELLNESS DETAILS (used when need to rehide fields from "no" checkbox selections)
        // define variable to store ADD WORKOUT button element
        const addWorkoutBtn = document.getElementById("add-workout-btn");
        // define variable to store Additional Workout details container for fields to dynamically show
        const workoutsContainer = document.getElementById("workoutsContainer");
        // define variable to store ADD WELLNESS TYPE button element
        const addWellnessBtn = document.getElementById("add-wellness-btn");
        // define variable to store Additional Wellness details container for fields to dynamically show
        const wellnessContainer = document.getElementById("wellnessContainer");

        // UPDATE ACTIVITY LOGGING FIELDS BASED ON CHOICES MADE
        // Store activity form DOM elements in variables
        const thirtyMinCheckbox = document.getElementById('thirtyMin-yes');
        const thirtyMinCheckboxNo = document.getElementById('thirtyMin-no');
        const workoutCheckbox = document.getElementById('workout-yes');
        const workoutCheckboxNo = document.getElementById('workout-no');
        const wellnessCheckbox = document.getElementById('wellness-yes');
        const wellnessCheckboxNo = document.getElementById('wellness-no');
        const workoutSelectionDiv = document.getElementById('hiddenWorkoutSelection');
        const workoutSelectionList = document.getElementById('workoutSelection');
        const eatOutCheckbox = document.getElementById('eatOut-yes');
        const eatOutCheckboxNo = document.getElementById('eatOut-no');
        const drinkCheckbox = document.getElementById('drink-yes');
        const drinkCheckboxNo = document.getElementById('drink-no');
        const sportsDiv = document.getElementById('hiddenSports');
        const sportsSelectionList = document.getElementById('sport');
        const extremeSportsDiv = document.getElementById('hidden_extreme_sports');
        const extremeSportsSelectionList = document.getElementById('extreme-sport');
        const classDiv = document.getElementById('hiddenClass');
        const classSelectionList = document.getElementById('classType');
        const workoutLengthDiv = document.getElementById('hidden_workout_length');
        const workoutLengthInput = document.getElementById('workoutLengthMin');
        const wellnessDiv = document.getElementById('hidden_wellness');
        const wellnessSelectionList = document.getElementById('wellness-type');
        const mealsOutDiv = document.getElementById('hidden_meals_out');
        const mealsOutEntry = document.getElementById('mealsOut');
        const drinksDiv = document.getElementById('hidden_drinks');
        const drinksEntry = document.getElementById('numberDrinks');
        const additionalWorkoutDiv = document.getElementById('hidden_additional_workout');
        const additionalWellnessDiv = document.getElementById('hidden_additional_wellness');
        const wakeUpEarlyCheckboxYes = document.getElementById('earlier-yes');
        const wakeUpEarlyCheckboxNo = document.getElementById('earlier-no');
        const wakeUpEarlyDiv = document.getElementById('hidden_wake_up_early');
        const wakeUpEarlyHour = document.getElementById('wakeUpEarlyHour');
        const wakeUpEarlyMin = document.getElementById('wakeUpEarlyMin');
        const removeWorkout = document.getElementById('remove_workout');
        const removeWellnessActivity = document.getElementById('remove_wellness_activity');
        const travellingCheckboxYes = document.getElementById('travel-yes');
        const travellingCheckboxNo = document.getElementById('travel-no');
        const sickCheckboxYes = document.getElementById('sick-yes');
        const sickCheckboxNo = document.getElementById('sick-no');

// Check to ensure activity page is triggering event by checking if add workout button exists
if (addWorkoutBtn){

//JAVASCRIPT TO SET DATE INPUT TO TODAY'S DATE
        // Get the input element
        let activityDateInput = document.getElementById('activity-date');

        // Get today's date
        let today = new Date();

        // Format the date as YYYY-MM-DD
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let formattedDate = yyyy + '-' + mm + '-' + dd;

        // Set the value of the input field to today's date
        activityDateInput.value = formattedDate;
        
// UPDATE ACTIVITY LOGGING FIELDS BASED ON CHOICES MADE
        // Event delegation, listen for changes on the entire Activity entry form
        document.querySelector('form').addEventListener('change', function(event) {
                const target = event.target; // store target event
                // Check which element was changed and update styles accordingly
                // If Workout checkbox selected
                if (target === workoutCheckbox && target.checked === true) {
                        // unhide workout selection drop down and add additional workout button
                        workoutSelectionDiv.style.display = 'block';
                        additionalWorkoutDiv.style.display = 'block';
                        removeWorkout.style.display = 'block';
                }
                // If workout "yes" checkbox is unselected
                else if (target === workoutCheckbox && target.checked === false) {
                        hideWorkoutFields(); // call function to hide workout fields
                }
                // If Workout No checkbox selected
                else if (target === workoutCheckboxNo && target.checked === true) {
                        hideWorkoutFields(); // call function to hide workout fields
                }

                // If Wellness box "Yes" is selected, show wellness type drop down field
                else if (target === wellnessCheckbox && target.checked === true) {
                        // unhide wellness type drop down
                        wellnessDiv.style.display = 'block';
                        // unhide add another wellness type button
                        additionalWellnessDiv.style.display = 'block';
                        // unhide remove wellness activity button
                        removeWellnessActivity.style.display = 'block';
                }
                // if Wellness "yes" is unselected, rehide additional fields and delete any existing additional Wellness fields
                else if (target === wellnessCheckbox && target.checked === false) {
                        hideWellnessFields(); // call function to rehide wellness fields
                }
                // If Wellness No checkbox selected, rehide additional fields and delete any existing additional Wellness fields
                else if (target === wellnessCheckboxNo && target.checked === true) {
                        hideWellnessFields(); // call function to rehide wellness fields
                }

                // If workout is selected from drop down menu, show additional drop downs accordingly, rehide if "yes" unselected
                else if (target === workoutSelectionList) {
                        const value = target.value;
                        // if sport type selected show sport options
                        sportsDiv.style.display = value === 'sport' ? 'block' : 'none';
                        // if extreme sport type selected show extreme sport options
                        extremeSportsDiv.style.display = value === 'extreme-sport' ? 'block' : 'none';
                        // if class type selected show class options
                        classDiv.style.display = value === 'class' ? 'block' : 'none';
                        // Show workout length when any workout type is selected
                        workoutLengthDiv.style.display = value !== null ? 'block' : 'none';
                }

                // If eating out "yes" checkbox was selected show meals out input box
                else if (target === eatOutCheckbox && target.checked === true) {
                        mealsOutDiv.style.display = 'block';
                }
                // If eating out "yes" checkbox is unselected, rehide the meals out input box
                else if (target === eatOutCheckbox && target.checked === false) {
                        // Hide eat out entry
                        mealsOutDiv.style.display = 'none';
                        // Set default input value back to null
                        mealsOutEntry.value = "";
                }
                // If Eat Out No checkbox selected
                else if (target === eatOutCheckboxNo && target.checked === true) {
                        // Hide eat out entry
                        mealsOutDiv.style.display = 'none';
                        // Set default input value back to null
                        mealsOutEntry.value = "";
                }
                // If drinking checkbox "yes" was selected unhide drinks entry,
                else if (target === drinkCheckbox && target.checked === true) {
                        drinksDiv.style.display = 'block';
                }
                // rehide if "yes" unselected
                else if (target === drinkCheckbox && target.checked === false) {
                        // Hide eat out entry
                        drinksDiv.style.display = 'none';
                        // Set default input value back to null
                        drinksEntry.value = "";
                }
                // If drink No checkbox selected
                else if (target === drinkCheckboxNo && target.checked === true) {
                        // Hide eat out entry
                        drinksDiv.style.display = 'none';
                        // Set default input value back to null
                        drinksEntry.value = "";
                }
                // FOR SLEEP.HTML PAGE
                // If Wake up early checkbox "yes" selected show div with amount of time entry
                else if (target === wakeUpEarlyCheckboxYes && target.checked === true) {
                        // unhide time entry
                        wakeUpEarlyDiv.style.display = 'block';
                }
                // If wake up early "yes" is unselected, rehide hour and min input
                else if (target === wakeUpEarlyCheckboxYes && target.checked === false) {
                        // Hide eat out entry
                        wakeUpEarlyDiv.style.display = 'none';
                        // Set default input value back to null
                        wakeUpEarlyHour.value = "";
                        wakeUpEarlyMin.value = "";
                }
                // If Wake up early No checkbox selected rehide time entry if needed
                else if (target === wakeUpEarlyCheckboxNo && target.checked === true) {
                        // Hide eat out entry
                        wakeUpEarlyDiv.style.display = 'none';
                        // Set default input value back to null
                        wakeUpEarlyHour.value = "";
                        wakeUpEarlyMin.value = "";
                }
        });

        // helper function to hide workout fields if workout "yes" is unselected or "no" is selected
        function hideWorkoutFields(){
                // rehide workout selection drop down
                workoutSelectionDiv.style.display = 'none';

                // set default values of drop downs back to original values or null
                workoutSelectionList.value = "defaultWorkoutType";
                classSelectionList.value = "defaultClass";
                sportsSelectionList.value = "defaultSport";
                extremeSportsSelectionList.value = "defaultExtremeSport";
                workoutLengthMin.value = null;

                // if sport type was selected then rehide
                if (sportsDiv.style.display === 'block'){
                        sportsDiv.style.display = 'none';
                }

                // if extreme sport was selected then rehide
                if (extremeSportsDiv.style.display === 'block'){
                        extremeSportsDiv.style.display = 'none';
                }
                // if class was selected then rehide
                if (classDiv.style.display === 'block'){
                        classDiv.style.display = 'none';
                }
                // If workout length is showing then rehide
                if (workoutLengthDiv.style.display === 'block'){
                        workoutLengthDiv.style.display = 'none';
                }
                // If Add Workout button is showing then rehide
                if (additionalWorkoutDiv.style.display === 'block'){
                        additionalWorkoutDiv.style.display = 'none';
                }

                // If Add Workout button is showing then rehide
                if (removeWorkout.style.display === 'block'){
                        removeWorkout.style.display = 'none';
                }

                // If additional Add Workouts fields exist,remove them from the container
                while (workoutsContainer.childNodes[0]) {
                        workoutsContainer.removeChild(workoutsContainer.childNodes[0]);
                }
        }

        // helper function to hide wellness fields if wellness "yes" is unselected or "no" is selected
        function hideWellnessFields(){
                // hide wellness type drop down
                wellnessDiv.style.display = 'none';
                // set default value of drop down back to placeholder
                wellnessSelectionList.value = "defaultWellnessType";
                // hide add another wellness type button if showing
                additionalWellnessDiv.style.display = 'none';
                // hide remove wellness activity button
                removeWellnessActivity.style.display = 'none';
                // If additional Add Workouts fields exist,remove them from the container
                while (wellnessContainer.childNodes[0]) {
                        wellnessContainer.removeChild(wellnessContainer.childNodes[0]);
                }
        }

        // REHIDE WORKOUT ELEMENTS IF REMOVE BUTTON IS SELECTED
        // Listen for click on remove workout button
        removeWorkout.addEventListener('click', function() {
                // Check if any additional workouts have been added to the form
                if (workoutsContainer.hasChildNodes()) {
                        // hide workout selection drop down
                        workoutSelectionDiv.style.display = 'none';

                        // set default values of drop downs back to original values or null
                        workoutSelectionList.value = "defaultWorkoutType";
                        classSelectionList.value = "defaultClass";
                        sportsSelectionList.value = "defaultSport";
                        extremeSportsSelectionList.value = "defaultExtremeSport";
                        workoutLengthMin.value = null;

                        // if sport type was selected then rehide
                        if (sportsDiv.style.display === 'block'){
                                sportsDiv.style.display = 'none';
                        }

                        // if extreme sport was selected then rehide
                        if (extremeSportsDiv.style.display === 'block'){
                                extremeSportsDiv.style.display = 'none';
                        }
                        // if class was selected then rehide
                        if (classDiv.style.display === 'block'){
                                classDiv.style.display = 'none';
                        }
                        // If workout length is showing then rehide
                        if (workoutLengthDiv.style.display === 'block'){
                                workoutLengthDiv.style.display = 'none';
                        }
                        // If Add Workout button is showing then rehide
                        if (removeWorkout.style.display === 'block'){
                                removeWorkout.style.display = 'none';
                        }
                }
                // Else, no child nodes exist
                else {
                        // hide workout selection drop down
                        workoutSelectionDiv.style.display = 'none';
                        //uncheck workout yes box
                        workoutCheckbox.checked = false;

                        // set default values of drop downs back to original values or null
                        workoutSelectionList.value = "defaultWorkoutType";
                        classSelectionList.value = "defaultClass";
                        sportsSelectionList.value = "defaultSport";
                        extremeSportsSelectionList.value = "defaultExtremeSport";
                        workoutLengthMin.value = null;

                        // if sport type was selected then rehide
                        if (sportsDiv.style.display === 'block'){
                                sportsDiv.style.display = 'none';
                        }

                        // if extreme sport was selected then rehide
                        if (extremeSportsDiv.style.display === 'block'){
                                extremeSportsDiv.style.display = 'none';
                        }
                        // if class was selected then rehide
                        if (classDiv.style.display === 'block'){
                                classDiv.style.display = 'none';
                        }
                        // If workout length is showing then rehide
                        if (workoutLengthDiv.style.display === 'block'){
                                workoutLengthDiv.style.display = 'none';
                        }
                        // If Add Workout button is showing then rehide
                        if (additionalWorkoutDiv.style.display === 'block'){
                                additionalWorkoutDiv.style.display = 'none';
                        }

                        // If Add Workout button is showing then rehide
                        if (removeWorkout.style.display === 'block'){
                                removeWorkout.style.display = 'none';
                        }
                }
        });

        // REHIDE WELLNESS ELEMENTS IF REMOVE BUTTON IS SELECTED
        // Listen for click on remove workout button
        removeWellnessActivity.addEventListener('click', function() {
                // Check if any additional wellness activities have been added to the form
                if (wellnessContainer.hasChildNodes()) {
                        // hide wellness selection drop down
                        wellnessDiv.style.display = 'none';
                        // set default values of drop downs back to original values or null
                        wellnessSelectionList.value = "defaultWellnessType";
                        // hide remove wellness activity button
                        removeWellnessActivity.style.display = 'none';
                }
                // Else, no child nodes exist
                else {
                        hideWellnessFields();
                }
        });

        // MAKE SURE ONLY ONE Y/N checkbox IS SELECTED IN A ROW
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


        // PERFORM FIELD VALIDATIONS ON FORM SUBMISSION
        // fucnction that is called on form submission to perform validations
        function validateForm() {
                if (workoutSelectionDiv.style.display === 'block') {
                        // Switch statement to ensure FIRST workout dropdowns are completed
                        switch (workoutSelectionList.value) {
                                case "defaultWorkoutType":
                                        if (workoutCheckbox.checked) {
                                        alert('Please ensure a workout type is selected.');
                                        return false;
                                        }
                                        break;
                                case "class":
                                        if (classSelectionList.value === "defaultClass") {
                                        alert('Please ensure a class type is selected.');
                                        return false;
                                        }
                                        break;
                                case "sport":
                                        if (sportsSelectionList.value === "defaultSport") {
                                        alert('Please ensure a sport type is selected.');
                                        return false;
                                        }
                                        break;
                                case "extreme-sport":
                                        if (extremeSportsSelectionList.value === "defaultExtremeSport") {
                                        alert('Please ensure an extreme sport type is selected.');
                                        return false;
                                        }
                                        break;
                                }
                        //Ensure workout length is filled in if workout yes is selected
                        if (workoutCheckbox.checked && workoutLengthInput.value === ""){
                                // if workout length isn't filled out, throw error message and don't sumbit form
                                alert('Please ensure workout length are filled out.');
                        return false;
                        }
                }       

                

                // FIELD VALIDATIONS FOR DYNAMICALLY ADDED WORKOUTS
                // select all the dynamically created Workout Type drop down elements
                let selectWorkoutTypeElements = document.querySelectorAll('select[name^="additionalWorkoutSelection"]');
                // select all the dynamically created Workout Class Type drop down elements
                let selectWorkoutClassTypeElements = document.querySelectorAll('select[name^="additionalClassSelection"]');
                // select all the dynamically created Sport Type drop down elements
                let selectSportTypeElements = document.querySelectorAll('select[name^="additionalSportSelection"]');
                // select all the dynamically created Extreme Sport Type drop down elements
                let selectExtremeSportTypeElements = document.querySelectorAll('select[name^="additionalExtremeSportSelection"]');
                // select all the dynamically created Workout Length input elements
                let selectWorkoutLengthElements = document.querySelectorAll('input[name^="additionalWorkoutLengthMin"]');

                if (selectWorkoutTypeElements.length > 0){
                        // iterate through each workout element and push its selected value into the array
                        for (let i = 0; i < selectWorkoutTypeElements.length; i++) {
                                // If dynamically added workout type isn't selected 
                                if (selectWorkoutTypeElements[i].value === ""){
                                        alert('Please ensure a workout type is selected.');
                                        return false;
                                }
                                // If dynamically added workout type is class, ensure class type is selected 
                                else if (selectWorkoutTypeElements[i].value === "class" && selectWorkoutClassTypeElements[i].value === ""){
                                        alert('Please ensure a class type is selected.');
                                        return false;
                                }
                                // If dynamically added workout type is sport, ensure sport type is selected 
                                else if (selectWorkoutTypeElements[i].value === "sport" && selectSportTypeElements[i].value === ""){
                                        alert('Please ensure a sport type is selected.');
                                        return false;
                                }
                                // If dynamically added workout type is extreme sport, ensure extreme sport type is selected 
                                else if (selectWorkoutTypeElements[i].value === "extreme_sport" && selectExtremeSportTypeElements[i].value === ""){
                                        alert('Please ensure a extreme sport type is selected.');
                                        return false;
                                }
                                // Ensure workout length is selected 
                                else if (selectWorkoutLengthElements[i].value === ""){
                                        alert('Please ensure workout length is filled in.');
                                        return false;
                                }
                        }
                }
                
                // If wellness checkbox is selected, ensure wellness type is selected from drop down
                // Ensure Wellness dropdown isn't hidden aka hasn't been removed from page
                if (wellnessCheckbox.checked && wellnessSelectionList.value === "defaultWellnessType" && wellnessSelectionList.style.display === 'block'){
                        // if no checkbox is selected, throw error message and don't sumbit form
                        alert('Please ensure a wellness type is selected.');
                        return false;
                }
                

                // FIELD VALIDATIONS FOR DYNAMICALLY ADDED WELLNESS ACTIVITIES
                // select all the dynamically created Wellness drop down elements
                let selectWellnessElements = document.querySelectorAll('select[name^="additionalWellnessSelection"]');

                //iterate through list of additional wellness selections that have been dynamically added
                for (let i = 0; i < selectWellnessElements.length; i++) {
                        // If dynamically added wellness type isn't selected 
                        if (selectWellnessElements[i].value === ""){
                                alert('Please ensure a wellness type is selected.');
                                return false;
                        }
                }

                //Ensure number of meals is filled in if eat out is selected
                if (eatOutCheckbox.checked && mealsOutEntry.value === ""){
                        // if no checkbox is selected, throw error message and don't sumbit form
                        alert('Please ensure a number of meals is filled out.');
                        return false;
                }
                
                //Ensure number of drinks is filled in if drinks is selected
                if (drinkCheckbox.checked && drinksEntry.value === ""){
                        // if no checkbox is selected, throw error message and don't sumbit form
                        alert('Please ensure a number of drinks is filled out.');
                        return false;
                }

                // Function that is called to validate each yes/no field, with yes checkbox, no checkbox and field name as input
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
                        { checkbox: thirtyMinCheckbox, errorMessage: "30 min activity", negativeCheckbox: thirtyMinCheckboxNo },
                        { checkbox: workoutCheckbox, errorMessage: "workout", negativeCheckbox: workoutCheckboxNo },
                        { checkbox: wellnessCheckbox, errorMessage: "wellness", negativeCheckbox: wellnessCheckboxNo },
                        { checkbox: eatOutCheckbox, errorMessage: "eat out", negativeCheckbox: eatOutCheckboxNo },
                        { checkbox: drinkCheckbox, errorMessage: "drinks", negativeCheckbox: drinkCheckboxNo },
                        { checkbox: travellingCheckboxYes, errorMessage: "travelling", negativeCheckbox: travellingCheckboxNo },
                        { checkbox: sickCheckboxYes, errorMessage: "sick", negativeCheckbox: sickCheckboxNo }
                              ];

                        // for every field in the array of stored fields, call the validateYN function with the field inputs
                        // if any field returns false, the entire statement returns false and only throws one error message
                        // for first field found with an error
                        let boolYesNoFieldCheck = validationFields.every(field => validateYNField(field.checkbox, field.errorMessage, field.negativeCheckbox));
                        // If a yes/no field doesn't pass validation checks, return false and display error, else continue to next validation check
                        if (boolYesNoFieldCheck === false){
                                return false;
                        }    
        }

        // Call function on activity form submission
        document.getElementById('activityForm').onsubmit = validateForm;
        }
});
