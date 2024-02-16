//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
        // VARIABLES FOR ADDING ADDITIONAL WORKOUT AND WELLNESS DETAILS (used when need to rehide fields from "no" checkbox selections)
        // define variable to store ADD WORKOUT button element
        let addWorkoutBtn = document.getElementById("add-workout-btn");
        // define variable to store Additional Workout details container for fields to dynamically show
        let workoutsContainer = document.getElementById("workoutsContainer");
        // define variable to store ADD WELLNESS TYPE button element
        let addWellnessBtn = document.getElementById("add-wellness-btn");
        // define variable to store Additional Wellness details container for fields to dynamically show
        let wellnessContainer = document.getElementById("wellnessContainer");    

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
        addWorkoutBtn.addEventListener("click", function() {

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

        // Listen if add Wellness button is clicked
        addWellnessBtn.addEventListener("click", function() {

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
        });

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
        document.querySelector('form').addEventListener('submit', function(event) {
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
});