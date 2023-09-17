import os
import requests
import urllib.parse
import datetime

from flask import redirect, render_template, request, session
from functools import wraps


def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/1.1.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


def apology(message, code=400):
    """Render message as an apology to user."""
    def escape(s):
        """
        Escape special characters.

        https://github.com/jacebrowning/memegen#special-characters
        """
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                         ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", top=code, bottom=escape(message)), code


def time(value):
    """Format time for website."""
    # convert the datetime string to a datetime object
    dt_object = datetime.datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
    # format the datetime object as a string in a user-friendly format
    user_friendly_datetime = dt_object.strftime("%B %d, %Y %I:%M %p")
    return user_friendly_datetime


def get_form_input(form, name):
    """Gets input value from form field, else if Null returns Null."""
    value = form.get(name)
    return value if value is not None else None


def time_in_min(hour, min):
    """Convert hour and min inputs into only minutes for database insert."""
    final_minutes = (hour * 60) + min
    return final_minutes


def min_to_hours(total_min):
    hours = total_min // 60  # Calculate the number of whole hours
    minutes = total_min % 60  # Calculate the remaining minutes
    return str(hours) + " hour<br>" + str(minutes) + " min"

def min_to_hours_index_page(total_min):
    hours = total_min // 60  # Calculate the number of whole hours
    minutes = total_min % 60  # Calculate the remaining minutes
    return str(hours) + " hour " + str(minutes) + " min"


def translate_bool(value):
    """Convert 0's and 1's to yes and no."""
    if value == 1:
        return "yes"
    elif value == 0:
        return "no"
    else:
        return
    

def format_value(value):
    if value is None:
        return ""  # Return an empty string for None values
    
    # Replace underscores with spaces
    value = value.replace('_', '-')

    # Split the values by commas
    values = value.split(',')
    
    # Join the values with commas and newlines
    formatted_value = '\n'.join(values)
    
    return formatted_value


# Function to define emoji values to be stored for workout types
def get_emoji_for_workout_type(workout_type):
    emoji_mapping = {
        "gym": '💪',
        "class": '👯',
        "bike": '🚴',
        "running": '🏃',
        "other": '😅' # sweating emoji
    }
    return emoji_mapping.get(workout_type, '')


# Function to define emoji values to be stored for Sport types
def get_emoji_for_sport_type(sport_type):
    emoji_mapping = {
        "tennis": '🎾',
        "hockey": '🏒',
        "soccer": '⚽',
        "basketball": '🏀',  # basketball emoji
        "racquet": '🏸',  # racquet emoji
        "other": '🤼'  # wrestling emoji
    }
    return emoji_mapping.get(sport_type, '')


# Function to define emoji values to be stored for Extreme Sport types
def get_emoji_for_extreme_sport_type(extreme_sport_type):
    emoji_mapping = {
        "snowboard": '🏂',  # snowboard emoji
        "surf": '🏄', # surf emoji
        "skateboard": '🛹',  # skateboard emoji
        "other": '🪂' # other emoji
    }
    return emoji_mapping.get(extreme_sport_type, '')