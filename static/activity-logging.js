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
        const additionalWellnessDiv = document.getElementById('hidden_additional_wellness');
        const travellingCheckboxYes = document.getElementById('travel-yes');
        const travellingCheckboxNo = document.getElementById('travel-no');
        const sickCheckboxYes = document.getElementById('sick-yes');
        const sickCheckboxNo = document.getElementById('sick-no');
        // Boolean to store if child workouts exist when remove button is clicked
        let removeBtnChildBool = false;

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
        // Event delegation, listen for Clicks on the entire Activity entry form
        document.querySelector('form').addEventListener('click', function(event) {
                const target = event.target; // store target event for readability
                
                // Check which element was changed and update styles accordingly
                // If Workout checkbox selected
                if (target === workoutCheckbox && target.checked === true) {
                        newWorkoutInput(); // call function to create new workout input
                        additionalWorkoutDiv.style.display = 'block';
                }

                else if (target === addWorkoutBtn){
                        newWorkoutInput(); // call function to create new workout input fields and buttons
                }

                // If workout "yes" checkbox is unselected
                else if (target === workoutCheckbox && target.checked === false) {
                        removeBtnChildBool = true; // set to false, remove any children
                        hideWorkoutFields(removeBtnChildBool); // call function to hide workout fields
                }
                // If Workout No checkbox selected
                else if (target === workoutCheckboxNo && target.checked === true) {
                        removeBtnChildBool = true; // set to false, remove any children
                        hideWorkoutFields(removeBtnChildBool); // call function to hide workout fields
                }

                // If Wellness box "Yes" is selected, show wellness type drop down field
                else if (target === wellnessCheckbox && target.checked === true) {
                        newWellnessInput(); // call function to create new wellness input fields and buttons
                        additionalWellnessDiv.style.display = 'block'; // Show additional wellness button
                }

                // if add Wellness button is clicked
                else if(target === addWellnessBtn){
                        newWellnessInput(); // call function to create new wellness input fields and buttons
                }

                // if Wellness "yes" is unselected, rehide additional fields and delete any existing additional Wellness fields
                else if (target === wellnessCheckbox && target.checked === false) {
                        hideWellnessFields(); // call function to rehide wellness fields
                }
                // If Wellness No checkbox selected, rehide additional fields and delete any existing additional Wellness fields
                else if (target === wellnessCheckboxNo && target.checked === true) {
                        hideWellnessFields(); // call function to rehide wellness fields
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
        });

        // helper function to hide workout fields if workout "yes" is unselected or "no" is selected
        function hideWorkoutFields(removeBtnChildBool){

                if (removeBtnChildBool){
                        console.log("removeBtnChildBool true");
                        // set yes checkbox to false
                        workoutCheckbox.checked = false; 

                        // rehide Add Workout button
                        additionalWorkoutDiv.style.display = 'none';

                        // If additional Add Workouts fields exist,remove them from the container
                        while (workoutsContainer.childNodes[0]) {
                                workoutsContainer.removeChild(workoutsContainer.childNodes[0]);
                        }                       
                }
        }

        // helper function to hide wellness fields if wellness "yes" is unselected or "no" is selected
        function hideWellnessFields(){
                // hide add another wellness type button if showing
                additionalWellnessDiv.style.display = 'none';

                // If additional Add Workouts fields exist,remove them from the container
                while (wellnessContainer.childNodes[0]) {
                        wellnessContainer.removeChild(wellnessContainer.childNodes[0]);
                }
        }

        // IMPORTED FROM ACTIVITY-LOGGING-2.JS
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
        function newWorkoutInput(){
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
                        let newClassSelectionDiv = document.getElementById("newClassSelection" + index);
                        let newSportSelectionDiv = document.getElementById("newSportSelection" + index);
                        let newExtremeSportSelectionDiv = document.getElementById("newExtremeSportSelection" + index);
                        let newWorkoutLengthDiv = document.getElementById("newWorkoutLength" + index);

                        // Initializing variables to capture dynamically created drop down fields for resetting
                        let additionalClassSelection = document.getElementById("additionalClassSelection" + index);
                        let additionalSportSelection = document.getElementById("additionalSportSelection" + index);
                        let additionalExtremeSportSelection = document.getElementById("additionalExtremeSportSelection" + index);
                        let additionalWorkoutLength = document.getElementById("additionalWorkoutLengthMin" + index);

                        // Check if additional workout drop down element was changed and add fields and set default values accordingly
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

        // JAVASCRIPT TO APPEND NEW WELLNESS SELECTION FIELD IF BUTTON IS CLICKED
        // Initialize a counter variable
        let wellnessCount = 0;

        // Helper function to create new wellness input
        function newWellnessInput(){
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

        // REMOVE ADDITIONAL WELLNESS AND WORKOUT INPUTS IF REMOVE BUTTON IS SELECTED
        // Listen for changes to the Activity entry form
        document.querySelector('form').addEventListener('click', function(event) {
                // select all the dynamically created remove workout button elements
                let selectRemoveButtons = document.querySelectorAll('a[name^="additionalRemoveButton"]');
                // select all the dynamically created remove workout button elements
                let selectRemoveWellnessButtons = document.querySelectorAll('a[name^="additionalRemoveWellnessButton"]');

                // loop through remove workout buttons
                for (let i = 0; i < selectRemoveButtons.length; i++) {
                        // check if click event happened on current remove workout button
                        if (event.target === selectRemoveButtons[i]){
                                // extract the number value from the button's name attribute using a regular expression
                                let index = selectRemoveButtons[i].name.match(/\d+/)[0];

                                // strore drop down field elements to remove
                                let newWorkoutSelection = document.getElementById("newWorkoutSelection" + index);
                                let newClassSelection = document.getElementById("newClassSelection" + index);
                                let newSportSelection = document.getElementById("newSportSelection" + index);
                                let newExtremeSportSelection = document.getElementById("newExtremeSportSelection" + index);
                                let newWorkoutLength = document.getElementById("newWorkoutLength" + index);

                                // remove elements from page
                                newWorkoutSelection.remove();
                                newClassSelection.remove();
                                newSportSelection.remove();
                                newExtremeSportSelection.remove();
                                newWorkoutLength.remove();
                                selectRemoveButtons[i].remove();

                                break;
                        }
                }

                // loop through remove wellness buttons
                for (let i = 0; i < selectRemoveWellnessButtons.length; i++) {
                        // check if click event happened on current remove workout button
                        if (event.target === selectRemoveWellnessButtons[i]){
                                // extract the number value from the button's name attribute using a regular expression
                                let index = selectRemoveWellnessButtons[i].name.match(/\d+/)[0];

                                // strore drop down field elements to remove
                                let newWellnessSelection = document.getElementById("newWellnessSelection" + index);

                                // remove elements from page
                                newWellnessSelection.remove();
                                selectRemoveWellnessButtons[i].remove();

                                break;
                        }
                }
        });

        // STORE VALUES OF ADDITIONAL WELLNESS AND WORKOUT INPUTS AND PASS TO BACKEND VIA HIDDEN HTML ELEMENT
        // Listen for submission of the Activity entry form
        document.querySelector('form').addEventListener('submit', function() {
                // Create an empty array to store the selected Wellness values
                let selectedWellnessValues = [];
                // Create an empty array to store the objects of selected Workout values
                let selectedWorkoutValues = [];

                // select all the dynamically created Wellness drop down elements
                let selectWellnessElements = document.querySelectorAll('select[name^="additionalWellnessSelection"]');
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

        }); 
        // END OF ACITIVITY-LOGGING-2 IMPORT

        // PERFORM FIELD VALIDATIONS ON FORM SUBMISSION
        // fucnction that is called on form submission to perform validations
        function validateForm() {     
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
        document.getElementById('activity-form').onsubmit = validateForm;
});
