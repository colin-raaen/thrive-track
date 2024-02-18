# import OS, Flask, SQL, werkzeug, json modules
import os
import json

from cs50 import SQL
import sqlite3
from flask import Flask, flash, redirect, render_template, request, session, url_for, jsonify, Markup
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, time, timedelta
import calendar
import datetime

from helpers import (login_required, time, get_form_input, time_in_min, translate_bool, format_value, min_to_hours, 
                     min_to_hours_index_page, get_emoji_for_workout_type, get_emoji_for_sport_type, 
                     get_emoji_for_extreme_sport_type, apology)


# Configure application
app = Flask(__name__)

# Configuration for the template engine
app.jinja_env.auto_reload = True  # Enable auto-reloading of templates
app.config['TEMPLATES_AUTO_RELOAD'] = True  # Enable auto-reloading of templates

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_NAME"] = "session"

Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///project.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    """Render homepage if user is logged in"""
    # define variable user ID from session ID
    session_user_id = session["user_id"]

    # Get the current month and year for calencar 
    today = datetime.date.today()

    # Get the current month and year from the query parameters, 
    # if no parameter provided by URL use todays month and year from date time object
    year = request.args.get("year", type=int, default=datetime.date.today().year)
    month = request.args.get("month", type=int, default=datetime.date.today().month)

    # Calculate the previous and next months and years for calendar pagination buttons
    prev_month = month - 1
    prev_year = year
    if prev_month < 1:
        prev_month = 12
        prev_year -= 1

    next_month = month + 1
    next_year = year
    if next_month > 12:
        next_month = 1
        next_year += 1

    # Combined SQL query to pull data from activity logging, workout logging and lifestyle logging table to populate calendar with data
    combined_calendar_data = db.execute(
    """
    SELECT 
        activityLogging.date, 
        activityLogging.thirty_min, 
        activityLogging.workout, 
        activityLogging.wellness, 
        activityLogging.travelling, 
        activityLogging.sick, 
        workoutLogging.workout_type, 
        workoutLogging.class_type, 
        workoutLogging.sport_type, 
        workoutLogging.extreme_sport_type, 
        lifestyleLogging.eat_out, 
        lifestyleLogging.drinks 
    FROM activity_logging AS activityLogging
    LEFT JOIN workout_logging 
    AS workoutLogging ON activityLogging.date = workoutLogging.date AND activityLogging.users_id = workoutLogging.users_id
    LEFT JOIN lifestyle_logging 
    AS lifestyleLogging ON activityLogging.date = lifestyleLogging.date AND activityLogging.users_id = lifestyleLogging.users_id
    WHERE activityLogging.users_id = ? AND strftime('%Y-%m', activityLogging.date) = ?
    """,
    session_user_id, f"{year}-{month:02d}")

    #Create Lists to store data from respective SQL tables for iteration in creating calendar
    activityHistoryCalendarQuery = []
    workoutHistoryCalendarQuery = []
    lifestyleHistoryCalendarQuery = []

    #Loop through SQL query data and store in respective lists
    for row in combined_calendar_data:
        #Store values from activity logging table
        activity_entry = {
            'date': row['date'],
            'thirty_min': row['thirty_min'],
            'workout': row['workout'],
            'wellness': row['wellness'],
            'travelling': row['travelling'],
            'sick': row['sick'],
            'eat_out': row['eat_out'],
            'drinks': row['drinks']
        }
        #Append values to list
        activityHistoryCalendarQuery.append(activity_entry)
        
        #Store values from workout logging table
        workout_entry = {
            'date': row['date'],
            'workout_type': row['workout_type'],
            'class_type': row['class_type'],
            'sport_type': row['sport_type'],
            'extreme_sport_type': row['extreme_sport_type']
        }
        #Append values to list
        workoutHistoryCalendarQuery.append(workout_entry)
        
        #Store values from lifestyle logging table
        lifestyle_entry = {
            'date': row['date'],
            'eat_out': row['eat_out'],
            'drinks': row['drinks']
        }
        #Append values to list
        lifestyleHistoryCalendarQuery.append(lifestyle_entry)
    
    # Code to store workout values in lists for emoji rendering
    # Convert date strings to datetime objects
    for entry in activityHistoryCalendarQuery:
        entry['date'] = datetime.datetime.strptime(entry['date'], '%Y-%m-%d').date()
        # If current entry date has workout "yes" than loop through workout history entries to store workouts for day
        if entry['workout'] == 1:
            workout_types = [] # Initialize an empty list to store workout types
            class_types = [] # Initialize an empty list to store class types
            sport_types = [] # Initialize an empty list to store sport types
            extreme_sport_types = [] # Initialize an empty list to store extreme sport types

            # loop through entries of workout logging to store workouts fo a given day
            for day in workoutHistoryCalendarQuery:
                # Convert date strings to datetime objects for comparison of dates
                day['date'] = datetime.datetime.strptime(str(day['date']), '%Y-%m-%d').date()

                # If dates match workout type is not null, than store workout type value in Activity History dictionary
                if entry['date'] == day['date'] and day['workout_type'] is not None and day['workout_type'] != '':
                    workout_types.append(day['workout_type'])
                # If dates match class type is not null, than store value
                if entry['date'] == day['date'] and day['class_type'] is not None and day['class_type'] != '':
                    class_types.append(day['class_type']) 
                # If dates match sport type is not null, than store value
                elif entry['date'] == day['date'] and day['sport_type'] is not None and day['sport_type'] != '':
                    sport_types.append(day['sport_type'])
                # If dates match extreme sport type is not null, than store value
                elif entry['date'] == day['date'] and day['extreme_sport_type'] is not None and day['extreme_sport_type'] != '':
                    extreme_sport_types.append(day['extreme_sport_type'])

            # Assign the list of workout types to keys for emoji assignments
            entry['workout_type'] = workout_types
            entry['class_type'] = class_types
            entry['sport_type'] = sport_types
            entry['extreme_sport_type'] = extreme_sport_types

    # Code to append eat out and drinking boolean values for emoji rendering
    for entry in activityHistoryCalendarQuery:
        # loop through entries of workout logging to store workouts fo a given day
        for day in lifestyleHistoryCalendarQuery:
            # Convert date strings to datetime objects for comparison of dates
            day['date'] = datetime.datetime.strptime(str(day['date']), '%Y-%m-%d').date() 

            # If dates match eat out is equal to 1, than store ate out value in Activity History dictionary as true
            if entry['date'] == day['date']:
                if day['eat_out'] == 1:
                    entry['eat_out'] = True
                else:
                    entry['eat_out'] = False
            # If dates match eat out is equal to 1, than store ate out value in Activity History dictionary as true
            if entry['date'] == day['date']:
                if day['drinks'] == 1:
                    entry['drinks'] = True
                else:
                    entry['drinks'] = False

    # Get the calendar structure for the month
    cal = calendar.monthcalendar(year, month)

    # Create a list to hold the calendar data for the entire month, this will be passed to the HTML template
    # This list will be comprised of week data generated through a for loop and day data generated through a for loop
    calendar_data = []

    week_count = 0
    day_count = 0

    # Iterate over each week in the calendar for the current month
    for week in cal:
        # Create a list to hold data for days of the current week
        week_data = []
        week_count = week_count + 1

        # Iterate over each day in the week
        for day in week:
            day_count = day_count + 1

            # Create a dictionary to represent the day, start all values as false, as well as a placeholder for workout emoji
            day_data = {
                'day': day, 
                'current': False, 
                'activity_completed': False, 
                'workout_completed': False,
                'emoji': '',
                'eat_out_emoji': '',
                'drink_emoji': ''
            }
            
            # Initialize sets to store already added sports, extreme sports, and class type emojis for a day 
            # for preventing duplicate emojis from rendering
            added_workout_emojis = set()
            added_sport_emojis = set()  
            added_extreme_sport_emojis = set() 

            # Check if the  day is a valid date in the current month
            if day != 0:
                # Get the date corresponding to the day
                date = datetime.date(year, month, day)

                # loop through each entry in activity history from SQL query
                for entry in activityHistoryCalendarQuery:
                    # Match current iteration of for loop in SQL query to current iteration of double for loop
                    if entry['date'] == date:
                        # update if thirty min was completed with "true" for CSS styling for calendar table cell
                        if entry['thirty_min'] == 1:
                            day_data['activity_completed'] = True
                        # update if workout was completed with "true"
                        if entry['workout'] == 1:
                            day_data['workout_completed'] = True
                            # if workout was completed, loop through lists to store emoji values
                            for workout in entry['workout_type']:
                                # Call helper function to retrieve an emoji if workout is in list of emojis
                                emoji = get_emoji_for_workout_type(workout)
                                if emoji and workout not in added_workout_emojis:
                                    day_data['emoji'] += emoji
                                    added_workout_emojis.add(workout) # add workout to set to prevent duplication

                                # if workout type is sport, 
                                elif workout == "sport":
                                    # loop through lists of sport types that are stored to assign emoji values to render
                                    for sport_type in entry['sport_type']:
                                        # Call helper function to retrieve an emoji if sport is in list of emojis
                                        sport_emoji = get_emoji_for_sport_type(sport_type)
                                        if sport_emoji and sport_type not in added_workout_emojis:
                                            day_data['emoji'] += sport_emoji
                                            added_sport_emojis.add(sport_type) # add sport to set to prevent duplication
                                    
                                # if workout type is extreme sport, 
                                elif workout == "extreme-sport":
                                    # loop through lists of extreme sport types that are stored to assign emoji values to render
                                    for extreme_sport_type in entry['extreme_sport_type']:
                                        # Call helper function to retrieve an emoji if extreme sport is in list of emojis
                                        extreme_sport_emoji = get_emoji_for_extreme_sport_type(extreme_sport_type)
                                        if extreme_sport_emoji and extreme_sport_type not in added_extreme_sport_emojis:
                                            day_data['emoji'] += extreme_sport_emoji
                                            added_extreme_sport_emojis.add(extreme_sport_type) # add extreme sport to set to prevent duplication        
                                
                        # update entry data if travelling on day
                        if entry['travelling'] == 1:
                            day_data['travelling'] = True
                        # update entry data if sick on day
                        if entry['sick'] == 1:
                            day_data['sick'] = True
                        # if eat_out entry == yes
                        if entry['eat_out'] == True:
                            day_data['eat_out_emoji'] += '🍔'  # assign food emoji to render
                        # if drinks entry == yes
                        if entry['drinks'] == True:
                            day_data['drink_emoji'] += '🍺'  # assign food emoji to render
                        break
                
            # Append the day data to the week data
            week_data.append(day_data)

        # Append the week data to the calendar data
        calendar_data.append(week_data)

    #Combined SQL Query to pull metrics to create activity stats line on Index page
    activity_stats = db.execute(
    """
    SELECT 
        (SELECT SUM(CASE WHEN workout = 1 THEN 1 ELSE 0 END) 
        FROM activity_logging 
        WHERE date >= date('now', '-1 month') AND users_id = ?)
            AS workout_count,

        (SELECT SUM(CASE WHEN thirty_min = 1 THEN 1 ELSE 0 END) 
        FROM activity_logging 
        WHERE date >= date('now', '-1 month') AND users_id = ?)
            AS thirty_min_activity_count,

        (SELECT SUM(number_drinks)
        FROM lifestyle_logging 
        WHERE date >= date('now', '-1 month') AND users_id = ?)
            AS monthly_drink_count,

        (SELECT SUM(number_mealsOut) 
        FROM lifestyle_logging 
        WHERE date >= date('now', '-1 month') AND users_id = ?)
            AS monthly_meals_out_count,
        
        (SELECT SUM(workout_length) 
        FROM workout_logging 
        WHERE date >= date('now', '-1 month') AND users_id = ?)
            AS monthly_workout_length_count

    """,
    session_user_id, session_user_id, session_user_id, session_user_id, session_user_id)

    # extract value for variable
    workout_count_result = activity_stats[0]['workout_count']
    thirty_minute_count_result = activity_stats[0]['thirty_min_activity_count']

     # Additional checks to handle NoneType and verify the data type
    if workout_count_result is None:
        workout_count_result = 0

    # Additional checks to handle NoneType and verify the data type
    if thirty_minute_count_result is None:
        thirty_minute_count_result = 0

     # Extract value and Calculate average number of drinks per week
    monthly_drink_count_int = activity_stats[0]['monthly_drink_count']
    monthly_meals_out_count_int = activity_stats[0]['monthly_meals_out_count']

    # Additional checks to handle NoneType and verify the data type
    if monthly_drink_count_int is not None:
        monthly_drink_per_week = monthly_drink_count_int / 4
    else:
        monthly_drink_per_week = 0  # Or any other default value if the count is None
    
    # Additional checks to handle NoneType and verify the data type
    if monthly_meals_out_count_int is not None:
        monthly_mealsOut_per_week = (monthly_meals_out_count_int / 4)
    else:
        monthly_mealsOut_per_week = 0  # Or any other default value if the count is None

     # Calculate average number of workout hours per week in last month
    monthly_workout_length_count_int = activity_stats[0]['monthly_workout_length_count']

    # Additional checks to handle NoneType and verify the data type
    if monthly_workout_length_count_int is not None:
        monthly_workout_length_hours = (monthly_workout_length_count_int / 60)
        monthly_workout_length_hours_per_week = (monthly_workout_length_hours / 4)
        rounded_monthly_workout_length_hours_per_week = round(monthly_workout_length_hours_per_week, 2)
    else:
        rounded_monthly_workout_length_hours_per_week = 0  # Or any other default value if the count is None

    # SLEEP CHARTS
    # SQL query to get data from Sleep Logging table in the past month for Chart.js
    sleepHoursGraphQuery = db.execute(
        """
        SELECT date, sleep_length, bed_time_length, sleep_efficiency, bed_time, sleep_attempt, time_to_sleep, final_awakening,
            out_of_bed, time_awoken, time_woke_up_early
        FROM sleep_logging 
        WHERE users_id = ? AND date >= date('now', '-1 month')
        ORDER BY date ASC
        """,
        session_user_id)
    
    # format data for chart.js
    # Convert date format for chart.js
    formatted_date_values = []
    for entry in sleepHoursGraphQuery:
        date = datetime.datetime.strptime(entry['date'], '%Y-%m-%d').strftime('%b %d, %Y')
        formatted_date_values.append(date)

    # store values from SQL query into variables for rendering in chart.js
    sleep_length_values = [round(entry['sleep_length'] / 60, 2) for entry in sleepHoursGraphQuery]
    bedTime_length_values = [round(entry['bed_time_length'] / 60, 2) for entry in sleepHoursGraphQuery]
    sleep_efficiency_values = [entry['sleep_efficiency'] for entry in sleepHoursGraphQuery]
    bed_time_values = [entry['bed_time'] for entry in sleepHoursGraphQuery]
    sleep_attempt_values = [entry['sleep_attempt'] for entry in sleepHoursGraphQuery]
    final_awakening_time_values = [entry['final_awakening'] for entry in sleepHoursGraphQuery]
    out_of_bed_time_values = [entry['out_of_bed'] for entry in sleepHoursGraphQuery]
    time_awoken_values = [entry['time_awoken'] for entry in sleepHoursGraphQuery]
    time_awoken_early_values = [entry['time_woke_up_early'] for entry in sleepHoursGraphQuery]

    # SQL query to get Average sleep metrics in past month
    # With subquery to get the number of days in past month to dived total number of minutes slept
    monthly_sleep_averages = db.execute(
        """
        SELECT 
            (SELECT SUM(sleep_length) / COUNT(*) 
            FROM sleep_logging 
            WHERE date >= date('now', '-1 month') AND users_id = ?) 
                AS average_hours_slept,
            
            (SELECT SUM(bed_time_length) / COUNT(*) 
            FROM sleep_logging 
            WHERE date >= date('now', '-1 month') AND users_id = ?) 
                AS average_time_in_bed,

            (SELECT SUM(time_awoken) / COUNT(*) 
            FROM sleep_logging 
            WHERE date >= date('now', '-1 month') AND users_id = ?) 
                AS average_time_awake_in_night,

            (SELECT SUM(time_woke_up_early) / COUNT(*) 
            FROM sleep_logging 
            WHERE date >= date('now', '-1 month') AND users_id = ?) 
                AS average_time_awake_early
        """,
        session_user_id, session_user_id, session_user_id, session_user_id)
    
    # Extract value from SQL Query
    int_monthly_average_hours_slept = monthly_sleep_averages[0]['average_hours_slept']
    # Calculate average hours slept per day for last month, else make value 0
    if int_monthly_average_hours_slept is not None:
        hours_monthly_average_hours_slept = min_to_hours_index_page(int_monthly_average_hours_slept)
    else:
        hours_monthly_average_hours_slept = 0
    
    # Extract value from SQL query variable
    int_monthly_average_time_in_bed = monthly_sleep_averages[0]['average_time_in_bed']
    # Calculate average time in bed per day for last month else, make value 0
    if int_monthly_average_hours_slept is not None:
        hours_monthly_average_time_in_bed = min_to_hours_index_page(int_monthly_average_time_in_bed)
    else:
        hours_monthly_average_time_in_bed = 0

    # Extract value from SQL query variable
    int_monthly_average_time_awake_in_night = monthly_sleep_averages[0]['average_time_awake_in_night']
    # Calculate average time awake in night last month else, make value 0
    if int_monthly_average_time_awake_in_night is not None:
        hours_monthly_average_time_awake_in_night = min_to_hours_index_page(int_monthly_average_time_awake_in_night)
    else:
        hours_monthly_average_time_awake_in_night = 0

    # Extract value from SQL query stored variable
    int_monthly_average_time_awake_early = monthly_sleep_averages[0]['average_time_awake_early']
    # Calculate average awoken early for last month else, make value 0
    if int_monthly_average_time_awake_early is not None:
        hours_monthly_average_time_awake_early = min_to_hours_index_page(int_monthly_average_time_awake_early)
    else:
        hours_monthly_average_time_awake_early = 0
    
    # Render Index html
    return render_template("index.html", workout_count=workout_count_result,
                           calendar=calendar_data, month=calendar.month_name[month], year=year,
                           thirthy_min_count=thirty_minute_count_result, drinks_per_week=monthly_drink_per_week,
                           meals_out_per_week=monthly_mealsOut_per_week, 
                           workout_hours_per_week=rounded_monthly_workout_length_hours_per_week,
                           prev_month=prev_month, prev_year=prev_year, next_month=next_month, next_year=next_year,
                           average_hours_slept_per_day=hours_monthly_average_hours_slept,
                           sleep_length_labels=formatted_date_values, sleep_length_values=sleep_length_values,
                           bedTime_length_values=bedTime_length_values, sleep_efficiency_values=sleep_efficiency_values,
                           bed_time_values=bed_time_values, sleep_attempt_values=sleep_attempt_values, 
                           final_awakening_time_values=final_awakening_time_values, out_of_bed_time_values=out_of_bed_time_values,
                           time_awoken_values=time_awoken_values, time_awoken_early_values=time_awoken_early_values,
                           hours_monthly_average_time_in_bed=hours_monthly_average_time_in_bed,
                           hours_monthly_average_time_awake_in_night=hours_monthly_average_time_awake_in_night,
                           hours_monthly_average_time_awake_early=hours_monthly_average_time_awake_early)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()
    
    # User reached route via GET (as by clicking a link or via redirect)
    if request.method == "GET":
        return render_template("login.html")
    
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("Must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("Must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("Invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Store username in variable
        username = request.form.get("username")

        # Store flash message to display
        flash(f"Welcome {username}!", "success")

        # Redirect user to home page
        return redirect("/")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Store flash message to display
    flash("Successfully logged out!", "success")

    # Redirect user to login form
    return redirect("/login")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("Must provide username", 403)


        # Ensure username doesn't already exist
        usernames = db.execute("SELECT username FROM users")
        for username in usernames:
            if request.form.get("username") == username["username"]:
                return apology("Sorry username already exists", 400)

        # Ensure password was submitted
        if not request.form.get("password"):
            return apology("Must provide password", 403)

        # Ensure password confirmation matches password
        if request.form.get("password") != request.form.get("confirmation"):
            return apology("Confirmation must match password", 400)

        # define variable to store username and password of registrant
        submitted_username = request.form.get("username")
        password_hash = generate_password_hash(request.form.get("password"))

        # Insert username and password into database
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", submitted_username, password_hash)
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Store flash message to display
        flash("You've successfully registered!", "success")

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")


@app.route("/activity", methods=["GET", "POST"])
@login_required
def activity():
    """Log daily activities and workouts"""

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Store user id
        session_user_id = session["user_id"]

        # store date input into variable
        activity_date = request.form.get("activity-date")

        # ensure user hasn't already logged data for that date
        row = db.execute("SELECT * FROM activity_logging WHERE users_id = ? AND date = ?", session_user_id, activity_date)
        # if row already exists, provide error message and exit
        if row:
            flash("Activity already logged for this date", "warning")
            return redirect("/activity")

        # Call helper function to store 30 min y/n input into variable depending if answered yes or no
        thirty_min_checked = get_form_input(request.form, "thirtyMin-yes") or get_form_input(request.form, "thirtyMin-no")

        # Call helper function to store workout y/n input into variable depending if answered yes or no
        workout_checked = get_form_input(request.form, "workout-yes") or get_form_input(request.form, "workout-no")

        # Call helper function to store welness y/n input into variable depending if answered yes or no
        wellness_checked = get_form_input(request.form, "wellness-yes") or get_form_input(request.form, "wellness-no")

        # Call helper function and stores workout type if workout is y
        workout_type = get_form_input(request.form, "workoutSelection")

        # Call helper function and stores class type if class is workout type
        class_type = get_form_input(request.form, "classType")

        # Call helper function and stores sport type if sport is workout type
        sport_type = get_form_input(request.form, "sport")

        # Call helper function and store extreme sport if extreme sport is workout type
        extreme_sport_type = get_form_input(request.form, "extreme-sport")

        # Call helper function and store travel boolean value
        travel_checked = get_form_input(request.form, "travel-yes") or get_form_input(request.form, "travel-no")

        # Call helper function and store travel boolean value
        sick_checked = get_form_input(request.form, "sick-yes") or get_form_input(request.form, "sick-no")

        # Call helper function and store workout length if workout is y
        if request.form.get("workoutLengthMin"):
            workout_length_final = int(request.form.get("workoutLengthMin"))
        else:
            workout_length_final = 0

        # Get array of additional wellness type values from hidden HTML element
        if(request.form.get('selectedWorkoutValues')):
            selected_workout_values = request.form.get('selectedWorkoutValues')
            # Convert the JSON string back to an array
            selected_workout_values_array = json.loads(selected_workout_values)
        else:
            selected_workout_values_array = None

        # Call helper function and store wellness type if wellness is y
        wellness_selection = get_form_input(request.form, "wellness-type")

        # Get array of additional wellness type values from hidden HTML element
        if(request.form.get('selectedWellnessValues')):
            selected_wellness_values = request.form.get('selectedWellnessValues')
            # Convert the JSON string back to an array
            selected_wellness_values_array = json.loads(selected_wellness_values)
        else:
            selected_wellness_values_array = None

        # Call helper function to store Eating Out y/n input into variable depending if answered yes or no
        meals_out_bool = get_form_input(request.form, "eatOut-yes") or get_form_input(request.form, "eatOut-no")

        # Call helper function to store drink y/n input into variable depending if answered yes or no
        drinks_bool = get_form_input(request.form, "drink-yes") or get_form_input(request.form, "drink-no")

        # store number of meals if eating out, call helper function if y
        if request.form.get("mealsOut"):
            number_meals = get_form_input(request.form, "mealsOut")
        else:
            number_meals = 0

        # store number of drinks, call helper function if y
        if request.form.get("numberDrinks"):
            number_drinks = get_form_input(request.form, "numberDrinks")
        else:
            number_drinks = 0

        # INSERT activity logging values into Database
        db.execute(
            """
            INSERT INTO activity_logging (users_id, thirty_min, workout, wellness, date, travelling, sick) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            session_user_id, thirty_min_checked, workout_checked, wellness_checked, activity_date, travel_checked, sick_checked)
        # store activity log ID for other database inserts
        activity_logging_id = db.execute("SELECT id FROM activity_logging WHERE date = ?;", activity_date)
        # Insert into workout logging
        db.execute(
            """
            INSERT INTO workout_logging (users_id, activity_log_id, date, workout_type, class_type, sport_type, 
                extreme_sport_type, workout_length) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            session_user_id, activity_logging_id[0]["id"], activity_date, workout_type, class_type, sport_type, 
            extreme_sport_type, workout_length_final)
        # Placeholder to insert additional workout values into database
        if(selected_workout_values_array):
            for workout in selected_workout_values_array:
                # Insert into workout logging
                db.execute(
                    """
                    INSERT INTO workout_logging (users_id, activity_log_id, date, workout_type, class_type, 
                        sport_type, extreme_sport_type, workout_length) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                   session_user_id, activity_logging_id[0]["id"], activity_date, workout['workoutType'], 
                   workout['workoutClassType'], workout['sportType'], workout['extremeSportType'], workout['workoutLength'])

        # Insert wellness selection into database
        db.execute("INSERT INTO wellness_logging (users_id, activity_log_id, wellness_type, date) VALUES (?, ?, ?, ?)",
                session_user_id, activity_logging_id[0]["id"], wellness_selection, activity_date)
        # If additional wellness selections made, Loop through array of additional wellness values and insert into database
        if(selected_wellness_values_array):
            for value in selected_wellness_values_array:
                db.execute(
                    """
                    INSERT INTO wellness_logging (users_id, activity_log_id, wellness_type, date) 
                    VALUES (?, ?, ?, ?)
                    """, 
                    session_user_id, activity_logging_id[0]["id"], value, activity_date)
        # Insert values into lifestyle logging table
        db.execute("""
        INSERT INTO lifestyle_logging (users_id, date, eat_out, drinks, number_mealsOut, number_drinks, activity_log_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        session_user_id, activity_date, meals_out_bool, drinks_bool, number_meals, number_drinks, activity_logging_id[0]["id"])

        # Store flash message to dispaly
        flash('Successfully logged activity!', 'success')

        # redirect user to index page
        return redirect("/history")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("activity.html")


@app.route("/sleep", methods=["GET", "POST"])
@login_required
def sleep():
    """Log daily sleep"""

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Store user id
        session_user_id = session["user_id"]

        # store date input into variable
        sleep_date = request.form.get("sleep-date")

        # ensure user hasn't already logged data for that date
        row = db.execute("SELECT * FROM sleep_logging WHERE users_id = ? AND date = ?", session_user_id, sleep_date)
        # if row already exists, provide error message and exit
        if row:
            flash("Sleep diary already logged for this date", "warning")
            return redirect("/sleep")

        # Call helper function to store nap y/n input into variable depending if answered yes or no
        nap_checked = get_form_input(request.form, "nap-yes") or get_form_input(request.form, "nap-no")

        # Store nap time hours, if no value than set value to 0
        if request.form.get("napTimeHour"):
            napTimeHour = int(request.form.get("napTimeHour"))
        else:
            napTimeHour = 0
        # Store nap time minutes, if no value than set value to 0
        if request.form.get("napTimeMin"):
            napTimeMin = int(request.form.get("napTimeMin"))
        else:
            napTimeMin = 0
         # Calculate final value in minutes using helper function
        final_napTime = int(time_in_min(napTimeHour, napTimeMin))

        # store time in bed input into variable
        bed_time = request.form.get("bedTime")

        # store sleep attempt input into variable
        sleep_attempt = request.form.get("sleepAttempt")

        # INPUT VALIDATION THAT TIME OF SLEEP ATTEMPT IS LATER THAN TIME IN BED
        # convert time inputs to datetime objects
        bed_time_converted = datetime.datetime.strptime(bed_time, "%H:%M")
        bed_time_hour = bed_time_converted.hour
        sleep_attempt_converted = datetime.datetime.strptime(sleep_attempt, "%H:%M")
        sleep_attempt_hour = sleep_attempt_converted.hour
        # Assess if bed time is PM and sleep attempt is AM
        if 12 <= bed_time_hour <= 24 and 0 <= sleep_attempt_hour <= 12:
            sleep_attempt_converted += timedelta(days=1)

        #check if sleep attempt is earlier than time in bed, if yes then throw error and redirect
        if bed_time_converted > sleep_attempt_converted:
            flash("The time attempted to sleep is earlier than time in bed ", "warning")
            return redirect("/sleep")

        # store time to fall asleep input into variables
        if request.form.get("timeToSleepHour"):
            timeToSleepHour = int(request.form.get("timeToSleepHour"))
        else:
            timeToSleepHour = 0
        if request.form.get("timeToSleepMin"):
            timeToSleepMin = int(request.form.get("timeToSleepMin"))
        else:
            timeToSleepMin = 0
        # Calculate final value in minutes using helper function
        final_timeToSleep = int(time_in_min(timeToSleepHour, timeToSleepMin))
        # Calculate final value in minutes using helper function
        final_timeToSleep_calc = timedelta(minutes=time_in_min(timeToSleepHour, timeToSleepMin))

        # store number of times woken up in variable
        times_woken_up = request.form.get("timesWokenUp")

        # store amount of time woken up in variables
        if request.form.get("timeAwokenHour"):
            timeAwokenHour = int(request.form.get("timeAwokenHour"))
        else:
            timeAwokenHour = 0
        if request.form.get("timeAwokenMin"):
            timeAwokenMin = int(request.form.get("timeAwokenMin"))
        else:
            timeAwokenMin = 0
        # Calculate final value calling helper function to calculate number of minutes
        final_timeAwoken = int(time_in_min(timeAwokenHour, timeAwokenMin))

        # store amount of time woken up in variables
        finalAwakening = request.form.get("finalAwakening")

        # Call helper function for earlier than expected y/n input into variable depending if answered yes or no
        wake_early_bool = get_form_input(request.form, "earlier-yes") or get_form_input(request.form, "earlier-no")

        # store amount of time awoke early in variables
        if request.form.get("wakeUpEarlyHour"):
            awokenEarlyHour = int(request.form.get("wakeUpEarlyHour"))
        else:
            awokenEarlyHour = 0

        if request.form.get("wakeUpEarlyMin"):
            awokenEarlyMin = int(request.form.get("wakeUpEarlyMin"))
        else:
            awokenEarlyMin = 0
        # Calculate final value calling helper function to calculate number of minutes
        final_timeAwokenEarly = int(time_in_min(awokenEarlyHour, awokenEarlyMin))

        # store time out of bed in variable
        outOfBed = request.form.get("outOfBed")

        # INPUT VALIDATION THAT TIME OUT OF BED IS LATER THAN WOKEN UP
        # convert time inputs to datetime objects
        final_awakening_converted = datetime.datetime.strptime(finalAwakening, "%H:%M")
        final_awakening_hour = final_awakening_converted.hour
        out_of_bed_converted = datetime.datetime.strptime(outOfBed, "%H:%M")
        out_of_bed_hour = out_of_bed_converted.hour
        # Assess if bed time is PM and sleep attempt is AM
        if 12 <= final_awakening_hour <= 24 and 0 <= out_of_bed_hour <= 12:
            out_of_bed_converted += timedelta(days=1)

        #check if sleep attempt is earlier than time in bed, if yes then throw error and redirect
        if final_awakening_converted > out_of_bed_converted:
            flash("The time out of bed is earlier than time woken up ", "warning")
            return redirect("/sleep")

        # store sleep rating text in variable
        rateSleep = request.form.get("rateSleep")

        # store travelling boolean value
        travelling_bool = request.form.get("travel-yes") or get_form_input(request.form, "travel-no")

        # CALCULATE TIME SLEPT AND STORE IN VARIABLE
        # calculate time started sleeping and store in variable
        sleep_attempt_start = datetime.datetime.strptime(sleep_attempt, "%H:%M")
        time_started_sleeping = sleep_attempt_start + final_timeToSleep_calc
        sleep_end = datetime.datetime.strptime(finalAwakening, "%H:%M")
        # If the end time is on the next day, add a day to the end time
        if sleep_end < time_started_sleeping:
            sleep_end = sleep_end.replace(day=sleep_end.day+1)
        # Calculate the time in bed by subtracting the start time from the end time
        sleep_length = sleep_end - time_started_sleeping
        # Extract the total number of minutes
        sleep_length_minutes = int(divmod(sleep_length.total_seconds(), 60)[0])
        sleep_length_final = sleep_length_minutes - final_timeAwoken

        # CALCULATE TIME IN BED AND STORE IN VARIABLE
        # Convert the input to a datetime object
        bed_time_start = datetime.datetime.strptime(bed_time, "%H:%M")
        bed_time_end = datetime.datetime.strptime(outOfBed, "%H:%M")
        # If the end time is on the next day, add a day to the end time
        if bed_time_end < bed_time_start:
            bed_time_end = bed_time_end.replace(day=bed_time_end.day+1)
        # Calculate the time in bed by subtracting the start time from the end time
        time_in_bed = bed_time_end - bed_time_start
        # Extract the total number of minutes
        bed_time_minutes = int(divmod(time_in_bed.total_seconds(), 60)[0])

        # Calculate sleep efficienty and store in variable
        sleep_efficiency = (sleep_length_final / bed_time_minutes) * 100

        db.execute(
            """
            INSERT INTO sleep_logging (users_id, date, nap, bed_time, sleep_attempt, time_to_sleep, times_woken_up, 
                time_awoken, final_awakening, out_of_bed, wake_early_bool, sleep_quality, bed_time_length, 
                sleep_length, travelling, sleep_efficiency, time_woke_up_early, nap_time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            session_user_id, sleep_date, nap_checked, bed_time, sleep_attempt, final_timeToSleep, times_woken_up, 
            final_timeAwoken, finalAwakening, outOfBed, wake_early_bool, rateSleep, bed_time_minutes, sleep_length_final, 
            travelling_bool, sleep_efficiency, final_timeAwokenEarly, final_napTime)

        # Store flash message to dispaly
        flash('Successfully logged activity!', 'success')

        # redirect user to index page
        return redirect("/history")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("sleep.html")


@app.route("/history", methods=["GET", "POST"])
@login_required
def history():
    """Show history of activity logging"""

    # define variable user ID from session ID
    session_user_id = session["user_id"]

    # SQL Query to get users activity and lifestyle transaction history
    activity_history = db.execute(
        """
        SELECT 
            activity_logging.id, activity_logging.date, activity_logging.thirty_min, activity_logging.workout, 
            (
                SELECT GROUP_CONCAT(workout_type)
                FROM workout_logging
                WHERE activity_logging.date = workout_logging.date
            ) AS workout_types,
            (
                SELECT GROUP_CONCAT(class_type)
                FROM workout_logging
                WHERE activity_logging.date = workout_logging.date
            ) AS class_types,
            (
                SELECT GROUP_CONCAT(sport_type)
                FROM workout_logging
                WHERE activity_logging.date = workout_logging.date
            ) AS sport_types,
            (
                SELECT GROUP_CONCAT(extreme_sport_type)
                FROM workout_logging
                WHERE activity_logging.date = workout_logging.date
            ) AS extreme_sport_types,
            (
                SELECT SUM(workout_length)
                FROM workout_logging
                WHERE activity_logging.date = workout_logging.date
            ) AS total_workout_length,
            activity_logging.wellness, 
            GROUP_CONCAT(DISTINCT wellness_logging.wellness_type) AS wellness_types,
            lifestyle_logging.eat_out, lifestyle_logging.number_mealsOut, lifestyle_logging.drinks, lifestyle_logging.number_drinks, 
            activity_logging.travelling, activity_logging.sick 
        FROM 
            activity_logging 
        LEFT JOIN lifestyle_logging ON activity_logging.date = lifestyle_logging.date 
        
        LEFT JOIN wellness_logging ON activity_logging.date = wellness_logging.date 
        WHERE 
            activity_logging.users_id = ? 
        GROUP BY 
            activity_logging.date 
        ORDER BY 
            activity_logging.date DESC;
        """, 
        session_user_id)
    
    # SQL Query to get users sleep history
    sleep_history = db.execute(
        """
            SELECT id, date, nap, nap_time, bed_time, sleep_attempt, time_to_sleep, times_woken_up, time_awoken, 
                final_awakening, out_of_bed, wake_early_bool, time_woke_up_early, sleep_length, bed_time_length, 
                sleep_quality, travelling, ROUND(sleep_efficiency, 2) AS sleep_efficiency
            FROM 
                sleep_logging 
            WHERE 
                users_id = ? 
            ORDER BY 
                date DESC;
        """
        , session_user_id)

    # Loop through dictionaries and translate 1's and 0's to yes and no, as well as format Sport Types
    for activity in activity_history:
        activity['thirty_min'] = translate_bool(activity['thirty_min'])
        activity['workout'] = translate_bool(activity['workout'])
        activity['wellness'] = translate_bool(activity['wellness'])
        activity['eat_out'] = translate_bool(activity['eat_out'])
        activity['drinks'] = translate_bool(activity['drinks'])
        activity['travelling'] = translate_bool(activity['travelling'])
        activity['sick'] = translate_bool(activity['sick'])
        # Format type values to remove underscores and add additional types to new line using helper function
        activity['sport_types'] = format_value(activity['sport_types'])
        activity['workout_types'] = format_value(activity['workout_types'])
        activity['class_types'] = format_value(activity['class_types'])
        activity['extreme_sport_types'] = format_value(activity['extreme_sport_types'])
        activity['wellness_types'] = format_value(activity['wellness_types'])
        # convert workout length min to hours
        activity['total_workout_length'] = min_to_hours(activity['total_workout_length'])

    # Loop through dictionaries and translate 1's and 0's to yes and no
    for sleep in sleep_history:
        sleep['nap'] = translate_bool(sleep['nap'])
        sleep['wake_early_bool'] = translate_bool(sleep['wake_early_bool'])
        sleep['travelling'] = translate_bool(sleep['travelling'])
        # convert sleep lengths in min to hours
        sleep['sleep_length'] = min_to_hours(sleep['sleep_length'])
        sleep['bed_time_length'] = min_to_hours(sleep['bed_time_length'])

    # User reached route via GET
    if request.method == "GET":
        # Render History html
        return render_template("history.html", activity_history=activity_history, sleep_history=sleep_history)

    # User reached route via POST (by clicking delete button on table, and AJAX POST call occurs)
    if request.method == "POST":
        print("Test if POST message was received into IF statment")

        row_id = request.get_data(as_text=True)  # store row ID from AJAX body 
        print(row_id)
        # Check if AJAX call came from sleep logging table by checking if variable contains "row_id="
        if "sleep_row_id=" in row_id:
            row_id_value = row_id.split("=")[1]  # extract the value after "="
            print("Test, sleep logging evaluated to true")

            #SQL query to delete sleep_loggin entry
            db.execute("DELETE FROM sleep_logging WHERE sleep_logging.id = ?;", row_id_value)
        elif "activity_row_id=" in row_id:
            print("Test, activity logging evaluated to true")
            activity_row_id_value = row_id.split("=")[1]  # extract the value after "="
            print(activity_row_id_value)
            #SQL query to delete lifestyle_logging entry
            db.execute("DELETE FROM lifestyle_logging WHERE activity_log_id = (SELECT id FROM activity_logging WHERE id = ?);"
                       , activity_row_id_value)  

            #SQL query to delete wellness_logging entry
            db.execute("DELETE FROM wellness_logging WHERE activity_log_id = (SELECT id FROM activity_logging WHERE id = ?);"
                       , activity_row_id_value)        

            #SQL query to delete workout_logging entry
            db.execute("DELETE FROM workout_logging WHERE activity_log_id = (SELECT id FROM activity_logging WHERE id = ?);"
                       , activity_row_id_value)  

            #SQL query to delete activity_logging entry
            db.execute("DELETE FROM activity_logging WHERE activity_logging.id = ?;", activity_row_id_value)

        # Store flash message to dispaly
        flash('Successfully deleted entry', 'success')

        # Render History html
        return redirect("/history")
