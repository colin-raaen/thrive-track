import { validateYNField } from './yes-no.js';

//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
        // VARIABLES FOR ADDING ADDITIONAL WORKOUT AND WELLNESS DETAILS (used when need to rehide fields from "no" checkbox selections)
        // variable to store ADD WORKOUT button element
        const addWorkoutBtn = document.getElementById("add-workout-btn");
        // variable to store Additional Workout details container for fields to dynamically show
        const workoutsContainer = document.getElementById("workoutsContainer");
        // variable to store ADD WELLNESS TYPE button element
        const addWellnessBtn = document.getElementById("add-wellness-btn");
        // variable to store Additional Wellness details container for fields to dynamically show
        const wellnessContainer = document.getElementById("wellnessContainer");

        // UPDATE ACTIVITY LOGGING FIELDS BASED ON CHOICES MADE
        // Store activity form DOM elements in variables
        const thirtyMinCheckbox = document.getElementById('thirtyMin-yes');
        const thirtyMinCheckboxNo = document.getElementById('thirtyMin-no');
        const workoutCheckbox = document.getElementById('workout-yes');
        const workoutCheckboxNo = document.getElementById('workout-no');
        const wellnessCheckbox = document.getElementById('wellness-yes');
        const wellnessCheckboxNo = document.getElementById('wellness-no');
        const eatOutCheckbox = document.getElementById('eatOut-yes');
        const eatOutCheckboxNo = document.getElementById('eatOut-no');
        const drinkCheckbox = document.getElementById('drink-yes');
        const drinkCheckboxNo = document.getElementById('drink-no');
        const mealsOutDiv = document.getElementById('hidden_meals_out');
        const mealsOutEntry = document.getElementById('mealsOut');
        const drinksDiv = document.getElementById('hidden_drinks');
        const drinksEntry = document.getElementById('numberDrinks');
        const additionalWorkoutDiv = document.getElementById('hidden-additional-workout');
        const additionalWellnessDiv = document.getElementById('hidden-additional-wellness');
        const travellingCheckboxYes = document.getElementById('travel-yes');
        const travellingCheckboxNo = document.getElementById('travel-no');
        const sickCheckboxYes = document.getElementById('sick-yes');
        const sickCheckboxNo = document.getElementById('sick-no');

        // define the workout options for the workout select element drop down
        const workoutOptions = [
                { text: "Select Workout Type", disabled: true, selected: true, value: "" },
                { text: "Gym", value: "gym" },
                { text: "Workout Class", value: "class" },
                { text: "Sport/Athletics", value: "sport" },
                { text: "Bike", value: "bike" },
                { text: "Running", value: "running" },
                { text: "Extreme Sport", value: "extreme_sport" },
                { text: "Other", value: "other" }
        ];

        // define the class workout options for the workout class select element drop down
        const classOptions = [
                { text: "Select Class Type", disabled: true, selected: true, value: "" },
                { text: "Yoga", value: "yoga" },
                { text: "Barre", value: "barre" },
                { text: "Aerobics", value: "aerobics" },
                { text: "Other", value: "other" }
        ];

        // define the sport options for the sport select element drop down
        const sportOptions = [
                { text: "Select Sport Type", disabled: true, selected: true, value: "" },
                { text: "Tennis", value: "tennis" },
                { text: "Hockey", value: "hockey" },
                { text: "Soccer", value: "soccer" },
                { text: "Basketball", value: "basketball" },
                { text: "Racquetball/Squash", value: "racquet" },
                { text: "Other", value: "other" }
        ];

        // define the extreme sport options for the select element drop down
        const extremeSportOptions = [
                { text: "Select Extreme Sport Type", disabled: true, selected: true, value: "" },
                { text: "Snowboard", value: "snowboard" },
                { text: "Surf", value: "surf" },
                { text: "Skateboard", value: "skateboard" },
                { text: "Other", value: "other" }
        ];

        // define the wellness type options for the select element drop down
        const wellnessOptions = [
                { text: "Select Wellness Type", disabled: true, selected: true, value: "" },
                { text: "Meditation", value: "meditation" },
                { text: "Sauna/Spa", value: "sauna-spa" },
                { text: "Therapy", value: "therapy" },
                { text: "Other", value: "other" }
        ];

        // Wellness activity prefixes, used for removing dynamically added wellness inputs
        const wellnessPrefixes = ["newWellnessSelection", "remove_wellness_activity"];

        // Workout prefixes, used for removing dynamically added workout inputs
        const workoutPrefixes = ["newWorkoutSelection", "newClassSelection", "newSportSelection", 
        "newExtremeSportSelection", "newWorkoutLength", "remove_workout"];
        
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
        
        // Event delegation, listen for Clicks on the entire Activity entry form
        // UPDATE ACTIVITY LOGGING FIELDS BASED ON Clicks MADE
        document.querySelector('form').addEventListener('click', function(event) {
                const target = event.target; // store target event for readability
                
                // Check which element was changed and update styles accordingly
                // If Workout checkbox selected
                if (target === workoutCheckbox && target.checked === true) {
                        handleNewWorkoutClick(); // call function to create new workout input
                        additionalWorkoutDiv.style.display = 'block';
                }

                else if (target === addWorkoutBtn){
                        handleNewWorkoutClick(); // call function to create new workout input fields and buttons
                }

                // if remove workout button was clicked
                else if (target.name.startsWith('additionalRemoveButton')){
                        handleRemoveInput(event, 'workout', workoutsContainer); // call function to remove workout passing in event
                }

                // If workout "yes" checkbox is unselected OR if Workout No checkbox selected
                else if ((target === workoutCheckbox && target.checked === false) || 
                        (target === workoutCheckboxNo && target.checked === true)){
                        handleHideAllInputs(workoutCheckbox, additionalWorkoutDiv, workoutsContainer);  // call function to hide all workout fields
                }

                // If Wellness box "Yes" is selected, show wellness type drop down field
                else if (target === wellnessCheckbox && target.checked === true) {
                        handleNewWellnessClick(); // call function to create new wellness input fields and buttons
                        additionalWellnessDiv.style.display = 'block'; // Show additional wellness button
                }

                // if add Wellness button is clicked
                else if(target === addWellnessBtn){
                        handleNewWellnessClick(); // call function to create new wellness input fields and buttons
                }

                // if remove wellness button was clicked
                else if (target.name.startsWith('additionalRemoveWellnessButton')){
                        handleRemoveInput(event, 'wellness', wellnessContainer); // call function to remove wellness input passing in event
                }

                // if Wellness "yes" is unselected, OR if Wellness No checkbox selected,
                // rehide additional fields and delete any existing additional Wellness fields
                else if ((target === wellnessCheckbox && target.checked === false) ||
                        (target === wellnessCheckboxNo && target.checked === true)){
                        handleHideAllInputs(wellnessCheckbox, additionalWellnessDiv, wellnessContainer);  // call function to rehide wellness fields
                }

                // If eating out "yes" checkbox was selected show meals out input box
                else if (target === eatOutCheckbox && target.checked === true) {
                        mealsOutDiv.style.display = 'block';
                }
                // If eating out "yes" checkbox is unselected, OR if Eat Out No checkbox selected
                // rehide the meals out input box
                else if ((target === eatOutCheckbox && target.checked === false) ||
                        (target === eatOutCheckboxNo && target.checked === true)){
                        mealsOutDiv.style.display = 'none'; // Hide eat out entry
                        mealsOutEntry.value = ""; // Set default input value back to null
                }
                
                // If drinking checkbox "yes" was selected unhide drinks entry,
                else if (target === drinkCheckbox && target.checked === true) {
                        drinksDiv.style.display = 'block';
                }
                // rehide if "yes" unselected OR if drink No checkbox selected
                else if ((target === drinkCheckbox && target.checked === false) || 
                        (target === drinkCheckboxNo && target.checked === true)) {
                        drinksDiv.style.display = 'none'; // Hide eat out entry
                        drinksEntry.value = ""; // Set default input value back to null
                }
        });

        // JAVASCRIPT TO SHOW/HIDE ADDITIONAL DROP DOWNS FIELDS DEPENDING ON WORKOUT TYPE SELECTED
        // Listen for changes on the entire Activity entry form
        document.querySelector('form').addEventListener('change', function(event) {
                // Check if an additional workout selection element was changed and update styles accordingly
                let additionalWorkoutSelectionLists = document.querySelectorAll('[id^="additionalWorkoutSelection"]');
                // for loop to identify which WORKOUT drop down list was changed
                for (let i = 0; i < additionalWorkoutSelectionLists.length; i++) {
                        // extract the number value from the button's name attribute using a regular expression
                        let index = additionalWorkoutSelectionLists[i].name.match(/\d+/)[0];

                        // Initializing variables to capture dynamically created fields for showing/hiding
                        const newClassSelectionDiv = document.getElementById("newClassSelection" + index);
                        const newSportSelectionDiv = document.getElementById("newSportSelection" + index);
                        const newExtremeSportSelectionDiv = document.getElementById("newExtremeSportSelection" + index);
                        const newWorkoutLengthDiv = document.getElementById("newWorkoutLength" + index);

                        // Initializing variables to capture dynamically created drop down fields for resetting
                        const additionalClassSelection = document.getElementById("additionalClassSelection" + index);
                        const additionalSportSelection = document.getElementById("additionalSportSelection" + index);
                        const additionalExtremeSportSelection = document.getElementById("additionalExtremeSportSelection" + index);
                        const additionalWorkoutLength = document.getElementById("additionalWorkoutLengthMin" + index);

                        // Check if additional workout drop down element were changed and add fields and set default values accordingly
                        if (event.target === additionalWorkoutSelectionLists[i]) {
                                // Set values back to default values if workout type changes
                                additionalClassSelection.selectedIndex = 0;
                                additionalSportSelection.selectedIndex = 0;
                                additionalExtremeSportSelection.selectedIndex = 0;
                                additionalWorkoutLength.value = null;

                                // if workout class type selected show Class options, if not selected then hide
                                newClassSelectionDiv.style.display = event.target.value === 'class' ? 'block' : 'none';

                                // if sport type selected show sport options, if not selected then hide
                                newSportSelectionDiv.style.display = event.target.value === 'sport' ? 'block' : 'none';

                                // if extreme sport type selected show extreme sport options, if not selected then hide
                                newExtremeSportSelectionDiv.style.display = event.target.value === 'extreme_sport' ? 'block' : 'none';

                                // Show workout length when any workout type is selected, if not selected then hide
                                newWorkoutLengthDiv.style.display = event.target.value !== null ? 'block' : 'none';

                                break;
                        }
                }
        });

        // helper function to remove one individual workout input when remove button clicked
        function handleRemoveInput(event, type, container){
                // extract the number value from the button's name attribute using a regular expression
                const index = event.target.name.match(/\d+/)[0];
                // if workout remove called function, store workout prefixes to delete else if wellness remove called function, store workout prefixes to delete
                let elementPrefixes = (type === 'workout') ? workoutPrefixes : (type === 'wellness') ? wellnessPrefixes : null;

                // Loop through each prefix stored of HTML elements to remove
                elementPrefixes.forEach(prefix => {
                        // get HTML element based on prefix and index number
                        const element = document.getElementById(prefix + index);
                        element && element.remove(); // validate element exists, if yes remove the element
                });

                event.target.remove(); // remove "remove" hyperlink that triggered function call

                // if there are no children workouts/wellness activities, aka last workout/wellness activity
                if(!container.hasChildNodes()){
                        if (type === 'workout'){
                                // call handle all function to rehide workout buttons 
                                handleHideAllInputs(workoutCheckbox, additionalWorkoutDiv, container); 
                        }
                       else if (type === 'wellness'){
                                // call handle all function to rehide wellness buttons 
                                handleHideAllInputs(wellnessCheckbox, additionalWellnessDiv, container); 
                       }
                }
        }

        // helper function to hide workout/wellness fields if workout/wellness "yes" is unselected or "no" is selected
        function handleHideAllInputs(checkbox, additionalDiv, container){
                checkbox.checked = false;  // set yes checkbox to false
                additionalDiv.style.display = 'none'; // rehide Add Workout button

                // If additional Add Workouts fields exist,remove them from the container
                while (container.childNodes[0]) {
                        container.removeChild(container.childNodes[0]);
                }                       
        }

        // function to create the new div element
        function createNewDiv(id, className, style) {
                const newDiv = document.createElement("div");
                newDiv.id = id;
                newDiv.className = className;
                newDiv.style.display = style;
                return newDiv;
        }

        // function to create the select element with options
        function createSelectElement(name, id, className, options) {
                const selectElement = document.createElement("select");
                selectElement.name = name;
                selectElement.id = id;
                selectElement.className = className;

                options.forEach((option) => {
                        const optionElement = document.createElement("option");
                        optionElement.text = option.text;
                        optionElement.value = option.value;
                        optionElement.disabled = option.disabled;
                        optionElement.selected = option.selected;
                        selectElement.add(optionElement);
                });

                return selectElement;
        }

        // Initialize a counter variable for naming convention
        let workoutCount = 0;

        // Helper function to create new workout input
        function handleNewWorkoutClick(){
                // call new div function for workout selection drop down
                let newWorkoutSelection = createNewDiv(`newWorkoutSelection${workoutCount}`, "mb-3", "");
                // call new selection function for workout selection drop down
                let additionalWorkoutSelection = createSelectElement(`additionalWorkoutSelection${workoutCount}`, `additionalWorkoutSelection${workoutCount}`, "form-select mx-auto w-auto", workoutOptions);

                // append select element to new div element
                newWorkoutSelection.appendChild(additionalWorkoutSelection);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newWorkoutSelection);

                // call new div function for Class selection drop down
                let newClassSelection = createNewDiv(`newClassSelection${workoutCount}`, "mb-3", "none");
                // call new selection function for class selection drop down
                let additionalClassSelection = createSelectElement(`additionalClassSelection${workoutCount}`, `additionalClassSelection${workoutCount}`, "form-select mx-auto w-auto", classOptions);

                // append select element to new div element
                newClassSelection.appendChild(additionalClassSelection);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newClassSelection);

                // call new div function for Sport selection drop down
                let newSportSelection = createNewDiv(`newSportSelection${workoutCount}`, "mb-3", "none");
                // call new selection function for Sport selection drop down
                let additionalSportSelection = createSelectElement(`additionalSportSelection${workoutCount}`, `additionalSportSelection${workoutCount}`, "form-select mx-auto w-auto", sportOptions);

                // append select element to new div element
                newSportSelection.appendChild(additionalSportSelection);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newSportSelection);

                // call new div function for Sport selection drop down
                let newExtremeSportSelection = createNewDiv(`newExtremeSportSelection${workoutCount}`, "mb-3", "none");
                // call new selection function for Sport selection drop down
                let additionalExtremeSportSelection = createSelectElement(`additionalExtremeSportSelection${workoutCount}`, `additionalExtremeSportSelection${workoutCount}`, "form-select mx-auto w-auto", extremeSportOptions);

                // append select element to new div element
                newExtremeSportSelection.appendChild(additionalExtremeSportSelection);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newExtremeSportSelection);

                // Create new div for workout length field, intially hidden
                let newWorkoutLength = document.createElement("div");
                newWorkoutLength.id = "newWorkoutLength" + workoutCount;
                newWorkoutLength.className = "mb-3";
                newWorkoutLength.style.display = "none"

                // create new input element for workout length
                let additionalWorkoutLength = document.createElement("input");
                additionalWorkoutLength.type = "number"
                additionalWorkoutLength.name = "additionalWorkoutLengthMin" + workoutCount;
                additionalWorkoutLength.id = "additionalWorkoutLengthMin" + workoutCount;
                additionalWorkoutLength.placeholder = "Workout Length (minutes)";
                additionalWorkoutLength.value = "";
                additionalWorkoutLength.className = "form-control mx-auto w-auto";
                additionalWorkoutLength.autocomplete = "off";
                additionalWorkoutLength.min = "0";

                // append select element to new div element
                newWorkoutLength.appendChild(additionalWorkoutLength);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newWorkoutLength);

                // Create new div for workout length field, intially hidden
                let newRemoveButton = document.createElement("div");
                newRemoveButton.className = "mb-3";
                newRemoveButton.id = "remove_workout" + workoutCount;

                // create new remove button element
                let additionalRemoveButton = document.createElement("a");
                additionalRemoveButton.href = '#';
                additionalRemoveButton.name = "additionalRemoveButton" + workoutCount;
                additionalRemoveButton.innerText = 'Remove Workout';

                // append select element to new div element
                newRemoveButton.appendChild(additionalRemoveButton);
                // Append Div to Workout Container div
                workoutsContainer.appendChild(newRemoveButton);

                // Add to workout counter
                workoutCount++;
        }

        // JAVASCRIPT TO APPEND NEW WELLNESS SELECTION FIELD IF BUTTON IS CLICKED
        // Initialize a counter variable
        let wellnessCount = 0;

        // Helper function to create new wellness input
        function handleNewWellnessClick(){
                // call new div function for Sport selection drop down
                let newWellnessSelection = createNewDiv(`newWellnessSelection${wellnessCount}`, "mb-3", "block");
                // call new selection function for Sport selection drop down
                let additionalWellnessSelection = createSelectElement(`additionalWellnessSelection${wellnessCount}`, `additionalWellnessSelection${wellnessCount}`, "form-select mx-auto w-auto", wellnessOptions);

                // append select element to new div element
                newWellnessSelection.appendChild(additionalWellnessSelection);
                // Append Div to Workout Container div
                wellnessContainer.appendChild(newWellnessSelection);

                // Create new div for workout length field, intially hidden
                let newRemoveWellnessButton = document.createElement("div");
                newRemoveWellnessButton.className = "mb-3";
                newRemoveWellnessButton.id = "remove_wellness_activity" + wellnessCount;

                // create new remove button element
                let additionalRemoveWellnessButton = document.createElement("a");
                additionalRemoveWellnessButton.href = '#';
                additionalRemoveWellnessButton.name = "additionalRemoveWellnessButton" + wellnessCount;
                additionalRemoveWellnessButton.innerText = 'Remove Wellness Type';

                // append select element to new div element
                newRemoveWellnessButton.appendChild(additionalRemoveWellnessButton);
                // Append Div to Workout Container div
                wellnessContainer.appendChild(newRemoveWellnessButton);

                // Add to workout counter
                wellnessCount++;
        }

        // Function that is called to validate each yes/no field, with yes checkbox, no checkbox and field name as input
         function validateYNField(yesCheckbox, errorMessage, noCheckbox) {
        console.log("in activity_logging");
        //If neither yes or no checkbox is selected
        if (!yesCheckbox.checked && !noCheckbox.checked) {
                alert(`Please check either "Yes" or "No" for the ${errorMessage} checkbox.`); //Send alert message
                return false; // return false for field validation check
        }
        return true; //passed validation
};

        // PERFORM FIELD VALIDATIONS ON FORM SUBMISSION
        // fucnction that is called on form submission to perform validations
        function validateForm() {     
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
                        // iterate through each workout element and check to validate all drop downs are populated
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

                // STORE VALUES OF ADDITIONAL WELLNESS AND WORKOUT INPUTS AND PASS TO BACKEND VIA HIDDEN HTML ELEMENT
                // Create an empty array to store the selected Wellness values
                let selectedWellnessValues = [];
                // Create an empty array to store the objects of selected Workout values
                let selectedWorkoutValues = [];

                // iterate through each Wellness element and push its selected value into the array
                for (let i = 0; i < selectWellnessElements.length; i++) {
                        selectedWellnessValues.push(selectWellnessElements[i].value);
                }

                // iterate through each Workout element and create an object to store workout values
                for (let i = 0; i < selectWorkoutTypeElements.length; i++) {
                        let newWorkoutType = {}; // create an empty object
                        newWorkoutType["workoutType"] = selectWorkoutTypeElements[i].value; // store value of selected workout type
                        newWorkoutType["workoutClassType"] = selectWorkoutClassTypeElements[i].value; // store value of selected workout type
                        newWorkoutType["sportType"] = selectSportTypeElements[i].value; // store value of selected workout type
                        newWorkoutType["extremeSportType"] = selectExtremeSportTypeElements[i].value; // store value of selected workout type
                        newWorkoutType["workoutLength"] = selectWorkoutLengthElements[i].value; // store value of selected workout type

                        selectedWorkoutValues.push(newWorkoutType); // push object into array of workouts

                }

                // Set value of hidden HTML element to pass to backend on submission
                let selectedWellnessValuesInput = document.querySelector('#selectedWellnessValuesInput');
                selectedWellnessValuesInput.value = JSON.stringify(selectedWellnessValues);

                // Set value of hidden HTML element to pass to backend on submission
                let selectedWorkoutValuesInput = document.querySelector('#selectedWorkoutValuesInput');
                selectedWorkoutValuesInput.value = JSON.stringify(selectedWorkoutValues);
        }

        // Call function on activity form submission
        document.getElementById('activity-form').onsubmit = validateForm;
});
